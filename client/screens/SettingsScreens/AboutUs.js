import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import MainHeader from '../../components/MainHeader'

const AboutUs = ({navigation}) => {
  return (
    <SafeAreaView style={About_styles.container}>
        <MainHeader screen="About Us!" navigation={navigation} />
      <Text style={About_styles.text}>Bird Nest is a mobile app which, 
      based on questionnaire answers and preferences, 
      connects users looking for housing and/or roommates. 
      As a response to UCSD’s housing crisis and the lack of straightforward and comprehensive social platforms,
       we decided to develop a platform inspired by dating apps and exclusively for university students. 
       Bird Nest provides personable and straightforward ways to meet and connect with likeminded people as well as 
       features that allow students to easily filter variables and compare personality and lifestyle compatibility.</Text>
    </SafeAreaView>
  );
};

const About_styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "white",
      alignItems: "center",
    },
    text: {
      fontSize: 25,
      marginHorizontal: 10,
      marginTop: 10,
    },
});

export default AboutUs