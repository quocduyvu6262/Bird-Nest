import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";

const BirdFeed = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text style={{ color: "red" }}>BirdFeed</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BirdFeed;
