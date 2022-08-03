import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";
import Users from "./Users";
import ChatApp from "./ChatApp";

const MessengerPigeon = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Messenger Pigeon" navigation={navigation} />
      <ChatApp></ChatApp>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
});
export default MessengerPigeon;