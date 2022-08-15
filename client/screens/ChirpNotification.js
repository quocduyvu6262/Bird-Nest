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
import Bird_Drawing from "../assets/svg/Bird_Drawing";

const ChirpNotification = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Chirp Notifications" navigation={navigation} />
      <Text>Chirp Notification</Text>
      <Text>W.I.P.</Text>
      <Bird_Drawing />
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
