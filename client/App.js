import Axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Bottom Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator(); //Tab 

//Import screens in nav bar
import BirdFeed from "./screens/BirdFeed.js";
import Profile from "./screens/Profile.js";
import MessengerPigeon from "./screens/MessengerPigeon.js";
import ChirpNotification from "./screens/ChirpNotification.js";
import History from "./screens/History.js";
import LoginScreen from "./screens/Login.js";
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import image from "./assets/D85_6160.jpg";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [login, setLogin] = useState(false)

  const addUser = () => {
    Axios.post("http://localhost:3000/create", {
      username: username,
      email: email,
      password: password,
    })
      .then(() => {
        console.log("success");
      })
      .catch((error) => console.log(error));
  };

  const getUsers = () => {
    Axios.get("http://localhost:3000/api/users/")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  // check login context
  const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
  React.useEffect(() => {
    getValueFor(MY_SECURE_AUTH_STATE_KEY);
    console.log(login);
    console.log(MY_SECURE_AUTH_STATE_KEY);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{ headerShown: false }}
      >

        {!login && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="BirdFeed" component={BirdFeed} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MessengerPigeon" component={MessengerPigeon}/>
        <Stack.Screen name="ChirpNotification" component={ChirpNotification}/>
        <Stack.Screen name="History" component={History}/>
      </Stack.Navigator>

      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
  },
});
