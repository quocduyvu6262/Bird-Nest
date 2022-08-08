import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  InteractionManager,
  ActivityIndicator,
  CameraRoll,
} from "react-native";
import Logo from "./assets/bird.png";

import Axios from "axios";
import * as SecureStore from "expo-secure-store";

//Import screens in nav bar
import SplashScreen from "./screens/Auth/SplashScreen";
import BirdFeed from "./screens/BirdFeed.js";
import PeckView from "./screens/PeckView.js";
import Profile from "./screens/Profile.js";
import MessengerPigeon from "./screens/Messenger/MessengerPigeon.js";
import ChatRoom from "./screens/Messenger/ChatRoom";
import ChirpNotification from "./screens/ChirpNotification.js";
import History from "./screens/History.js";
import LoginScreen from "./screens/Auth/Login.js";
import Roles from "./screens/Questionnaires/Roles";
import IDQs from "./screens/Questionnaires/IDQs";
import Settings from "./screens/SettingsScreens/Settings";
import ChirpNotificationEdit from "./screens/SettingsScreens/ChirpNotificationEdit.js";
import HelpSupport from "./screens/SettingsScreens/HelpSupport.js";
import TermsOfService from "./screens/SettingsScreens/TermsOfService.js";
import NoHousingQ from "./screens/Questionnaires/NoHousingQ.js";
import HasHousingQ from "./screens/Questionnaires/HasHousingQ.js";
import Personality from "./screens/Questionnaires/Personality.js";
import BasicInfo from "./screens/Questionnaires/BasicInfo.js";

// logo icons
import BirdFeedLogo from "./assets/BirdFeedLogo.png";
import MessengerLogo from "./assets/MessengerLogo.png";
import ProfileLogo from "./assets/ProfileLogo.png";

// Stack and Tab Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators } from "@react-navigation/stack";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#560CCE" }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image style={{ height: 40, width: 40 }} source={ProfileLogo} />
          ),
        }}
      />
      <Tab.Screen
        name="Bird Feed"
        component={BirdFeed}
        options={{
          tabBarIcon: () => (
            <Image style={{ height: 50, width: 50 }} source={BirdFeedLogo} />
          ),
        }}
      />
      <Tab.Screen
        name="Messenger Pigeon"
        component={ChatRoom}
        options={{
          tabBarIcon: () => (
            <Image style={{ height: 50, width: 50 }} source={MessengerLogo} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
<ion-icon name="eye-outline"></ion-icon>;
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          //change back default to "Splashcreen" after testing
          initialRouteName="SplashScreen"
          //initialRouteName="BasicInfo"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="BirdFeed" component={TabNavigator} />
          <Stack.Screen name="PeckView" component={PeckView} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="ChirpNotificationEdit"
            component={ChirpNotificationEdit}
          />
          <Stack.Screen name="HelpSupport" component={HelpSupport} />
          <Stack.Screen name="TermsOfService" component={TermsOfService} />
          <Stack.Screen
            name="ChirpNotification"
            component={ChirpNotification}
          />
          <Stack.Screen name="IDQs" component={IDQs} />
          <Stack.Screen name="BasicInfo" component={BasicInfo} />
          <Stack.Screen name="NoHousingQ" component={NoHousingQ} />
          <Stack.Screen name="HasHousingQ" component={HasHousingQ} />
          <Stack.Screen name="Personality" component={Personality} />
          <Stack.Screen name="Roles" component={Roles} />
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
    </Provider>
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
