import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import { Icon } from "@rneui/themed";
import AppLoading from "expo-app-loading";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

// update array with objects from backend
const UserData = [
  {
    name: "Adam",
    src: imagesIndex[0],
  },
  {
    name: "Brian",
    src: imagesIndex[0],
  },
];

const BirdFeed = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // Header - Beginning
      <SafeAreaView style={Bird_Feed_styles.container}>
        <View style={Bird_Feed_styles.header}>
          <Text style={Bird_Feed_styles.headerText}>Bird Feed</Text>

          <View style={Bird_Feed_styles.headerButtonView}>
            <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
              <Icon name="list" />
            </TouchableOpacity>

            <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
              <Icon name="history" />
            </TouchableOpacity>

            <TouchableOpacity style={Bird_Feed_styles.headerButtons}>
              <Image source={require(`../assets/bird.png`)} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Header - Ending */}
        <TextInput
          style={Bird_Feed_styles.textInput}
          placeholder="Enter Filters"
        />

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text>Go to Profile</Text>
        </TouchableOpacity>

        <View styles={Bird_Feed_styles.flatlist}>
          <FlatList data={UserData} renderItem={ProfileCard} />
        </View>

        <View style={Bird_Feed_styles.footer}>
          <Footer navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }
};

const Bird_Feed_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: "gray",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 7,
    color: "#219EBC",
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
    zIndex: 10,
  },

  headerButtonView: {
    // backgroundColor: "red",
    flexDirection: "row",
    marginRight: 0,
  },
  headerButtons: {
    marginRight: 15,
    alignSelf: "center",
    padding: 10,
    borderWidth: 3,
    borderRadius: "50%",
    borderColor: "#219EBC",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
export default BirdFeed;
