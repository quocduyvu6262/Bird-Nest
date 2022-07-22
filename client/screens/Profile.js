import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";

import ProfileCard from "../components/ProfileCard.js";
import Footer from "../components/Footer.js";
import * as SecureStore from 'expo-secure-store';


const Profile = ({ navigation }) => {

  // Logout 
  const logout = () => {
    const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';
    SecureStore.deleteItemAsync(MY_SECURE_AUTH_STATE_KEY)
        .then(() => {
          navigation.replace("LoginScreen");
        })
        .catch(err => console.log(err));
    }
  // return screen
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>
      <View>
        <Button 
            title="Logout"
            onPress={() => {
              logout();
            }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
export default Profile;
