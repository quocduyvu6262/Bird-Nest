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
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Constants from "../constants/constants.js";
import barackObama from "../assets/barackObama.jpeg";

import MainHeader from "../components/MainHeader";
import PeckViewCard from "../components/PeckViewCard";
import StrokeAnimation from "../components/StrokeAnimation.js";
import { useSelector } from "react-redux";
<<<<<<< HEAD
=======
import { storage, ref, getDownloadURL } from "../firebaseConfig";
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5

const PeckView = ({ navigation }) => {
  const user = useSelector((state) => state.data.userInfo);
  const [userList, setUserList] = useState([]);

  /**
   * Call the matching algorithm and display
   * the list of users that match each criteria
   */
  const viewUsers = async () => {
    let userList = [];
    let apiEndpoint;
    if (user.role === "Flamingo" || user.role === "Owl") {
      apiEndpoint = "/api/matching/lookingfornohousing";
    } else {
      apiEndpoint = "/api/matching/lookingforhousing";
    }
    Axios.post(`${await Constants.BASE_URL()}${apiEndpoint}`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        let id_counter = 0;
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
<<<<<<< HEAD
            name: userData[i].info.fullname,
=======
            info: userData[i].info,
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
            src: barackObama,
            id: id_counter,
          });
          id_counter++;
        }
        setUserList((prevList) => [
          ...userList,
          {
<<<<<<< HEAD
            name: userData[userData.length - 1].info.fullname,
            city: userData[userData.length - 1].city,
=======
            info: userData[userData.length - 1].info,
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
            src: barackObama,
            id: id_counter,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewUsers();
    setTimeout(() => console.log(userList), 3000);
  }, []);

  const { width } = Dimensions.get("window");
  const CARD_WIDTH = width - 128;
  const side = (width + CARD_WIDTH + 100) / 2;
  const SNAP_POINTS = [-side, 0, side];

  return (
    <SafeAreaView style={[PeckView_Styles.container, StyleSheet.absoluteFill]}>
      <MainHeader screen="Peck View" navigation={navigation} />
      <View style={PeckView_Styles.wrapper}>
<<<<<<< HEAD
        {userList.map((user) => (
          <PeckViewCard
            user={user}
=======
        {userList.map((profile) => (
          <PeckViewCard
            user={profile}
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
            SNAP_POINTS={SNAP_POINTS}
            width={width}
            userList={userList}
            setUserList={setUserList}
            // CHANGE ID TO DATABASE ID WHEN I GET MORE INFORMATION ABOUT USER
<<<<<<< HEAD
            key={user.id}
            id={user.id}
=======
            key={profile.info.User_id}
            id={profile.info.User_id}
            userID={user.id}
            userName={user.fullname}
            navigation={navigation}
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const PeckView_Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  wrapper: {
    height: "100%",
    backgroundColor: "#CBC3E3",
  },
  // lower: {},
});

export default PeckView;
