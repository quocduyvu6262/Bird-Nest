import { StyleSheet, Image, View, Text, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import QuestHeader from "../components/QuestHeader.js"

const IDQs = () => {
  return (

    <SafeAreaView style={IDQs_styles.container}>

        <QuestHeader title="Profile (1/5)"/>

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
        <Image style={{alignSelf: "center", tintColor: "#FFF" }} source={require("../assets/Upload.png")} />
        <Text style={{fontSize: 15, color: "#FFF"}}>Upload your face!</Text>
      </TouchableOpacity>
      {/* next page button */}
      <TouchableOpacity style={IDQs_styles.nextButton}>
        <Text style={IDQs_styles.nextText}>Next Page</Text>
        <Image source={require("../assets/nextArrow.png")} style={IDQs_styles.nextIcon} />
      </TouchableOpacity>
    </SafeAreaView>

  )
}

const IDQs_styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CFEEF5',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    textInput: {
      fontSize: 20,
      color: "black",
      backgroundColor: "#D9D9D9",
      margin: 8,
      paddingHorizontal: 20,
      paddingVertical: 5, 
      borderWidth: 2,
      borderRadius: 15,
    },
    headerText: {
      flexDirection: "row",
      // backgroundColor: "#6736B6",
      fontSize: 25,
      left: 7,
      color: "#6736B6",
      alignSelf: "center",

    },
    photoButton: {
      backgroundColor: "#6736B6",
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
    nextButton: {
      flexDirection:"row",
      alignSelf: "flex-end",
    },
    nextText: {
      fontSize: 15,
      color: "#6736B6",
      margin: 3,
      // fontWeight: "bold",
    },
    nextIcon: {
      height: 30, 
      width: 30, 
      tintColor: "#6736B6",
    },
    
});
export default IDQs