import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";

import { imagesIndex } from "../assets/images/imagesIndex.js";

// update array with objects from backend
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

const BirdFeed = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Bird Feed</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>

      <View styles={Bird_Feed_styles.flatlist}>
        <FlatList data={UserData} renderItem={ProfileCard} />
      </View>

      {/* <Footer /> */}
    </SafeAreaView>
  );
};

const Bird_Feed_styles = StyleSheet.create({
  flatlist: {
    height: "80%",
  },
});

export default BirdFeed;
