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
import Deondre from "../assets/deondre.jpg";
// Import constants
import Constants from "../constants/constants";
// Redux
import { useDispatch, useSelector } from "react-redux";
// firebase

const Profile = ({ navigation }) => {
  
  const data = useSelector(state => state.data);

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
          <UserCard
            name={data.userInfo.fullname}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Button
                color={!buttonClicked ? "#560CCE" : "black"}
                onPress={bioButton}
                style={
                  !buttonClicked && {
                    borderBottomColor: "#560CCE",
                    borderBottomWidth: 1,
                  }
                }
              >
                Bio
              </Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                color={buttonClicked ? "#560CCE" : "black"}
                onPress={roomInfoButton}
                style={
                  buttonClicked && {
                    borderBottomColor: "#560CCE",
                    borderBottomWidth: 1,
                  }
                }
              >
                Room Info
              </Button>
            </TouchableOpacity>
          </View>

          <InfoCard>
            {!buttonClicked && <BioInfo bio={data.userInfo.bio}></BioInfo>}

            {buttonClicked && (
              <RentInfo rent={data.housing.rent} lease={data.housing.lease} neighborhood={data.housing.neighborhood} />
            )}
          </InfoCard>

          <Button
            color={interestButtonClicked ? "#560CCE" : "black"}
            onPress={interestButton}
            style={
              interestButtonClicked && {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
              }
            }
          >
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
        {props.bio}
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
        <Text style={{ fontWeight: "bold" }}> Neighborhood:</Text> {props.neighborhood}
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
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
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
