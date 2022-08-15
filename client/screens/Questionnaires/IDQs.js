import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import QuestHeader from "../../components/QuestHeader.js";
// local storage
import * as SecureStore from "expo-secure-store";
import Constants from "../../constants/constants.js";
import Axios from "axios";
// Redux
import {useDispatch, useSelector} from 'react-redux';
import * as dataActions from '../../redux/slices/data'; 
let user_email;
let finalResult;
const IDQs = ({ navigation }) => {
  // Redux
  const userInfo = useSelector((state) => state.data.userInfo);
  user_email = userInfo.email;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [picture, setPicture] = useState(require("../../assets/default.jpg"));
  let base64img = "data:image/jpeg;base64,"
  
  useEffect(() => {}, [picture])
  let openCamera = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); //ask user for permission into gallery
    
    if (permissionResult.granted === false) { //if user denies permission
      alert("Permission to access camera roll is required!");
      return;
    }
    
    let pickerResult = await ImagePicker.launchImageLibraryAsync({ //wait for user to choose image
      allowsEditing: true,
      base64: true
    }); 
    if (pickerResult.cancelled === true) { //if user exits out of gallery
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri }); //stores uri of image in localUri
    if(pickerResult.uri != null) { //if an image was selected by user
      base64img = base64img + pickerResult.base64;
      setPicture({uri: base64img});
      //need to call API to store each uri in database for each user
   }
   finalResult = base64img;
  }

  const uploadPicture = () => {
    
    
    Axios.post(`http:192.168.50.183:3000/api/pictures/profile`, {
      uri: finalResult,
      id: user_email
    })
      .then((response) => {
        console.log('uploaded');
      })
      .catch((error) => {
        console.log(error);
      });
      
     dispatch(dataActions.updateProfilepic(finalResult));
  };
  

  return (
    <SafeAreaView style={IDQs_styles.container}>
      {/* header */}
      <View style={IDQs_styles.header}>
        <Text style={IDQs_styles.headTitle}>Profile (1/4)</Text>
      </View>
      {/* Text input fields */}
      <Text style={IDQs_styles.headerText}>Let's get started!</Text>
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="First Name"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateFirstname(value))}
      />
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Last Name"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateLastname(value))}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={IDQs_styles.textInput}
          placeholder="Gender"
          placeholderTextColor="#949494"
          onChangeText={(value) => dispatch(dataActions.updateGender(value))}
        />
        <TextInput
          style={IDQs_styles.textInput}
          placeholder="Age"
          placeholderTextColor="#949494"
          onChangeText={(value) => dispatch(dataActions.updateAge(value))}
        />
      </View>
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Pronouns"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updatePronouns(value))}
      />
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Major"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateMajor(value))}
      />
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Graduation Year"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateGraduationyear(value))}
      />
      {/* Bio only for demo */}
      <TextInput style={IDQs_styles.textInput } placeholder='Bio' onChangeText={value => dispatch(dataActions.updateBio(value))}/>
      <Text style={IDQs_styles.photoWords}>Show potential roommates what you look like!</Text>
      {/* photo upload button */}
      <TouchableOpacity onPress={openCamera} style={{alignSelf: 'flex-start'}}>
        <Image
          style={{height: 95, width: 95, left: 140, top: 40, borderRadius: 50}}
          source={picture}
        />
        <Text style={{ fontSize: 40, color: "#6736B6", left: 205, fontWeight: 'bold',}}>+</Text>
      </TouchableOpacity>
      {/* next page button */}
      <TouchableOpacity
        style={IDQs_styles.nextButton}
        onPress={() => {
          //store();
          uploadPicture();
          navigation.navigate("Roles");
        }}
      >
        <Text style={IDQs_styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
  return finalResult;
};

const IDQs_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
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
    bottom: 50,
  },
  headTitle: {
    color: "#FFF",
    top: 55,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default IDQs;
