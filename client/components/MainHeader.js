// USAGE if no extra header buttons: <MainHeader screen="Screen name with spaces in between" navigation={navigation} />
// if there are extra buttons, talk to Deondre

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Icon } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import * as dataActions from '../redux/slices/data';
import Axios from "axios"; 
// import buttons
var pickerResult;
let multiplePics = [];
const MainHeader = ({ screen, navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.data.userInfo);
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [picture, setPicture] = useState(require("../assets/default.jpg"));
  useEffect(() => {}, [picture])

  let openCamera = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); //ask user for permission into gallery
    ImagePicker
    if (permissionResult.granted === false) { //if user denies permission
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({ //wait for user to choose image
     allowsMultipleSelection: true,
     selectionLimit: 10,
     base64: true
    });
    if (pickerResult.cancelled === true) { //if user exits out of gallery
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri }); //stores uri of image in localUri
    if(pickerResult.uri != null) { //if an image was selected by user
      setPicture({uri: pickerResult.uri});
      //need to call API to store each uri in database for each user
   }
   for (let i = 0; i < pickerResult.selected.length; i++) {
      let base64img = "data:image/jpeg;base64," + pickerResult.selected[i].base64;
      multiplePics.push(base64img);
      dispatch(dataActions.updatePicsList(base64img));
   }
   Axios.post(`http:192.168.50.183:3000/api/pictures/multiple`, {
    id: 11,
    pics: multiplePics
  })
    .then((response) => {
      console.log('multiple pics uploaded');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={Main_Header_styles.container}>
        {/* if screen is not any of these names, show the back button */}
        {!(
          screen === "Profile" ||
          screen === "Bird Feed" ||
          screen === "Messenger Pigeon" ||
          screen === "Peck View"
        ) && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={Main_Header_styles.backButton}
          >
            <Icon name="west" size={30} />
          </TouchableOpacity>
        )}
        <View style={Main_Header_styles.contentContainer}>
          {/*  Main Title - conditional render applied */}
          <Text
            style={
              screen === "Bird Feed" ||
              screen === "Profile" ||
              screen == "Peck View"
                ? Main_Header_styles.headerText
                : Main_Header_styles.headerTextNoIcons
            }
          >
            {screen}
          </Text>

          {/* if screen === Bird Feed */}
          {screen === "Bird Feed" && (
            <View style={Main_Header_styles.headerButtonView}>
              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("PeckView")}
              >
                <Icon name="contacts" size={27} />
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="history" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("ChirpNotification")}
              >
                <Image source={require(`../assets/bird.png`)} />
              </TouchableOpacity>
            </View>
          )}

          {screen === "Peck View" && (
            <View style={Main_Header_styles.headerButtonView}>
              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("BirdFeed")}
              >
                <Icon name="list" size={30}></Icon>
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="history" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("ChirpNotification")}
              >
                <Image source={require(`../assets/bird.png`)} />
              </TouchableOpacity>
            </View>
          )}

          {/* if screen === Profile */}
          {screen === "Profile" && (
            <View style={Main_Header_styles.headerButtonView}>

              <TouchableOpacity
                onPress={openCamera}
                style={Main_Header_styles.headerButtons}
              >
                <Icon name="photo" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("IDQs")}
                style={Main_Header_styles.headerButtons}
              >
                <Icon name="edit" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("Settings")}
              >
                <Icon name="settings" size={30} />
              </TouchableOpacity>
            </View>
          )}

          {/* if screen === Messenger Pigeon */}
          {screen === "Messenger Pigeon" && (
            <View style={Main_Header_styles.headerButtonView}>
              <TouchableOpacity style={Main_Header_styles.headerButtons}>
                <Icon name="notifications" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="add" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
};

const Main_Header_styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgray",
    // // shadowOffset: { height: 10 },
    // shadowRadius: 5,
    // elevation: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 25,
    color: "#560CCE",
    // color: "#560CCE",
    fontFamily: "Pacifico_400Regular",
  },
  headerTextNoIcons: {
    flex: 1,
    fontSize: 30,
    // color: "#560CCE",
    color: "#560CCE",
    textAlign: "center",
    fontFamily: "Pacifico_400Regular",
  },
  backButton: {
    position: "absolute",
    zIndex: 2,
    alignSelf: "center",
    marginLeft: 10,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  headerButtonView: {
    flexDirection: "row",
    marginLeft: 20,
  },
  headerButtons: {
    marginRight: 10,
    alignSelf: "center",
    padding: 5,
    // borderWidth: 3,
    // borderRadius: 50,
    // borderColor: "#219EBC",
  },
});
export default MainHeader;
