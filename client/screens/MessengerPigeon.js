import { View, Text, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'

import Footer from "../components/Footer.js"

const MessengerPigeon = ({ navigation }) => {
  return (
    <SafeAreaView style = {Messenger_Pigeon_styles.container}>
      <Text>Messenger Pigeon</Text>
      <Text>Send a message. I dare you.</Text>
      <View style = {Messenger_Pigeon_styles.footer}>
        <Footer navigation={navigation}/>
      </View>
    </SafeAreaView>
  )
}
const Messenger_Pigeon_styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom:0,
    width: "100%",
},
  container: {
    flex:1,
  }
});
export default MessengerPigeon