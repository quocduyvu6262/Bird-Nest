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
import image from "./assets/D85_6160.jpg";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const addUser = () => {
    Axios.post("http://localhost:5000/create", {
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
    Axios.get("http://localhost:5000/")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

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
