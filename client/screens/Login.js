<<<<<<< HEAD
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
=======
import React from "react";
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
  Button,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Google from "expo-auth-session/providers/google";

// import google sign in
import * as WebBrowser from "expo-web-browser";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// secure store
import * as SecureStore from "expo-secure-store";
const MY_SECURE_AUTH_STATE_KEY = "MySecureAuthStateKey";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  // execute google login
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "",
    iosClientId: "",
    expoClientId:
      "314578595226-3pfqh454mrmhneevoetc6ensm0blsa4a.apps.googleusercontent.com",
  });

  // use side effect
  React.useEffect(() => {
    try {
      if (response?.type === "success") {
        setAccessToken(response.authentication.accessToken);
        // store token
        const auth = response.params;
        const storageValue = JSON.stringify(auth);
        if (Platform.OS !== "web") {
          // Securely store the auth on your device
          SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, storageValue);
        }
        //store token
        navigation.navigate("BirdFeed");
      }
    } catch (err) {
      console.log(err);
    }
  }, [response]);

  // get user info
  const fetchUserInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    setUser(userInfo);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.image}>
        <View style={styles.card}>
          <Text style={styles.heading}>Login</Text>
          <View style={styles.form}>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
              ></TextInput>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
              ></TextInput>
              <Text></Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Button
                style={styles.button}
                disabled={!request}
                title="Sign In with Google"
                onPress={() => {
                  promptAsync();
                }}
              />
              <TouchableOpacity style={styles.buttonAlt}>
                <Text style={styles.buttonAltText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "80%",
    marginTop: "55%",
    borderRadius: 20,
    maxHeight: 380,
    paddingBottom: "20%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "30%",
    color: "black",
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: "5%",
  },
  inputs: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
  },
  button: {
    width: "80%",
    backgroundColor: "black",
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonAlt: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonAltText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
  // error: {
  //     color: 'red'
  // }
});

export default LoginScreen;
>>>>>>> a997bd092a37b7b9ac71b4f2dbd38c8e10303b44
