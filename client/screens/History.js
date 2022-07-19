import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Footer from "../components/Footer.js";

const History = ({ navigation }) => {
  return (
    <SafeAreaView style={History_styles.container}>
      <Text>History</Text>
      <Text>W.I.P.</Text>
      <View style={History_styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
const History_styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  container: {
    flex: 1,
  },
});
export default History;
