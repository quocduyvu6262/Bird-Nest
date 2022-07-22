import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import UserCard from "../components/UserCard";
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
    <ScrollView >
      <Background>
        <UserCard name="Tony Vu"/>
        <View style={styles.buttonContainer}>
          <Button color="black">Bio</Button>
          <Button color="black" >Room Info</Button>
        </View>

        <Button onPress={()=>{
          logout();
        }}
        >
          Logout
        </Button>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    padding: 55
  }
});

export default Profile;
