import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
  StatusBar,
  ScrollView,
<<<<<<< HEAD
  Touchable,
} from "react-native";
import React, { useState } from "react";

import MainHeader from "../components/MainHeader";
import Background from "../components/Background";
import PeckCard from "../components/PeckCard";
import UserCard from "../components/UserCard";
import Button from "../components/Button";
import InfoCard from "../components/InfoCard";

import Elie from "../assets/Elie.jpg";

const PeckView = ({ navigation }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const bioButton = () => {
    setButtonClicked(false);
  };

  const roomInfoButton = () => {
    setButtonClicked(true);
  };
  return (
    <SafeAreaView style={PeckView_Styles.container}>
      <MainHeader screen="Peck View" navigation={navigation} />
      <ScrollView>
        <Background>
          <PeckCard name="Elie" image={Elie}></PeckCard>
          <View style={PeckView_Styles.buttonContainer}>
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
            {!buttonClicked && <BioInfo />}

            {buttonClicked && <RentInfo />}
          </InfoCard>
        </Background>
      </ScrollView>
=======
} from "react-native";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Constants from "../constants/constants.js";
import barackObama from "../assets/barackObama.jpeg";

import MainHeader from "../components/MainHeader";
import PeckViewCard from "../components/PeckViewCard";
import StrokeAnimation from "../components/StrokeAnimation.js";

const PeckView = ({ navigation }) => {
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);

  const viewUsers = async () => {
    setUserList([]);
    Axios.post(`${await Constants.BASE_URL()}/api/matching/`, {
      user_id: 78,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
            name: userData[i].fullname,
            city: userData[i].city,
            src: barackObama,
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
            src: barackObama,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewUsers();
  }, []);

  return (
    <SafeAreaView style={PeckView_Styles.container}>
      <MainHeader screen="Peck View" navigation={navigation} />
      {!listState && (
        <TouchableOpacity
          onPress={() => setListState(true)}
          style={PeckView_Styles.button}
        >
          <StrokeAnimation style={PeckView_Styles.lower} />
        </TouchableOpacity>
      )}

      {userList.map((user, index) => (
        <PeckViewCard
          user={user}
          key={index}
          index={index}
          listState={listState}
          setListState={setListState}
        />
      ))}
>>>>>>> dev
    </SafeAreaView>
  );
};

<<<<<<< HEAD
const BioInfo = () => {
  return (
    <View style={PeckView_Styles.subContainer}>
      <Text style={PeckView_Styles.text}>
        Currently looking for a person to take over my lease!
      </Text>
    </View>
  );
};

const RentInfo = () => {
  return (
    <View style={PeckView_Styles.subContainer}>
      <Text style={PeckView_Styles.text}>Rent: $2000</Text>

      <Text style={PeckView_Styles.text}>Lease Term: 12 months</Text>

      <Text style={PeckView_Styles.text}>City: La Jolla, California</Text>
    </View>
  );
};
=======
>>>>>>> dev
const PeckView_Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
<<<<<<< HEAD
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  subContainer: {
    padding: 10,
  },
  text: {
    padding: 10,
    fontSize: 20,
=======
  button: {
    justifyContent: "center",
    alignSelf: "center",
    top: 200,
>>>>>>> dev
  },
});

export default PeckView;
