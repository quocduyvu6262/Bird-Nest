import {
  StyleSheet,
  Image,
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView } from "react-native";
import React from "react";
import Footer from "../components/Footer.js";
import {stepforward} from "react-native-vector-icons"
import { Icon } from "@rneui/themed";

const BirdFeed = ({ navigation }) => {
  return (
    // Header - Beginning
    <SafeAreaView style={Bird_Feed_styles.container}>
      <View style={Bird_Feed_styles.header}>
        <Text style={Bird_Feed_styles.headerText}>Bird Feed</Text>

      <View style={Bird_Feed_styles.headerButtonView}>
          <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
            <Icon name='list' />
          </TouchableOpacity>

          <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
            <Icon name='history' />
          </TouchableOpacity>

          <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
            <Image source={require(`../assets/bird.png`)} />
          </TouchableOpacity>

        </View>
      </View>


      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>

      <Footer />
    </SafeAreaView>
  );
};

const Bird_Feed_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: "gray",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 30,
    left: 15,
    color: "black",
    alignSelf: "center",
    fontFamily: "Arial",
  },

  headerButtonView: {
    // backgroundColor: "red",
    flexDirection: "row",
    marginRight: 0,
  },
  headerButtons: {
    marginRight: 15,
    alignSelf: "center",
    padding: 7,
    borderWidth: 3,
    borderRadius: "50%",
    borderColor: "#219EBC",
  },
});
export default BirdFeed;
