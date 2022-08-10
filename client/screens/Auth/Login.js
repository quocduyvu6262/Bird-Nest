//React
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
  processColor,
  Alert,
} from "react-native";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";

// Google sign in
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
// Import constants
import Constants from "../../constants/constants";
// Redux
import * as dataActions from '../../redux/slices/data';
import { useDispatch } from "react-redux";

// Axios
import Axios from "axios";

// Chat
import { useChatClient } from '../ChatAPI/useChatClient';


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.IOS_GOOGLE_CLIENT_ID,
    androidClientId: "",
    iosClientId: "",
    selectAccount: true,
  });

  // FETCH GOOGLE USER
  const fetchGoogleUser = async (accessToken) => {
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await userInfoRes.json();
    return data;
  };

  // FETCH USER
  const fetchUser = async (data) => {
    return Axios.get(`${Constants.BASE_URL}/api/users/${data.email}`)
      .then((res) => {
        let userInfo = res.data;
        return userInfo;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // FETCH HOUSING
  const fetchHousing = async (data) => {
    return Axios.get(`${Constants.BASE_URL}/api/housings/${data.email}`)
      .then((res) => {
        let houseInfo = res.data[0];
        return houseInfo;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GOOGLE LOGIN
  const login = async (data) => {
    return Axios.post(`${Constants.BASE_URL}/api/users/loginwithgoogle`, {
      email: data.email,
      fullname: data.name,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log("Axios fail"));
  };

  // FIREBASE AUTH

  // use side effect
  React.useEffect(() => {
    if (response?.type === "success") {
      // setAccessToken(response.authentication.accessToken);
      const accessToken = response.authentication.accessToken;
      // SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY,JSON.stringify(accessToken));
      // navigation.navigate("BirdFeed");
      if (accessToken) {
        fetchGoogleUser(accessToken).then((userInfo) => {
          login(userInfo)
            .then(async (res) => {
              // STORE TOKEN
              await SecureStore.setItemAsync(
                Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN,
                JSON.stringify(accessToken)
              );
              // STORE UID, EMAIL, NAME
              console.log(res);
              dispatch(dataActions.updateFullname(res.name));
              dispatch(dataActions.updateEmail(res.email));
              dispatch(dataActions.updateUID(res.uid));
              // TWO CASES: LOGIN or REGISTER
              if (res.status === "login") {
                // // get item redux
                // SecureStore.getItemAsync(
                //   Constants.MY_SECURE_AUTH_STATE_KEY_REDUX
                // ).then((data) => {
                //   let jsonData = JSON.parse(data);
                //   //dispatch(updateUser(jsonData.userInfo));
                //   //dispatch(updateHousing(jsonData.housing))
                // });
                console.log("Login Successfully")
                navigation.navigate("BirdFeed");
              } else if (res.status === "register") {
                console.log("Register Successfully");
                navigation.navigate("IDQs");
              }
            })
            .catch((err) => console.log("Login/Register Fail"));
        });
      }
    }
  }, [response]);

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
