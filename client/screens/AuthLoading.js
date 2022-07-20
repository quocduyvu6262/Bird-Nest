import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text } from 'react-native';

const AuthLoading = navData => {
    const checkLoginState = async () => {
        const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';
        // retrieve the value of the token
        const userToken = await SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY);
        
        // navigate to the app screen if a token is present
        // else navigate to the auth screen
        navData.navigation.navigate(userToken ? 'BirdFeed' : 'LoginScreen');
    }

    useEffect(()=>{
        checkLoginState();
    });
    return <View></View>;
};
export default AuthLoading;