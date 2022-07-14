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

const Stack = createNativeStackNavigator();

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BirdFeed"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BirdFeed" component={BirdFeed} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MessengerPigeon" component={MessengerPigeon}/>
      </Stack.Navigator>

      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
  },
});
