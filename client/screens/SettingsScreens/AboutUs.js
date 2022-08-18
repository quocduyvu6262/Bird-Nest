import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import MainHeader from '../../components/MainHeader'

const AboutUs = ({navigation}) => {
  return (
    <SafeAreaView style={About_styles.container}>
        <MainHeader screen="About Us!" navigation={navigation} />
      <Text style={About_styles.text}>We like Kruker.io</Text>
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
      fontSize: 30,
      marginHorizontal: 10,
      marginTop: 10,
    },
});

export default AboutUs