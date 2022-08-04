import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";
import MyAddChatScreen from "./MyAddChatScreen";
const MessengerPigeon = ({navigation}) => {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <MainHeader screen="Messenger Pigeon" navigation={navigation} />
      <MyAddChatScreen navigation = {navigation}></MyAddChatScreen>
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
