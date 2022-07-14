import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text> This is my HomeScreen </Text>
//       </View>
//     )
//   }
// }

const Footer = ({ navigation }) => {
  return (
    <View style={[Footer_styles.container, { backgroundColor: "#fffff" }]}>
      <TouchableOpacity
        style={Footer_styles.buttons}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image source={require(`../assets/account_circle.png`)} />
      </TouchableOpacity>

      <TouchableOpacity
        style={Footer_styles.buttons}
        onPress={() => navigation.navigate("BirdFeed")}
      >
        <Image source={require("../assets/home.png")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={Footer_styles.buttons}
        onPress={() => navigation.navigate("MessengerPigeon")}
      >
        <Image source={require("../assets/messenger.png")} />
      </TouchableOpacity>
    </View>
  );
};
const Footer_styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 23,
    paddingTop: 10,
  },
  buttons: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#219EBC",
  },
});
export default Footer;
