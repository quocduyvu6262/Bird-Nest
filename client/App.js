// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
} from "react-native";

//Import screens in nav bar
import BirdFeed from "./screens/BirdFeed.js";
import Profile from "./screens/Profile.js";
import MessengerPigeon from "./screens/MessengerPigeon.js";
import ChirpNotification from "./screens/ChirpNotification.js";
import History from "./screens/History.js";
import LoginScreen from "./screens/Login.js";
import AuthLoading from "./screens/AuthLoading.js";
import WelcomeScreen from "./screens/WelcomeScreen.js";

// Stack and Tab Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// import check login key
const MY_SECURE_AUTH_STATE_KEY = "MySecureAuthStateKey";

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Bird Feed" component={BirdFeed} />
      <Tab.Screen name="Messenger Pigeon" component={MessengerPigeon} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="BirdFeed" component={TabNavigator} />
        <Stack.Screen name="ChirpNotification" component={ChirpNotification} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
