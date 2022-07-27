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

// Import constants
import Constants from '../constants/constants';
// Axios
import Axios from 'axios';
import * as Network from 'expo-network';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({navigation}) => {

  // execute google login
  // const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.IOS_GOOGLE_CLIENT_ID,
    androidClientId: "",
    iosClientId: "",
    selectAccount: true,
  });


  // fetchGoogleUser
  const fetchGoogleUser = async (accessToken) => {
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await userInfoRes.json();
    return data;
  }

  // Fetch user 
  const fetchUser = async (data) => {
    return Axios.get(`${Constants.BASE_URL}/api/users/${data.email}`).then(res => {
      let userInfo = res.data;
      return userInfo;
    }).catch(err => {
      console.log(err);
    })
  }

  // fetch user info
  const fetchHousing = async (data) => {
    return Axios.get(`${Constants.BASE_URL}/api/housings/${data.email}`).then((res) => {
      let houseInfo = res.data[0];
      return houseInfo;
    }).catch(err => {
      console.log(err);
    });
  }

  // login with google
  const login = async (data) => {
    return Axios.post(`${Constants.BASE_URL}/api/users/loginwithgoogle`,{
      email: data.email,
      fullname: data.name
    }).then((res) => {
      return res.data
    }).catch(err => console.log(err));
  }


  // use side effect
  React.useEffect(() => {

    if (response?.type === 'success') {
      // setAccessToken(response.authentication.accessToken);
      const accessToken = response.authentication.accessToken;
      // SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY,JSON.stringify(accessToken));
      // navigation.navigate("BirdFeed");
      if(accessToken){
        fetchGoogleUser(accessToken).then((userInfo) => {
          login(userInfo).then(async res => {
            // Store User
            fetchUser(userInfo).then(async (user) => {
              if(user){
                await SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_USER,JSON.stringify(user));
              }
            }).catch(err => console.log(err));
            // Store Token
            await SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN,JSON.stringify(accessToken));
            //if user already existed
            // console.log(userInfo);
            // console.log(res);
            if(res === 'login'){
              fetchHousing(userInfo).then( async (houseInfo) => {
                if(houseInfo){
                  // Store Housing
                  await SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING,JSON.stringify(houseInfo));
                  navigation.navigate('BirdFeed');
                }
              })
            } else if (res === 'register') { // new user or user who has not filled in questionaires
              navigation.navigate('IDQs');
            }
          }).catch(err => console.log(err));

        });
      }
    }
  }, [response]);

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
