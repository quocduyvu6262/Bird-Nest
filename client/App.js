import React from "react";
import {
  StyleSheet,
  Image,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "./screens/Auth/SplashScreen";
import BirdFeed from "./screens/BirdFeed.js";
import PeckView from "./screens/PeckView.js";
import Profile from "./screens/Profile.js";
import ChirpNotification from "./screens/ChirpNotification.js";
import History from "./screens/History.js";
import LoginScreen from "./screens/Auth/Login.js";
import Roles from "./screens/Questionnaires/Roles";
import IDQs from "./screens/Questionnaires/IDQs";
import Settings from "./screens/SettingsScreens/Settings";
import ChirpNotificationEdit from "./screens/SettingsScreens/ChirpNotificationEdit.js";
import HelpSupport from "./screens/SettingsScreens/HelpSupport.js";
import TermsOfService from "./screens/SettingsScreens/TermsOfService.js";
import AboutUs from "./screens/SettingsScreens/AboutUs.js";
import NoHousingQ from "./screens/Questionnaires/NoHousingQ.js";
import HasHousingQ from "./screens/Questionnaires/HasHousingQ.js";
import Personality from "./screens/Questionnaires/Personality.js";
import BasicInfo from "./screens/Questionnaires/BasicInfo.js";
import EditProfile from "./screens/EditProfile";
import UserProfile from "./components/UserProfile";
import ChatNavigator from "./screens/ChatAPI/ChatNavigator";
import BirdFeedLogo from "./assets/BirdFeedLogo.png";
import MessengerLogo from "./assets/MessengerLogo.png";
import ProfileLogo2 from "./assets/ProfileLogo2.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { Provider } from "react-redux";
import { store } from "./redux/store";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#560CCE",
        tabBarStyle: { height: 90 },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image style={{ height: 50, width: 50 }} source={ProfileLogo2} />
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
        component={ChatNavigator}
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
function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            //change back default to "Splashcreen" after testing
            initialRouteName="SplashScreen"
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
            <Stack.Screen name="AboutUs" component={AboutUs} />
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
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
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

export default App;
