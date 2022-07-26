import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";
import MainHeader from "../components/MainHeader";

const MessengerPigeon = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Messenger Pigeon" navigation={navigation} />
      <Text>Messenger Pigeon</Text>
      <Text>Send a message. I dare you.</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
export default MessengerPigeon;
