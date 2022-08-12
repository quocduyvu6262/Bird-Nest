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

  const viewUsers = () => {
    setUserList([]);
    Axios.post(`${Constants.BASE_URL}/api/matching/`, {
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
    // viewUsers();
  }, []);

  // ----------- TEST LIST ---------------
  const testList = [
    {
      name: "bob",
    },
    {
      name: "nancy",
    },
    {
      name: "drew",
    },
  ];

  console.log(testList);

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

      {listState &&
        testList.map((user, index) => (
          <PeckViewCard
            user={user}
            key={index}
            index={index}
            listState={listState}
          />
        ))}
    </SafeAreaView>
  );
};

const PeckView_Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    top: 200,
  },
  // lower: {},
});

export default PeckView;
