import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  InteractionManager,
  ActivityIndicator,
} from "react-native";
import Logo from "./assets/bird.png";

import Axios from "axios";
import * as SecureStore from "expo-secure-store";

//Import screens in nav bar
import SplashScreen from "./screens/SplashScreen";
import BirdFeed from "./screens/BirdFeed.js";
import Profile from "./screens/Profile.js";
import MessengerPigeon from "./screens/MessengerPigeon.js";
import ChirpNotification from "./screens/ChirpNotification.js";
import History from "./screens/History.js";
import LoginScreen from "./screens/Login.js";
import AuthLoading from "./screens/AuthLoading.js";
import WelcomeScreen from "./screens/WelcomeScreen.js";
import IDQs from "./screens/IDQs.js";
import Settings from "./screens/Settings.js";
import ChirpNotificationEdit from "./screens/SettingsScreens/ChirpNotificationEdit.js";
import HelpSupport from "./screens/SettingsScreens/HelpSupport.js";
import TermsOfService from "./screens/SettingsScreens/TermsOfService.js";

// Stack and Tab Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators } from "@react-navigation/stack";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



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
      //change back default to "Splashcreen" after testing
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="BirdFeed" component={TabNavigator} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChirpNotificationEdit" component={ChirpNotificationEdit}/>
        <Stack.Screen name="HelpSupport" component={HelpSupport}/>
        <Stack.Screen name="TermsOfService" component={TermsOfService}/>
        <Stack.Screen name="ChirpNotification" component={ChirpNotification} />
        <Stack.Screen name="IDQs" component={IDQs} />
        <Stack.Screen
          name="History"
          component={History}
          // work on this
          // options={{
          //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // }}
        />
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
  SplashScreen: {
    alignSelf: "center",
    marginVertical: 350,
    height: 100,
    width: 100,
  },
});
