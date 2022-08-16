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
import {useDispatch, useSelector} from 'react-redux'; 
import * as dataActions from '../../redux/slices/data'; 
import { validatePathConfig } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, storage, getDownloadURL } from '../../firebaseConfig';

const IDQs = ({ navigation }) => {
  
  const [isUploaded, setIsuploaded] = useState(false);
  const [currentUri, setCurrentUri] = useState(null);

  /**
   * Store and retrieve data from Redux store
   */
  const userInfo = useSelector((state) => state.data.userInfo);
  const dispatch = useDispatch();

  /**
   * Check whether all required fields are filled
   * @returns true if all required fields are filled.
   * Returns false otherwise
   */
  const [formState, setFormState] = useState("");
  const validate = () => {
    let blankError = "";
    let intError = "";
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

  /**
   * Pick avatar using expo-image-picker
   */
  const pickImage = async () => {
    // Permission
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); //ask user for permission into gallery
    if (permissionResult.granted === false) { //if user denies permission
      alert("Permission to access camera roll is required!");
      return;
    }
    

    // Pick image from device library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if(!result.cancelled){
      // store current uri
      setCurrentUri(result.uri);
      setIsuploaded(true);
    }
  }
  
  /**
   * Upload image data to firebase cloudstore
   */
  const uploadImage = async () => {
    const refPath = `images/${userInfo.uid}/avatar.jpg`;
    const reference = ref(storage, refPath);
    // store image downloaded URL into redux 
    const imageDownloadedUrl = await retrieveImage(`images/${userInfo.uid}/avatar.jpg`);
    if(imageDownloadedUrl){
      dispatch(dataActions.updateProfilepic(imageDownloadedUrl));
    }
    // convert image to array of bytes
    const img = await fetch(currentUri);
    const bytes = await img.blob();
    // upload to firebase cloud storage
    await uploadBytes(reference, bytes);
  }

  /**
   * @params path the uri to image in Firebase Cloud Storage
   * Function to retrieve image from firebase cloud storage
   */
   const retrieveImage = async (path) => {
    if(path){
      const reference = ref(storage, path);
      const url = await getDownloadURL(reference);
      return url;
    }
  }
  


  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === "ios" ? "padding": "height"}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headTitle}>Profile (1/4)</Text>
      </View>
      {/* Text input fields */}
      <Text style={styles.headerText}>Let's get started!</Text>
      <TextInput
        style={styles.textInput}
        placeholder="First Name*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateFirstname(value))}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Last Name*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateLastname(value))}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Gender*"
          placeholderTextColor="#949494"
          onChangeText={(value) => dispatch(dataActions.updateGender(value))}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Age*"
          placeholderTextColor="#949494"
          onChangeText={(value) => dispatch(dataActions.updateAge(value))}
        />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Pronouns*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updatePronouns(value))}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Major*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateMajor(value))}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Graduation Year*"
        placeholderTextColor="#949494"
        onChangeText={(value) => dispatch(dataActions.updateGraduationyear(value))}
      />
      {/* Bio only for demo */}
      <TextInput style={styles.textInput } placeholder='Bio' onChangeText={value => dispatch(dataActions.updateBio(value))}/>
      <Text style={styles.photoWords}>Show potential roommates what you look like!</Text>
      {/* photo upload button */}
      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
        {!isUploaded && 
          <Image
            style={styles.photo}
            source={require("../../assets/default.jpg")}
          />
        }
        {isUploaded && 
          <Image
            style={styles.photo}
            source={{uri: currentUri}}
          />
        }
        <Text style={{ fontSize: 40, color: "#6736B6", left: 205, fontWeight: 'bold',}}>+</Text>
      </TouchableOpacity>

      {/* next page button */}
      <View>
        <Text style ={styles.invalidText}>
          {formState}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          //store();
          if (!validate()) {
            console.log("YOU SHALL NOT PASS");
          }
          else {
            if(currentUri){
              uploadImage();
            }
            navigation.navigate("Roles");
          }
          
        }}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'flex-start'
  },
  photo: {
    height: 90, 
    width: 95, 
    left: 140, 
    top: 40, 
    borderRadius: 40
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
