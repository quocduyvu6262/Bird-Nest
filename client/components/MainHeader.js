// USAGE if no extra header buttons: <MainHeader screen="Screen name with spaces in between" navigation={navigation} />
// if there are extra buttons, talk to Deondre

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

import { Icon } from "@rneui/themed";

// import buttons

const MainHeader = ({ screen, navigation }) => {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={Main_Header_styles.container}>
        {/* if screen is not any of these names, show the back button */}
        {!(
          screen === "Profile" ||
          screen === "Bird Feed" ||
          screen === "Messenger Pigeon"
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
              screen === "Bird Feed" || screen === "Profile"
                ? Main_Header_styles.headerText
                : Main_Header_styles.headerTextNoIcons
            }
          >
            {screen}
          </Text>

          {/* if screen === Bird Feed */}
          {screen === "Bird Feed" && (
            <View style={Main_Header_styles.headerButtonView}>
              <TouchableOpacity style={Main_Header_styles.headerButtons}>
                <Icon name="list" size={35} />
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
              <TouchableOpacity style={Main_Header_styles.headerButtons}>
                <Icon name="edit" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={Main_Header_styles.headerButtons}
                onPress={() => navigation.navigate("History")}
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
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 25,
    color: "#219EBC",
    // color: "#560CCE",
    fontFamily: "Pacifico_400Regular",
  },
  headerTextNoIcons: {
    flex: 1,
    fontSize: 30,
    // color: "#560CCE",
    color: "#219EBC",
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
