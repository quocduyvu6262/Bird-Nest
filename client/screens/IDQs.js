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

    <SafeAreaView style={styles.container}>

        <QuestHeader title="Profile (1/5)"/>

      <Text style={styles.headerText}>Basic Demographic Information</Text>
      <TextInput style={styles.textInput} placeholder='First Name' onChangeText={value => dispatch(updateFirstname(value))}/>
      <TextInput style={ styles.textInput } placeholder='Last Name' onChangeText={value => dispatch(updateLastname(value))}/>
      <View style={{flexDirection: "row"}}>
        <TextInput style={ styles.textInput } placeholder='Gender' onChangeText={value => dispatch(updateGender(value))}/>
        <TextInput style={ styles.textInput } placeholder='Age' onChangeText={value => dispatch(updateAge(value))}/>
      </View>
      <TextInput style={ styles.textInput } placeholder='Pronouns' onChangeText={value => dispatch(updatePronouns(value))}/>
      <TextInput style={ styles.textInput } placeholder='Major' onChangeText={value => dispatch(updateMajor(value))}/>
      <TextInput style={ styles.textInput } placeholder='Graduation Year' onChangeText={value => dispatch(updateGraduationyear(value))}/>
      <Text style={styles.photoWords}>Show potential roommates what you look like!</Text>
      {/* photo upload button */}
      <TouchableOpacity style={styles.photoButton}>
        <Image style={{alignSelf: "center", tintColor: "#FFF" }} source={require("../assets/Upload.png")} />
        <Text style={{fontSize: 15, color: "#FFF"}}>Upload your face!</Text>
      </TouchableOpacity>
      {/* next page button */}
      <TouchableOpacity style={styles.nextButton}
        onPress={() => {
          store();
          navigation.navigate('HasHousingQ');
        }}
      >
        <Text style={styles.nextText}>Next Page</Text>
        <Image source={require("../assets/nextArrow.png")} style={styles.nextIcon} />
      </TouchableOpacity>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
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