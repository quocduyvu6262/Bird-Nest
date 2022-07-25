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

const LoginScreen = ({navigation}) => {

  // execute google login
  const MY_SECURE_AUTH_STATE_KEY = "MySecureAuthStateKey";
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "314578595226-3pfqh454mrmhneevoetc6ensm0blsa4a.apps.googleusercontent.com",
    androidClientId: "",
    iosClientId: ""
  });

  // use side effect
  React.useEffect(() => {
    try{
      if (response?.type === 'success') {
        setAccessToken(response.authentication.accessToken);
        // store token
        const auth = response.params;
        const storageValue = JSON.stringify(auth);
        if (Platform.OS !== 'web') {
          // Securely store the auth on your device
          SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, storageValue);
        }
        //store token
        navigation.navigate("BirdFeed");
      }
    } catch(err){
      console.log(err);
    };
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
