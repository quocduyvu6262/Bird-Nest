import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Text } from "react-native";
// Import constants
import Constants from '../constants/constants';

const AuthLoading = ({ navigation }) => {
  const checkLoginState = async () => {
    
    // retrieve the value of the token
    const userToken = await SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN);

    // navigate to the app screen if a token is present
    // else navigate to the auth screen
    navigation.navigate(userToken ? "BirdFeed" : "LoginScreen");
  };

  useEffect(() => {
    checkLoginState();
  });
  return <View></View>;
};
export default AuthLoading;
