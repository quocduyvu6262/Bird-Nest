import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

import ProfileCards from "../components/ProfileCards.js";

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style = {Profile_styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>
<<<<<<< Updated upstream
=======
      <View style = {Profile_styles.footer}>
        <Footer navigation={navigation}/>
      </View>
>>>>>>> Stashed changes
    </SafeAreaView>
  );
};

const Profile_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom:0,
    width: "100%",
},
});
export default Profile;
