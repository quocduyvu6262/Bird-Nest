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
  const [listState, setListState] = useState(0);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  // ---------------------------------------
  // LOGIC FOR BUTTON AND UPDATING USER LIST

  // update array with objects from backend

  // --- commented out for testing ---
  const UserData = [
    {
      name: "Adam",
      src: imagesIndex[0],
    },
    {
      name: "Brian",
      src: imagesIndex[0],
    },
  ];
  // console.log(UserData);

  // const UserData = [];

  const viewUsers = () => {
    Axios.post("http://localhost:3000/api/matching/", {
      user_id: 10,
    })
      .then((response) => {
        console.log(response.data[0].fullname);
        let name = response.data[0].fullname;
        const UserObject = {
          name: name,
        };
        UserData.push(UserObject);
        console.log(name);
        console.log(UserData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateListState = () => {
    setListState(listState + 1);
    console.log(listState);
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

        <View styles={Bird_Feed_styles.flatlist}>
          <FlatList
            data={UserData}
            renderItem={ProfileCard}
            extraData={listState}
          />
        </View>
        <TouchableOpacity onPress={updateListState}>
          <Text>Update State</Text>
        </TouchableOpacity>

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
  },
});
export default BirdFeed;
