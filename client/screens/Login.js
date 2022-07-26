//React 
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, processColor, Alert} from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

// Google sign in
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
// import {IOS_GOOGLE_CLIENT_ID} from "@env";
// import {MY_SECURE_AUTH_STATE_KEY} from "@env";
const MY_SECURE_AUTH_STATE_KEY="MySecureAuthStateKey";
const IOS_GOOGLE_CLIENT_ID = "314578595226-3pfqh454mrmhneevoetc6ensm0blsa4a.apps.googleusercontent.com"
// Axios
import Axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({navigation}) => {

  // execute google login
  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: IOS_GOOGLE_CLIENT_ID,
    androidClientId: "",
    iosClientId: "",
    selectAccount: true,
  });

  // fetch user info
  const fetchUser = async () => {
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await userInfoRes.json();
    return Axios.get(`http://localhost:3000/api/housings/${data.email}`).then((res) => {
      let houseInfo = res.data[0];
      return houseInfo;
    });
  }


  // use side effect
  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      if(accessToken){
        fetchUser().then((houseInfo) => {
          SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY,JSON.stringify(houseInfo));
          navigation.navigate("BirdFeed");
        });
      }
    }
  }, [response, accessToken]);

  return (
    <Background>
      <Logo />
      <Header>Bird Nest</Header>
      <Paragraph>
        Homes that Match
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => promptAsync({showInRecents: true})}
      >
        Sign in with Google
      </Button>
    </Background>
  )
};


export default LoginScreen;
