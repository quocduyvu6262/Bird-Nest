import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

import Footer from "../components/Footer.js";

const History = ({ navigation }) => {
  return (
    <SafeAreaView style={History_styles.container}>
      <Text>History</Text>
    </SafeAreaView>
  );
};
const History_styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export default History;
