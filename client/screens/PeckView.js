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

const PeckView = ({ navigation }) => {
  const [userList, setUserList] = useState([]);

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
        let id_counter = 0;
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
            name: userData[i].fullname,
            city: userData[i].city,
            src: barackObama,
            id: id_counter,
          });
          id_counter++;
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
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
        {userList.map((user) => (
          <PeckViewCard
            user={user}
            SNAP_POINTS={SNAP_POINTS}
            width={width}
            userList={userList}
            setUserList={setUserList}
            // CHANGE ID TO DATABASE ID WHEN I GET MORE INFORMATION ABOUT USER
            key={user.id}
            id={user.id}
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
});

export default PeckView;
