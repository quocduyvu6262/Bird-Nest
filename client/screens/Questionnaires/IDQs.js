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
import QuestHeader from "../../components/QuestHeader.js";
// local storage
import * as SecureStore from "expo-secure-store";
import Constants from "../../constants/constants.js";

// Redux
import {useDispatch, useSelector} from 'react-redux';
import * as dataActions from '../../redux/slices/data'; 
import { validatePathConfig } from "@react-navigation/native";

const IDQs = ({ navigation }) => {
  // Redux
  const userInfo = useSelector((state) => state.data.userInfo);
  const dispatch = useDispatch();
  //Required question states
  //const [] = useState("");
  const [formState, setFormState] = useState("");
  const validate = () => {
    let blankError = "";
    if (userInfo.firstname === "" || userInfo.lastname === ""
        || userInfo.gender === "" || userInfo.age === "" 
        || userInfo.pronouns === "" || userInfo.major === "" 
        || userInfo.graduationyear === "") {
      blankError = "Please fill in all required fields*";
      setFormState(blankError);
      return false;
    }

    setFormState("");
    return true;
  }

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
        placeholder="First Name*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateFirstname(value))}
      />
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Last Name*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateLastname(value))}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={IDQs_styles.textInput}
          placeholder="Gender*"
          placeholderTextColor="#949494"
          onChangeText={(value) => dispatch(dataActions.updateGender(value))}
        />
        <TextInput
          style={IDQs_styles.textInput}
          placeholder="Age*"
          placeholderTextColor="#949494"
          onChangeText={(value) => dispatch(dataActions.updateAge(value))}
        />
      </View>
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Pronouns*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updatePronouns(value))}
      />
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Major*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateMajor(value))}
      />
      <TextInput
        style={IDQs_styles.textInput}
        placeholder="Graduation Year*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateGraduationyear(value))}
      />
      {/* Bio only for demo */}
      <TextInput style={IDQs_styles.textInput } placeholder='Bio' onChangeText={value => dispatch(dataActions.updateBio(value))}/>
      <Text style={IDQs_styles.photoWords}>Show potential roommates what you look like!</Text>
      {/* photo upload button */}
      <TouchableOpacity style={IDQs_styles.photoButton}>
        <Image
          style={{ alignSelf: "center", tintColor: "#FFF" }}
          source={require("../../assets/Upload.png")}
        />
        <Text style={{ fontSize: 15, color: "#FFF" }}>Upload your face!</Text>
      </TouchableOpacity>
      {/* next page button */}
      <View>
        <Text style ={IDQs_styles.invalidText}>
          {formState}
        </Text>
      </View>
      <TouchableOpacity
        style={IDQs_styles.nextButton}
        onPress={() => {
          //store();
          if (!validate()) {
            console.log("YOU SHALL NOT PASS");
          }
          else {
            navigation.navigate("Roles");
          }
          
        }}>
        <Text style={IDQs_styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const IDQs_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  invalidText: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
    alignItems: "center",
    bottom: -40,
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
