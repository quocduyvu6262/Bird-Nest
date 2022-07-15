import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Axios from "axios";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import { Icon } from "@rneui/themed";
import ViewUsers from "../components/buttons/ViewUsers.js";
import AppLoading from "expo-app-loading";
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
    console.log("-----separation----");
    userList.splice(0, userList.length);
    Axios.post("http://localhost:3000/api/matching/", {
      user_id: 10,
    })
      .then((response) => {
        let userData = response.data;
        console.log(userData);
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
            name: userData[i].fullname,
            city: userData[i].city,
            neighborhood: userData[i].neighborhood,
            rent: userData[i].rent,
            matching_number: userData[i].number,
            src: imagesIndex[0],
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
            neighborhood: userData[userData.length - 1].neighborhood,
            rent: userData[userData.length - 1].rent,
            matching_number: userData[userData.length - 1].number,
            src: imagesIndex[0],
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    setListState(true);
  };

  const filterUsers = () => {
    // clear userList array for re-rendering sorted users
    userList.splice(0, userList.length);
    Axios.post("http://localhost:3000/api/matching/filtered", {
      gargage: 1,
      gym: 1,
      parking: 1,
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
            neighborhood: userData[i].neighborhood,
            rent: userData[i].rent,
            matching_number: userData[i].number,
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
            neighborhood: userData[userData.length - 1].neighborhood,
            rent: userData[userData.length - 1].rent,
            matching_number: userData[userData.length - 1].number,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(userList);
  };

  // ---------------------------------------

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // Header - Beginning
      <SafeAreaView style={Bird_Feed_styles.container}>
        <View style={Bird_Feed_styles.header}>
          <Text style={Bird_Feed_styles.headerText}>Bird Feed</Text>

          <View style={Bird_Feed_styles.headerButtonView}>
            <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
              <Icon name="list" />
            </TouchableOpacity>

            <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
              <Icon name="history" />
            </TouchableOpacity>
            <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
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
        <TouchableOpacity onPress={filterUsers}>
          <Text>Filter Users</Text>
        </TouchableOpacity>

        {listState && (
          <View style={Bird_Feed_styles.flatlist}>
            <FlatList
              data={userList}
              renderItem={ProfileCard}
              extraData={userList}
              style={{
                maxHeight: 600,
              }}
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
  },
  input: {
    backgroundColor: "#C0C0C0",
    flexDirection: "row",
    color: "black",
    paddingLeft: 5,
  },
  header: {
    // backgroundColor: "gray",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 7,
    color: "#219EBC",
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
    zIndex: 10,
  },

  headerButtonView: {
    // backgroundColor: "red",
    flexDirection: "row",
    marginRight: 0,
  },
  headerButtons: {
    marginRight: 15,
    alignSelf: "center",
    padding: 10,
    borderWidth: 3,
    borderRadius: "50%",
    borderColor: "#219EBC",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    // backgroundColor: "white",
  },
  // flatlist: {
  //   flex: 1,
  //   height: 200,
  // },
});
export default BirdFeed;
