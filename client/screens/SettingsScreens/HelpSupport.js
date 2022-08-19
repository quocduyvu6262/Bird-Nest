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
        <ScrollView>
          <Text style={[HelpSupport_Styles.textStyle, {fontWeight: "bold"}]}>Frequently Asked Questions</Text>
          <MyAccordion/>
        </ScrollView>
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