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
import React from "react";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Icon } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';

// import buttons

const MainHeader = ({ screen, navigation }) => {

  /**
   * Pick multiple images
   */
  const pickImages = async () => {
    // Permission required
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); //ask user for permission into gallery
    if (permissionResult.granted === false) { //if user denies permission
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({ //wait for user to choose image
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });
    if(!result.cancelled){
      console.log(result.uri)
    }
  }

  /**
   * Rendering Logic
   */
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        {/* if screen is not any of these names, show the back button */}
        {!(
          screen === "Profile" ||
          screen === "Bird Feed" ||
          screen === "Messenger Pigeon" ||
          screen === "Peck View"
        ) && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="west" size={30} />
          </TouchableOpacity>
        )}
        <View style={styles.contentContainer}>
          {/*  Main Title - conditional render applied */}
          <Text
            style={
              screen === "Bird Feed" ||
              screen === "Profile" ||
              screen == "Peck View"
                ? styles.headerText
                : styles.headerTextNoIcons
            }
          >
            {screen}
          </Text>

          {/* if screen === Bird Feed */}
          {screen === "Bird Feed" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("PeckView")}
              >
                <Icon name="contacts" size={27} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="history" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("ChirpNotification")}
              >
                <Image source={require(`../assets/bird.png`)} />
              </TouchableOpacity>
            </View>
          )}

          {screen === "Peck View" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("BirdFeed")}
              >
                <Icon name="list" size={30}></Icon>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="history" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("ChirpNotification")}
              >
                <Image source={require(`../assets/bird.png`)} />
              </TouchableOpacity>
            </View>
          )}

          {/* if screen === Profile */}
          {screen === "Profile" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity
                onPress={pickImages}
                style={styles.headerButtons}
              >
                <Icon name="photo" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("IDQs")}
                style={styles.headerButtons}
              >
                <Icon name="edit" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("Settings")}
              >
                <Icon name="settings" size={30} />
              </TouchableOpacity>
            </View>
          )}

          {/* if screen === Messenger Pigeon */}
          {screen === "Messenger Pigeon" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity style={styles.headerButtons}>
                <Icon name="notifications" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
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

const styles = StyleSheet.create({
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
