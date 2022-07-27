import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import Axios from "axios";

const PersonalityQuestionnaire = () => {
  return (
    <SafeAreaView style={Personality_Questionnaire_styles.mainContainer}>
      {/* random comment */}
      <Text>PersonalityQuestionnaire</Text>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

const Personality_Questionnaire_styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default PersonalityQuestionnaire;
