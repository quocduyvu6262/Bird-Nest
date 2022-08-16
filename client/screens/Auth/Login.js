// REACT
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
// GOOGLE SIGN IN
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
// CONSTANTS
import Constants from "../../constants/constants";
// REDUX
import * as dataActions from '../../redux/slices/data';
import { useDispatch } from "react-redux";
// AXIOS
import Axios from "axios";


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {

  /**
   * @returns the dispatch instance
   */
  const dispatch = useDispatch();

  /**
   * States declaration
   */
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.IOS_GOOGLE_CLIENT_ID,
    androidClientId: "",
    iosClientId: "",
    selectAccount: true,
  });

  /**
   * Fetch the user data from Google access token
   * @param accessToken the Google access token 
   * @returns the Google User's data
   */
  const fetchGoogleUser = async (accessToken) => {
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await userInfoRes.json();
    return data;
  };

  /**
   * Perform the login in the backend
   * @param data the object containing user's email and fullname 
   * @returns the promise that contains either LOGIN or REGISTER status
   */
  const login = async (data) => {
    return Axios.post(`${Constants.BASE_URL}/api/users/loginwithgoogle`, {
      email: data.email,
      fullname: data.name,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log("Fail to login in backend"));
  };

  /**
   * Function that receives the user email and perform
   * the GET request on the database in order to retrieve
   * the user info, then pushing into SecureStore and Redux Store
   * @param emai the current user's email
   */
  const storeData = async (email) => {
    // Get and store user
    Axios.get(`${Constants.BASE_URL}/api/users/${email}`).then(({data}) => {
      const user = data[0];
      // push into secure store
      SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_USER, JSON.stringify(user));
      // push into redux store
      dispatch(dataActions.updateUser(user));
    }).catch( err => {
      console.log("Fail to store user data")
    } )

    // Get and store housing
    Axios.get(`${Constants.BASE_URL}/api/housings/email/${email}`).then(({data}) => {
      const housing = data[0];
      // push into secure store
      SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING, JSON.stringify(housing));
      // push into redux store
      dispatch(dataActions.updateHousing(housing));
    }).catch( err => {
      console.log("Fail to store housing data (Housing data is empty)")
    } )
  }
  

  /**
   * Use Effect Hook
   */
  useEffect(() => {
    if (response?.type === "success") {
      const accessToken = response.authentication.accessToken;
      if (accessToken) {
        fetchGoogleUser(accessToken).then((userInfo) => {
          login(userInfo)
            .then(async (res) => {
              // STORE TOKEN
              await SecureStore.setItemAsync(
                Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN,
                JSON.stringify(accessToken)
              );
              // Show user data
              console.log(res);
              // TWO CASES: LOGIN or REGISTER
              if (res.status === "login") {
                console.log("Login Successfully")
                // PULL FROM DATABASE -> STORE INTO SECURE STORAGE -> STORE INTO REDUX STORAGE
                storeData(res.email);
                navigation.navigate("BirdFeed");
              } else if (res.status === "register") {
                dispatch(dataActions.updateID(res.id));
                dispatch(dataActions.updateEmail(res.email));
                dispatch(dataActions.updateUID(res.uid));
                dispatch(dataActions.updateFullname(res.name));
                console.log("Register Successfully");
                navigation.navigate("IDQs");
              }
            })
            .catch((err) => console.log("Login/Register Fail"));
        });
      }
    }
  }, [response]);

  /**
   * Return Screen
   */
  return (
    <Background>
      <View style={styles.background}>
        <Logo />
        <Header>Bird Nest</Header>
        <Paragraph>
          Homes that Match
        </Paragraph>
        <TouchableOpacity>
          <Button
            mode="contained"
            onPress={() => promptAsync({showInRecents: true})}
          >
            Sign in with Google
          </Button>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  background:{
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '80%'
  }
});
export default LoginScreen;
