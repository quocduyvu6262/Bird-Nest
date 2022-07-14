import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import Footer from "../components/Footer.js";

const BirdFeed = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Bird Feed</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>

      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
};

export default BirdFeed;
