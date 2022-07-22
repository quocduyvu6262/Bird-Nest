import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";

import Footer from "../components/Footer.js";

const MessengerPigeon = ({ navigation }) => {
  return (
    <SafeAreaView style={Messenger_Pigeon_styles.container}>
      <Text>Messenger Pigeon</Text>
      <Text>Send a message. I dare you.</Text>
    </SafeAreaView>
  );
};
const Messenger_Pigeon_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export default MessengerPigeon;
