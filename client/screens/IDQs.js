import { StyleSheet, Image, View, Text, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import QuestHeader from "../components/QuestHeader.js"
// local storage
import * as SecureStore from 'expo-secure-store';
import Constants from '../constants/constants.js';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {updateFirstname, updateLastname, updateGender, updateAge, updatePronouns, updateMajor, updateGraduationyear, updateProfilepic} from '../redux/slices/data'

const IDQs = ({navigation}) => {

  // Redux
  const userInfo = useSelector((state) => state.data.userInfo);
  const dispatch = useDispatch();

  // Store to secure store
  const store = () => {
    SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_REDUX, JSON.stringify(userInfo));
  }
  return (

    <SafeAreaView style={IDQs_styles.container}>
      {/* header */}
      <View style={IDQs_styles.header}>
        <Text style={IDQs_styles.headTitle}>Profile (1/5)</Text>
      </View>
      {/* Text input fields */}
      <Text style={IDQs_styles.headerText}>Let's get started!</Text>
      <TextInput style={IDQs_styles.textInput} placeholder='First Name' onChangeText={value => dispatch(updateFirstname(value))}/>
      <TextInput style={IDQs_styles.textInput } placeholder='Last Name' onChangeText={value => dispatch(updateLastname(value))}/>
      <View style={{flexDirection: "row"}}>
        <TextInput style={IDQs_styles.textInput } placeholder='Gender' onChangeText={value => dispatch(updateGender(value))}/>
        <TextInput style={IDQs_styles.textInput } placeholder='Age' onChangeText={value => dispatch(updateAge(value))}/>
      </View>
      <TextInput style={IDQs_styles.textInput } placeholder='Pronouns' onChangeText={value => dispatch(updatePronouns(value))}/>
      <TextInput style={IDQs_styles.textInput } placeholder='Major' onChangeText={value => dispatch(updateMajor(value))}/>
      <TextInput style={IDQs_styles.textInput } placeholder='Graduation Year' onChangeText={value => dispatch(updateGraduationyear(value))}/>
      {/* Bio only for demo */}
      <TextInput style={IDQs_styles.textInput } placeholder='Bio' onChangeText={value => dispatch(updateGraduationyear(value))}/>
      <Text style={IDQs_styles.photoWords}>Show potential roommates what you look like!</Text>
      {/* photo upload button */}
      <TouchableOpacity style={IDQs_styles.photoButton}>
        <Image style={{alignSelf: "center", tintColor: "#FFF" }} source={require("../assets/Upload.png")} />
        <Text style={{fontSize: 15, color: "#FFF"}}>Upload your face!</Text>
      </TouchableOpacity>
      {/* next page button */}
      <TouchableOpacity style={IDQs_styles.nextButton}
        onPress={() => {
          store();
          navigation.navigate('HasHousingQ');
        }}
      >
        <Text style={IDQs_styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

const IDQs_styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    textInput: {
      fontSize: 20,
      color: "black",
      backgroundColor: "#D9D9D9",
      margin: 8,
      paddingHorizontal: 20,
      paddingVertical: 5, 
      borderRadius: 7,
    },
    headerText: {
      flexDirection: "row",
      fontSize: 25,
      left: 7,
      color: "#6736B6",
      alignSelf: "center",
      bottom: 15,

    },
    photoButton: {
      backgroundColor: "#6736B6",
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 5,
      margin: 10,
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
      alignSelf: "center",
      alignItems: "center",
      position: "absolute",
      bottom: "10%",
      backgroundColor: "#6736B6",
      paddingVertical: 8,
      paddingHorizontal: 35,
      borderRadius: 23,
    },
    nextText: {
      fontSize: 14,
      color: "#FFF",
      margin: 3,
      fontWeight: "bold",
    },
    header: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#6736B6",
      height: 90,
      bottom: 47,
    },
    headTitle: {
      color: "#FFF",
      top: 55,
      alignSelf: "center",
      fontSize: 20,
      fontWeight: "bold",
    },
});
export default IDQs