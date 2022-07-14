import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Footer from "../components/Footer.js"

const MessengerPigeon = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Messenger Pigeon</Text>
      <Text>Send a message. I dare you.</Text>
      <Footer navigation={navigation}/>
    </SafeAreaView>
  )
}

export default MessengerPigeon