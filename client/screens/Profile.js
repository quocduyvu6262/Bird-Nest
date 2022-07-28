import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import UserCard from "../components/UserCard";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer.js";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import MainHeader from "../components/MainHeader";
import Tony from "../assets/tony.png";
// Import constants
import Constants from '../constants/constants';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {updateFirstname, updateLastname, updateGender, updateAge, updatePronouns, updateMajor, updateGraduationyear, updateProfilepic} from '../redux/slices/data'


const Profile = ({ navigation }) => {
  
  const userInfo = useSelector(state => state.data.userInfo);

  const [name, setName] = useState();
  const [rent, setRent] = useState();
  const [lease, setLease] = useState();
  const [city, setCity] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [interestButtonClicked, setInterestButtonClicked] = useState(false);


  const roomInfoButton = () => {
    setButtonClicked(true);
  };
  const bioButton = () => {
    setButtonClicked(false);
  };
  const interestButton = () => {
    interestButtonClicked
      ? setInterestButtonClicked(false)
      : setInterestButtonClicked(true);
  };
  // return screen
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Profile" navigation={navigation} />
      <ScrollView>
        <Background>
          <UserCard name={userInfo.firstname + ' ' + userInfo.lastname} image={Tony} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Button 
              color= {!buttonClicked ? "black" : "#560CCE"}
              onPress={bioButton}
              style = {!buttonClicked && {borderBottomColor: 'black', borderBottomWidth: 1,}}>
                Bio
              </Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
              color = {buttonClicked ? "black" : "#560CCE"}
              onPress={roomInfoButton}
              style = {buttonClicked && {borderBottomColor: 'black', borderBottomWidth: 1,}}>
                Room Info
              </Button>
            </TouchableOpacity>
          </View>

          <InfoCard>
            {!buttonClicked && <BioInfo></BioInfo>}

            {buttonClicked && (
              <RentInfo rent={rent} lease={lease} city={city} />
            )}
          </InfoCard>

          <Button 
          color= {interestButtonClicked ? "black" : "#560CCE"} 
          onPress={interestButton}
          style = {interestButtonClicked && {borderBottomColor: 'black', borderBottomWidth: 1,}}>
            See Interests/Personality
          </Button>

          {interestButtonClicked && (
            <InfoCard>
              <InterestInfo></InterestInfo>
            </InfoCard>
          )}
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
};

// Bio
const BioInfo = (props) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.text}>
        Hi, I am Duy, an incoming senior at UCSD. I love playing piano and
        watching movies while working.
      </Text>
    </View>
  );
};

// Rent Info
const RentInfo = (props) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}> Rent:</Text> ${props.rent}
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}> Lease Term:</Text> {props.lease}{" "}
        months
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}> City:</Text> {props.city}
      </Text>
    </View>
  );
};
// Interest Info
const InterestInfo = (props) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.text}>Ice cream</Text>
      <Text style={styles.text}>Drink</Text>
      <Text style={styles.text}>Boba</Text>
      <Text style={styles.text}>Movie</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  logoutButton: {
    flex: 1,
    bottom: 12,
  },
  subContainer: {
    padding: 10,
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
});

export default Profile;
