import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, Component } from "react";
import InfoCard from "../../components/InfoCard";
import MainHeader from "../../components/MainHeader";
import MyAccordion from "../../components/Accordion";

const HelpSupport = ({ navigation }) => {
  // const [contactus, setContactus] = useState(false);

  // const contactUsButton = () => {
  //   contactus ? setContactus(false) : setContactus(true);
  // };
  return (
    <SafeAreaView style={HelpSupport_Styles.container}>
      <MainHeader screen="Help & Support" navigation={navigation} />
        <Text style={[HelpSupport_Styles.textStyle, {fontWeight: "bold"}]}>Frequently Asked Questions</Text>
        {/* <MyAccordion/> */}
        <Text style={HelpSupport_Styles.textStyle}>
          1. How do I upload images to my profile?
        </Text>
        <Text style={HelpSupport_Styles.textStyle}>Answer: Click on the photos icon in the top right of the profile page. Allow Bird Nest to access your photo library if you haven't already. Then select up to 9 images to add to your profile.</Text>
        <Text style={HelpSupport_Styles.textStyle}>
          2. Can I find roommates even if I don't have housing?
        </Text>
        <Text style={HelpSupport_Styles.textStyle}>Answer: Of course! Whether you have a home or are a bird without a nest, we can help.</Text>
        <Text style={HelpSupport_Styles.textStyle}>
          3. How do fix this axios error?
        </Text>
        <Text style={HelpSupport_Styles.textStyle}>Answer: Ask Tony.</Text>
{/* 
      <TouchableOpacity
        style={HelpSupport_Styles.regularButton}
        onPress={contactUsButton}
      >
        <Text style={HelpSupport_Styles.buttonText}>Contact Us!</Text>
      </TouchableOpacity>

      {contactus && (
        <View style={HelpSupport_Styles.overLay}>
          <ContactNumber></ContactNumber>
        </View>
      )} */}
    </SafeAreaView>
  );
};
const HelpSupport_Styles = StyleSheet.create({
  card: {
    marginTop: 30,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 30,
    width: 350,
    height: 450,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  regularButton: {
    width: 200,
    height: 50,
    marginTop: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#560CCE",
  },
  textStyle: {
    padding: 10,
    fontSize: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  overLay: {
    marginTop: 40,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 30,
  },
});

export default HelpSupport;