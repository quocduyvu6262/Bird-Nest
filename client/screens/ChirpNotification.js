import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Footer from "../components/Footer.js";

const ChirpNotification = ({ navigation }) => {
  return (
    <SafeAreaView style={Chirp_Notification_styles.container}>
      <Text>Chirp Notification</Text>
      <Text>W.I.P.</Text>
      <View style={Chirp_Notification_styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
const Chirp_Notification_styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  container: {
    flex: 1,
  },
});
export default ChirpNotification;
