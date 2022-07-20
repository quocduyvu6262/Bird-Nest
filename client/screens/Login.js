import { View, Text, SafeAreaView, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { AuthContext } from "../App";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  //   <AuthContext.Consumer>{console.log(value)}</AuthContext.Consumer>

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1037067763056-9s0pibe2utq867496i4necut03i2jam5.apps.googleusercontent.com",
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access Token print:" + authentication.accessToken);
    }
  }, [response]);

  return (
    <SafeAreaView>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </SafeAreaView>
  );
};

export default Login;
