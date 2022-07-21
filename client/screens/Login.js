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

// Axios
import axios from 'axios';


WebBrowser.maybeCompleteAuthSession();


const LoginScreen = navData => {

  // execute google login
  const MY_SECURE_AUTH_STATE_KEY = "MySecureAuthStateKey";
  const [accessToken, setAccessToken] = useState();
  const [user, setUser] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "314578595226-3pfqh454mrmhneevoetc6ensm0blsa4a.apps.googleusercontent.com",
    androidClientId: "",
    iosClientId: ""
  });

  // use side effect
  useEffect(() => {
    
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      //store token
      navData.navigation.navigate("Profile");
    
      if(accessToken){
        SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, accessToken);
        fetchUserData();
      }
    }
  }, [response, accessToken]);

  //Fetch User Function
  const fetchUserData = async () => {
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    userInfoRes.json().then(data => {
      // setUser(data);
      axios.post('http://localhost:3000/api/users/loginwithgoogle',{
        email: data.email,
        fullname: data.name
      }).then(() => {
      }).catch(err => console.log(err));
    })
  }

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