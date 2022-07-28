import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Axios from "axios";

const PersonalityQuestionnaire = () => {
  // states for answers
  const [Q1, setQ1] = useState("");

  // component for radio buttons: parameter is an array of strings of possible answers
  const RadioButtons = ({ paramArray, questionNumber }) => {
    const [whichRadioTapped, setWhichRadioTapped] = useState("");

    (() => {
      {
        `setQ${questionNumber}(${whichRadioTapped})`;
      }
      console.log("test2");
    })();
    console.log(Q1);

    // console.log(`setQ${questionNumber}(${whichRadioTapped})`);
    // console.log(`${questionNumber}`);

    // use conditional with numbering of questions
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {paramArray.map((item, i) => {
          return (
            // this view contains both button and the text
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              // state management for which radio button is selected
              onPress={function () {
                setWhichRadioTapped(item);
              }}
            >
              {/* outer circle */}
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  justifyContent: "center",
                  borderWidth: 2,
                }}
              >
                {/* inner circle */}
                {whichRadioTapped === item && (
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      backgroundColor: "red",
                      alignSelf: "center",
                    }}
                  />
                )}
              </View>
              <Text style={{ fontSize: 20, marginLeft: 5 }}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={Personality_Questionnaire_styles.mainContainer}>
      <Text>PersonalityQuestionnaire</Text>
      <ScrollView>
        <Text>Which applies to you best?</Text>
        <RadioButtons
          paramArray={["Extrovert", "Ambivert", "Introvert"]}
          questionNumber="1"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Personality_Questionnaire_styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  radioButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default PersonalityQuestionnaire;
