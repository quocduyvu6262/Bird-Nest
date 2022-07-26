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
import {MY_SECURE_AUTH_STATE_KEY} from "@env"

const Profile = ({ navigation }) => {
  const [name, setName] = useState();
  const [rent, setRent] = useState();
  const [lease, setLease] = useState();
  const [city, setCity] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [interestButtonClicked, setInterestButtonClicked] = useState(false);

  // Get User from Google Token
  const fetchHousingInfo = async () => {
    let houseInfo = null;
    houseInfo = SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY).then(data => {
      let houseInfo = JSON.parse(data);
      if(houseInfo){
        setName(houseInfo.fullname);
        setRent(houseInfo.rent);
        setLease(houseInfo.lease);
        setCity(houseInfo.city);
      }
    });
  }

  
  // Use Effect
  useEffect(() => {
    fetchHousingInfo();
  }, []);

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
          <UserCard name={name} image={Tony} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Button color="black" onPress={bioButton}>
                Bio
              </Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button color="black" onPress={roomInfoButton}>
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

          <Button color="black" onPress={interestButton}>
            See Interests/Personality
          </Button>

          {interestButtonClicked && (
            <InfoCard>
              <InterestInfo></InterestInfo>
            </InfoCard>
          )}

          <Button
            style={styles.logoutButton}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            Settings
          </Button>
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
