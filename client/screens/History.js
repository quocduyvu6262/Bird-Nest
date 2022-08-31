import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import Background from "../components/Background";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProfileCard from "../components/ProfileCard";
import { IconButton } from "react-native-paper";
import Axios from "axios";
import Constants from "../constants/constants";

import MainHeader from "../components/MainHeader";

const History = ({ navigation }) => {
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);

  //methods
  const goBack = () => {
    navigation.goBack();
  };
  // view history
  const viewUsers = () => {
    setUserList([]);
    Axios.post(`${Constants.BASE_URL}/api/history/`, {
      user_id: 5,
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
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    setListState(true);
  };
  // useeffect
  useEffect(() => {
    viewUsers();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <View style={styles.headerContainer}>
          <IconButton
            icon="arrow-left"
            iconColor="black"
            size={30}
            onPress={goBack}
            style={styles.goBackButton}
          />
          <Header>History</Header>
        </View> */}
        <MainHeader screen="History" navigation={navigation} />
        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={userList}
              // data={UserData}
              renderItem={ProfileCard}
              extraData={userList}
              // extraData={UserData}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlist: {
    height: 1000,
    borderWidth: 1,
    borderColor: "black",
  },
});
export default History;

