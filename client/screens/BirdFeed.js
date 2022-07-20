import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";

import React, { useState } from "react";
import Axios from "axios";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import ViewUsers from "../components/buttons/ViewUsers.js";
import AppLoading from "expo-app-loading";

import { Icon } from "@rneui/themed";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

const BirdFeed = ({ navigation }) => {
  const [transferList, setTransferList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  // ---------------------------------------
  // LOGIC FOR BUTTON AND UPDATING USER LIST

  // --- commented out for testing ---
  // const UserData = [
  //   {
  //     name: "Adam",
  //     src: imagesIndex[0],
  //   },
  //   {
  //     name: "Brian",
  //     src: imagesIndex[0],
  //   },
  // ];
  // console.log(UserData);

  const viewUsers = () => {
    setUserList([]);
    Axios.post("http://localhost:3000/api/matching/", {
      user_id: 10,

      // format for filter post request
      // "gargage": 1,
      // pool: 1,
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

  // ---------------------------------------

  if (!fontsLoaded) {
    return (<View></View>);
  } else {
    return (
      // Header - Beginning
      <SafeAreaView style={Bird_Feed_styles.container}>
        <View style={Bird_Feed_styles.header}>
          <Text style={Bird_Feed_styles.headerText}>Bird Feed</Text>

          <View style={Bird_Feed_styles.headerButtonView}>

            <TouchableOpacity 
              style={Bird_Feed_styles.headerButtons}
            >
              <Icon name="list" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={Bird_Feed_styles.headerButtons}
              onPress={() => navigation.navigate("History")}
            >
              <Icon name="history" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={Bird_Feed_styles.headerButtons}
              onPress={() => navigation.navigate("ChirpNotification")}
            >
              <Image source={require(`../assets/bird.png`)} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Header - Ending */}
        <TouchableOpacity
          style={[Bird_Feed_styles.input, { marginVertical: 7 }]}
        >
          <Icon3
            style={Bird_Feed_styles.input}
            name="options-sharp"
            size={30}
            color="black"
          />
          <TextInput
            style={Bird_Feed_styles.input}
            placeholder="Enter Filters"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={viewUsers}>
          <Text>View Users</Text>
        </TouchableOpacity>

        {listState && (
          <View styles={Bird_Feed_styles.flatlist}>
            <FlatList
              data={userList}
              // data={UserData}
              renderItem={ProfileCard}
              extraData={userList}
              // extraData={UserData}
            />
          </View>
        )}

        <View style={Bird_Feed_styles.footer}>
          <Footer navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }
};

const Bird_Feed_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    backgroundColor: "#C0C0C0",
    flexDirection: "row",
    color: "black",
    paddingLeft: 5,
  },
  header: {
    // backgroundColor: "gray",
    // height: Platform.OS === "ios" ? "7%" : "17%",
    flexDirection: "row",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 7,
    color: "#219EBC",
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
  },
  headerButtonView: {
    flexDirection: "row",
  },
  headerButtons: {
    marginRight: 15,
    alignSelf: "center",
    padding: 10,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#219EBC",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
export default BirdFeed;
