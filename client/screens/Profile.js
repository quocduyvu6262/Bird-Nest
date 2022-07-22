import React, {useState} from "react";
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
import InfoCard from "../components/InfoCard";
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
    
  const [buttonClicked, setButtonClicked] = useState(false);

  const roomInfoButton = () => {
    setButtonClicked(true)
    console.log(buttonClicked)
  }
  const bioButton = () => {
    setButtonClicked(false)
    console.log(buttonClicked)
  }
  // return screen
  return (
    <ScrollView>
      <Background>
        <UserCard name="Tony Vu"/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Button 
            color="black"
            onPress = {bioButton}>Bio</Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button 
            color="black"
            onPress = {roomInfoButton}>Room Info</Button>
          </TouchableOpacity>
        </View>

        <InfoCard>
        {!buttonClicked && (
          <Text style = {{ fontSize: 20,}} 
          >Bio success</Text>
        )}

        {buttonClicked && (
          <Text style = {{ fontSize: 20,}} 
          >Room Info success</Text>
        )}
        </InfoCard>

        <Button style = {styles.logoutButton}
        onPress={()=>{
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
  },
  logoutButton: {
    flex: 1,
    bottom: 12,
  }
});

export default Profile;
