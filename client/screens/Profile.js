import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image
} from "react-native";
import React from "react";

import ProfileCard from "../components/ProfileCard.js";
import Footer from "../components/Footer.js";
import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {

  const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';
  const [user, setUser] = React.useState();

  // Logout 
  const logout = () => {
    SecureStore.deleteItemAsync(MY_SECURE_AUTH_STATE_KEY)
        .then(() => {
          navigation.replace("LoginScreen");
        })
        .catch(err => console.log(err));
  }
  let userToken = null;
  (async () => {userToken = await SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY);})();
  // get user
  const fetchUserInfo = async () => {
    // fetch user data
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    userInfoRes.json().then(data => {
      setUser(data);
    })
  }

  //show user info
  function showUserInfo() {
    if (user) {
      return (
        <View style={styles.user}>
          <Image source={{uri: user.picture}} style={styles.profilePic} />
          <Text>Welcome {user.name}</Text>
          <Text>{user.email}</Text>
        </View>
      );
    }
  }


  // return screen
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
      <View>
        {showUserInfo()}
        <Button 
            title="Get User Data"
            onPress={() => {
              fetchUserInfo();
            }}
        />
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
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
