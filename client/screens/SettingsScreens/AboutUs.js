import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import MainHeader from '../../components/MainHeader'

const AboutUs = ({navigation}) => {
  return (
    <SafeAreaView style={About_styles.container}>
      <MainHeader screen="About Us!" navigation={navigation} />
      <ScrollView>
        <Text style={About_styles.text}>Hi! We're Team Vulcan and
          we develop cool apps to make people's lives easier.
          In response to UCSD’s housing crisis and the lack of intuitive housing resources,
          we decided to develop a platform inspired by dating apps, exclusively for university students.
          Bird Nest is a mobile platform which, 
          based on questionnaire answers and preferences, 
          connects users looking for housing and/or roommates.
          Through user-chosen variables, Bird Nest provides a fresh and 
          straightforward experience for connecting with likeminded 
          individuals based on their personality and lifestyle compatibility.
          We've done our best to make housing and roommate finding easier on students;
          we hope you enjoy using Bird Nest! 
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const About_styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "white",
      alignItems: "center"
    },
    text: {
      fontSize: 23,
      marginHorizontal: 10,
      marginTop: 10,
    },
});

export default AboutUs