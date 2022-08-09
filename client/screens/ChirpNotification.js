import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";

import Footer from "../components/Footer.js";
import MainHeader from "../components/MainHeader.js";

import Birds from "../assets/svg/birds.svg";

const ChirpNotification = ({ navigation }) => {
  console.log(Birds);
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Chirp Notifications" navigation={navigation} />
      <Text>Chirp Notification</Text>
      <Text>W.I.P.</Text>
      {/* <Birds width={120} height={40} /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
});
export default ChirpNotification;
