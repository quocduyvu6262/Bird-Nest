import { StyleSheet, Image, View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import QuestHeader from "../components/QuestHeader.js"

const IDQs = () => {
  return (

    <SafeAreaView style={IDQs_styles.container}>
      <Text style={IDQs_styles.headerText}>Basic Demographic Information</Text>
      <TextInput style={IDQs_styles.textInput} placeholder='First Name' />
      <TextInput style={ IDQs_styles.textInput } placeholder='Last Name' />
      <View style={{flexDirection: "row"}}>
        <TextInput style={ IDQs_styles.textInput } placeholder='Gender' />
        <TextInput style={ IDQs_styles.textInput } placeholder='Age' />
      </View>
      <TextInput style={ IDQs_styles.textInput } placeholder='Pronouns' />
      <TextInput style={ IDQs_styles.textInput } placeholder='Major' />
      <TextInput style={ IDQs_styles.textInput } placeholder='Graduation Year' />
      <Text style={IDQs_styles.photoWords}>Show potential roommates what you look like!</Text>
      {/* photo upload button */}
      <TouchableOpacity style={IDQs_styles.photoButton}>
        <Image style={{alignSelf: "center" }} source={require("../assets/Upload.png")} />
        <Text style={{fontSize: 15}}>Upload your face!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

const IDQs_styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#219EBC',
    },
    textInput: {
      fontSize: 20,
      color: "black",
      backgroundColor: "pink",
      margin: 8,
      paddingHorizontal: 20,
      paddingVertical: 5, 
      borderWidth: 2,
      borderRadius: 15,
    },
    headerText: {
      flexDirection: "row",
      backgroundColor: "orange",
      fontSize: 25,
      left: 7,
      color: "black",
      alignSelf: "center",

    },
    photoButton: {
      backgroundColor: "orange",
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 5,
      margin: 10,
      borderWidth: 2,
      borderRadius: 8,
      top: 20,
    },
    photoWords: {
      top: 10,
      alignSelf: "center", 
      fontSize: 15, 
      fontWeight: "bold",
    },
});
export default IDQs