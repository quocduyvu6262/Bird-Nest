import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import Constants from "../../constants/constants";
import * as dataActions from "../../redux/slices/data";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { storage, ref, getDownloadURL } from "../../firebaseConfig";
import * as FileSystem from "expo-file-system";

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
    console.log(await Constants.BASE_URL());
    return Axios.post(
      `${await Constants.BASE_URL()}/api/users/loginwithgoogle`,
      {
        email: data.email,
        fullname: data.name,
      }
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log("Fail to login in backend"));
  };

  /**
   * Function that receives the user email and perform
   * the GET request on the database in order to retrieve
   * the user info, then pushing into SecureStore and Redux Store
   * @param email the current user's email
   */
  const storeData = async (email) => {
    // Get and store user
    Axios.get(`${await Constants.BASE_URL()}/api/users/${email}`)
      .then(async ({ data }) => {
        const user = data[0];
        console.log(user);
        // push into secure store
        SecureStore.setItemAsync(
          Constants.MY_SECURE_AUTH_STATE_KEY_USER,
          JSON.stringify(user)
        );
        // push into redux store
        dispatch(dataActions.updateUser(user));
        // download and store image(avatar)
        let avatarUri;
        let listFileSystem = [];
        if (user.profilepic) {
          const downloadedUrl = await retrieveImage(user.profilepic);
          const result = await FileSystem.downloadAsync(
            downloadedUrl,
            FileSystem.documentDirectory + "avatar.jpg"
          )
            .then()
            .catch((err) => {
              console.log("Fail to store avatar to file system from login");
            });
          avatarUri = result.uri;
          dispatch(dataActions.updateAvatar(avatarUri));
        }
        SecureStore.setItemAsync(
          Constants.MY_SECURE_AUTH_STATE_IMAGE_URI,
          JSON.stringify({ avatar: avatarUri, album: listFileSystem })
        );
        if (user.picsList) {
          user.picsList.map(async (path) => {
            const downloadedUrl = await retrieveImage(path);
            const fileName = path.split("\\").pop().split("/").pop();
            const result = await FileSystem.downloadAsync(
              downloadedUrl,
              FileSystem.documentDirectory + fileName
            )
              .then()
              .catch((err) => {
                console.log("Fail to store album to file system from login");
              });
            const uri = result.uri;
            listFileSystem.push(uri);
            dispatch(dataActions.updateAlbum(uri));
            SecureStore.setItemAsync(
              Constants.MY_SECURE_AUTH_STATE_IMAGE_URI,
              JSON.stringify({ avatar: avatarUri, album: listFileSystem })
            );
          });
        }
        // Get and store housing
        if (user.isHousing) {
          Axios.get(`${await Constants.BASE_URL()}/api/housings/email/${email}`)
            .then(({ data }) => {
              const housing = data[0];
              // push into secure store
              SecureStore.setItemAsync(
                Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING,
                JSON.stringify(housing)
              );
              // push into redux store
              dispatch(dataActions.updateHousing(housing));
            })
            .catch((err) => {
              console.log("Fail to store housing data (Housing data is empty)");
            });
        }
        // Get and store no housing
        else {
          Axios.get(
            `${await Constants.BASE_URL()}/api/nohousing/email/${email}`
          )
            .then(({ data }) => {
              const housing = data[0];
              // push into secure store
              SecureStore.setItemAsync(
                Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING,
                JSON.stringify(housing)
              );
              // push into redux store
              dispatch(dataActions.updateHousing(housing));
            })
            .catch((err) => {
              console.log(
                "Fail to store nohousing data (noHousing data is empty)"
              );
            });
        }
      })
      .catch((err) => {
        console.log("Fail to store user data");
      });
  };
  /**
   * @params path the uri to image in Firebase Cloud Storage
   * Function to retrieve image from firebase cloud storage
   */
  const retrieveImage = async (path) => {
    if (path) {
      const reference = ref(storage, path);
      const url = await getDownloadURL(reference);
      return url;
    }
  };

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
                console.log("Login Successfully");
                // PULL FROM DATABASE -> STORE INTO SECURE STORAGE -> STORE INTO REDUX STORAGE
                await storeData(res.email);
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
        <Paragraph>Homes that Match</Paragraph>
        <TouchableOpacity>
          <Button
            mode="contained"
            onPress={() => promptAsync({ showInRecents: true })}
          >
            Sign in with Google
          </Button>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: "80%",
  },
});
export default LoginScreen;
