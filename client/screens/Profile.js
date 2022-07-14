import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";

import ProfileCards from "../components/ProfileCards.js";
import Footer from "../components/Footer.js";

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>
      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
};

export default Profile;
