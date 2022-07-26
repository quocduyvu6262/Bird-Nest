import React, { useEffect, useState } from "react";
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

const Profile = ({ navigation }) => {
  const [name, setName] = useState();
  const [rent, setRent] = useState();
  const [lease, setLease] = useState();
  const [city, setCity] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [interestButtonClicked, setInterestButtonClicked] = useState(false);
  const MY_SECURE_AUTH_STATE_KEY = "MySecureAuthStateKey";

  // Logout
  const logout = () => {
    SecureStore.deleteItemAsync(MY_SECURE_AUTH_STATE_KEY)
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((err) => console.log(err));
  };

  // Get User from Google Token

  const fetchHousingInfo = async () => {
    let secureStoreData = null;
    let accessToken = null;
    secureStoreData = await SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY);
    secureStoreData = JSON.parse(secureStoreData);
    accessToken = secureStoreData.access_token;
    let userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    userInfoRes.json().then((data) => {
      // setUser(data);
      Axios.get(`http://localhost:3000/api/housings/${data.email}`)
        .then((res) => {
          let houseInfo = res.data[0];
          setName(houseInfo.fullname);
          setRent(houseInfo.rent);
          setLease(houseInfo.lease);
          setCity(houseInfo.city);
        })
        .catch((err) => console.log(err));
    });
  };

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
    <SafeAreaView style={Profile_styles.container}>
      <ScrollView>
        <MainHeader screen="Profile" navigation={navigation} />
        <Background>
          <UserCard name={name} />
          <View style={Profile_styles.buttonContainer}>
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
            style={Profile_styles.logoutButton}
            onPress={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
};

// Bio
const BioInfo = (props) => {
  return (
    <View style={Profile_styles.subContainer}>
      <Text style={Profile_styles.text}>
        Hi, I am Duy, an incoming senior at UCSD. I love playing piano and
        watching movies while working.
      </Text>
    </View>
  );
};

// Rent Info
const RentInfo = (props) => {
  return (
    <View style={Profile_styles.subContainer}>
      <Text style={Profile_styles.text}>
        <Text style={{ fontWeight: "bold" }}> Rent:</Text> ${props.rent}
      </Text>
      <Text style={Profile_styles.text}>
        <Text style={{ fontWeight: "bold" }}> Lease Term:</Text> {props.lease}{" "}
        months
      </Text>
      <Text style={Profile_styles.text}>
        <Text style={{ fontWeight: "bold" }}> City:</Text> {props.city}
      </Text>
    </View>
  );
};
// Interest Info
const InterestInfo = (props) => {
  return (
    <View style={Profile_styles.subContainer}>
      <Text style={Profile_styles.text}>Ice cream</Text>
      <Text style={Profile_styles.text}>Drink</Text>
      <Text style={Profile_styles.text}>Boba</Text>
      <Text style={Profile_styles.text}>Movie</Text>
    </View>
  );
};

const Profile_styles = StyleSheet.create({
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
