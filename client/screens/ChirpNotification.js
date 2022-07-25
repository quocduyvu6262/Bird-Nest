import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

import Footer from "../components/Footer.js";

const ChirpNotification = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Chirp Notification</Text>
      <Text>W.I.P.</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export default ChirpNotification;
