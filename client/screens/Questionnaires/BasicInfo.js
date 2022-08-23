import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";

import React, { Component, useState } from "react";
import { Icon } from "@rneui/themed";
import AppLoading from "expo";
//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Slider } from "@rneui/themed";
import Axios from "axios";

// IMPORT REDUX
import { useDispatch, useSelector, connect } from "react-redux";
import * as dataActions from "../../redux/slices/data";

class BasicInfo extends Component {
  //userInfo = useSelector((state) => state.data.userInfo); //added in
  //userInfo.garage = this.state17.name //check if color is blue, if it is set it (for loop, concatenate index)
  userInfo = this.props.userInfo;

  fieldState = { blankError: "" };
  validate = (userInfo) => {
    /*
    if ((this.state54.backgroundColor === "#3B9CF1" || this.state55.backgroundColor === "#3B9CF1") //bother
        && (this.state59.backgroundColor === "#3B9CF1" || this.state60.backgroundColor === "#3B9CF1") //interact
        && (this.state51.backgroundColor === "#3B9CF1" || this.state52.backgroundColor === "#3B9CF1") //appliances
        && (this.state9.backgroundColor === "#3B9CF1" || this.state10.backgroundColor === "#3B9CF1")//silent
        && (this.state15.backgroundColor === "#3B9CF1" || this.state16.backgroundColor === "#3B9CF1" //pets
          || this.state17.backgroundColor === "#3B9CF1" || this.state18.backgroundColor === "#3B9CF1" //pets
          || this.state19.backgroundColor === "#3B9CF1" || this.state20.backgroundColor === "#3B9CF1" //pets
          || this.state21.backgroundColor === "#3B9CF1" || this.state22.backgroundColor === "#3B9CF1") //pets
        && (this.state1.backgroundColor === "#3B9CF1" || this.state2.backgroundColor === "#3B9CF1")//420
        && (this.state3.backgroundColor === "#3B9CF1" || this.state4.backgroundColor === "#3B9CF1" || this.state41.backgroundColor === "#3B9CF1")//sleep habits
        && (this.state5.backgroundColor === "#3B9CF1" || this.state6.backgroundColor === "#3B9CF1") //guests over
        ) {
      return true;
    }
    else {
      return false;
    }
    */
   if ((this.props.userInfo.pets.length > 0) && (this.props.userInfo.alcohol !== "") && (this.props.userInfo.sleep !== "")
    && (this.props.userInfo.guests !== "") && (this.props.userInfo.silent !== "") && (this.props.userInfo.shareAppliances !== "")
    && (this.props.userInfo.roommateInteraction !== "") && (this.props.userInfo.tellRoommateIfBothered !== "")) {
      return true;
   }
   else {
    return false;
   }
  }  

  setField = () => {
    this.fieldState = { blankError: "Please fill in all required fields*" };
    this.setState({ blankError: "Please fill in all required fields*" });
  };

  clearField = () => {
    this.fieldState = { blankError: "" };
    this.setState({ blankError: "" });
  };

  slider_state = {
    language: "English",
    value: 500,
  };
  state1 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state2 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state3 = {
    name: "Morning",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state4 = {
    name: "Night Owl",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state5 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state6 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state7 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state8 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state9 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state10 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state11 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state12 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state13 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state14 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state15 = {
    name: "Dog",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state16 = {
    name: "Cat",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state17 = {
    name: "Fish",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state18 = {
    name: "Snake",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state19 = {
    name: "Turtle",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state20 = {
    name: "Hamster",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state21 = {
    name: "Guinea Pig",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state22 = {
    name: "Other",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state23 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state24 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state25 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state26 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state27 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state28 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state29 = {
    name: "Often",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state30 = {
    name: "Sometimes",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state31 = {
    name: "Rarely",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state32 = {
    name: "Never",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state41 = {
    name: "Indifferent",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state42 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state43 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state44 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state45 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state46 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state47 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state48 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state49 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state50 = {
    name: "Sometimes",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state51 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state52 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state53 = {
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state54 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state55 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state56 = {
    name: true,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state57 = {
    name: false,
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state58 = {
    name: "Don't have car",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state59 = {
    name: "Keep to myself",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  state60 = {
    name: "Interact",
    pressed: false,
    backgroundColor: "#D9D9D9",
  };
  changeColor(state_a, state_b) {
    if (
      state_a.pressed == false &&
      state_b.pressed == true &&
      state_b.backgroundColor == "#3B9CF1"
    ) {
      state_b.backgroundColor = "#D9D9D9";
      state_a.backgroundColor = "#3B9CF1";
      state_b.pressed = false;
      state_a.pressed = true;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ backgroundColor: state_b.backgroundColor });
      this.setState({ pressed: state_a.pressed });
      this.setState({ pressed: state_b.pressed });
    } else if (!state_a.pressed) {
      state_a.backgroundColor = "#3B9CF1";
      state_a.pressed = true;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ pressed: state_a.pressed });
    } else {
      state_a.backgroundColor = "#D9D9D9";
      state_a.pressed = false;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ pressed: state_a.pressed });
    }
  }
  changeMultipleColor(state_a, state_b, state_c, state_d) {
    if (
      state_a.pressed == false &&
      (state_b.pressed == true ||
        state_c.pressed == true ||
        state_d.pressed == true) &&
      (state_b.backgroundColor == "#3B9CF1" ||
        state_c.backgroundColor == "#3B9CF1" ||
        state_d.backgroundColor == "#3B9CF1")
    ) {
      state_a.backgroundColor = "#3B9CF1";
      state_b.backgroundColor = "#D9D9D9";
      state_c.backgroundColor = "#D9D9D9";
      state_d.backgroundColor = "#D9D9D9";
      state_a.pressed = true;
      state_b.pressed = false;
      state_c.pressed = false;
      state_d.pressed = false;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ backgroundColor: state_b.backgroundColor });
      this.setState({ backgroundColor: state_c.backgroundColor });
      this.setState({ backgroundColor: state_d.backgroundColor });
      this.setState({ pressed: state_a.pressed });
      this.setState({ pressed: state_b.pressed });
      this.setState({ pressed: state_c.pressed });
      this.setState({ pressed: state_d.pressed });
    } else if (!state_a.pressed) {
      state_a.backgroundColor = "#3B9CF1";
      state_a.pressed = true;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ pressed: state_a.pressed });
    } else {
      state_a.backgroundColor = "#D9D9D9";
      state_a.pressed = false;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ pressed: state_a.pressed });
    }
  }
  changeThreeColor(state_a, state_b, state_c) {
    if (
      state_a.pressed == false &&
      (state_b.pressed == true || state_c.pressed == true) &&
      (state_b.backgroundColor == "#3B9CF1" ||
        state_c.backgroundColor == "#3B9CF1")
    ) {
      state_a.backgroundColor = "#3B9CF1";
      state_b.backgroundColor = "#D9D9D9";
      state_c.backgroundColor = "#D9D9D9";
      state_a.pressed = true;
      state_b.pressed = false;
      state_c.pressed = false;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ backgroundColor: state_b.backgroundColor });
      this.setState({ backgroundColor: state_c.backgroundColor });
      this.setState({ pressed: state_a.pressed });
      this.setState({ pressed: state_b.pressed });
      this.setState({ pressed: state_c.pressed });
    } else if (!state_a.pressed) {
      state_a.backgroundColor = "#3B9CF1";
      state_a.pressed = true;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ pressed: state_a.pressed });
    } else {
      state_a.backgroundColor = "#D9D9D9";
      state_a.pressed = false;
      this.setState({ backgroundColor: state_a.backgroundColor });
      this.setState({ pressed: state_a.pressed });
    }
  }
  selectMany(state) {
    if (!state.pressed) {
      state.backgroundColor = "#3B9CF1";
      state.pressed = true;
      this.setState({ backgroundColor: state.backgroundColor });
      this.setState({ pressed: state.pressed });
      this.props.dispatch(
        dataActions.updatePets({
          pet: state.name,
          add: true,
        })
      );
    } else {
      state.backgroundColor = "#D9D9D9";
      state.pressed = false;
      this.setState({ backgroundColor: state.backgroundColor });
      this.setState({ pressed: state.pressed });
      this.props.dispatch(
        dataActions.updatePets({
          pet: state.name,
          add: false,
        })
      );
    }
  }
  handleSliderChange = (value1) => {
    this.slider_state.value = value1;
    this.setState({ value: this.slider_state.value });
  };
  render() {
    return (
      <SafeAreaView style={HousingQ_styles.container}>
        <View style={HousingHeader_styles.header}>
          <Text style={HousingHeader_styles.headerText}>Habits (3/5)</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{ alignSelf: "flex-start" }}
          >
            <Text style={HousingHeader_styles.returnToProfileArrow}>
              {"< "}
            </Text>
            <Text style={HousingHeader_styles.returnToProfile}>Roles</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={[HousingQ_styles.question1, { marginTop: 120 }]}>
            Select the type of pet(s) that
          </Text>
          <Text style={HousingQ_styles.question1}>
            you own: <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state15, HousingQ_styles.buttonContainerYes4]}
            onPress={() => this.selectMany(this.state15)}
          >
            <Text style={HousingQ_styles.buttonText}>Dog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state16, HousingQ_styles.buttonContainerNo4]}
            onPress={() => this.selectMany(this.state16)}
          >
            <Text style={HousingQ_styles.buttonText}>Cat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state17, HousingQ_styles.buttonContainerYes5]}
            onPress={() => this.selectMany(this.state17)}
          >
            <Text style={HousingQ_styles.buttonText}>Fish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state18, HousingQ_styles.buttonContainerNo5]}
            onPress={() => this.selectMany(this.state18)}
          >
            <Text style={HousingQ_styles.buttonText}>Snake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state19, HousingQ_styles.buttonContainerYes5]}
            onPress={() => this.selectMany(this.state19)}
          >
            <Text style={HousingQ_styles.buttonText}>Turtle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state20, HousingQ_styles.buttonContainerNo5]}
            onPress={() => this.selectMany(this.state20)}
          >
            <Text style={HousingQ_styles.buttonText}>Hamster</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state21, HousingQ_styles.buttonContainerYes5]}
            onPress={() => this.selectMany(this.state21)}
          >
            <Text style={HousingQ_styles.buttonText}>Guinea Pig</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state22, HousingQ_styles.buttonContainerNo5]}
            onPress={() => this.selectMany(this.state22)}
          >
            <Text style={HousingQ_styles.buttonText}>Other</Text>
          </TouchableOpacity>

          <Text style={[HousingQ_styles.question1, { marginTop: 10 }]}>
            How often do you cook?
          </Text>
          <TouchableOpacity
            style={[this.state29, HousingQ_styles.buttonContainerYes7]}
            onPress={() => {
              this.changeMultipleColor(
                this.state29,
                this.state30,
                this.state31,
                this.state32
              );
              this.props.dispatch(dataActions.updateCook(this.state29.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Often</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state30, HousingQ_styles.buttonContainerNo7]}
            onPress={() => {
              this.changeMultipleColor(
                this.state30,
                this.state29,
                this.state31,
                this.state32
              );
              this.props.dispatch(dataActions.updateCook(this.state30.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Sometimes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state31, HousingQ_styles.buttonContainerYes8]}
            onPress={() => {
              this.changeMultipleColor(
                this.state31,
                this.state30,
                this.state29,
                this.state32
              );
              this.props.dispatch(dataActions.updateCook(this.state31.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Rarely</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state32, HousingQ_styles.buttonContainerNo8]}
            onPress={() => {
              this.changeMultipleColor(
                this.state32,
                this.state30,
                this.state29,
                this.state31
              );
              this.props.dispatch(dataActions.updateCook(this.state32.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Never</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question1}>
            Are you alcohol/420 friendly?{" "}
            <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state1, HousingQ_styles.buttonContainerYes1]}
            onPress={() => {
              this.changeColor(this.state1, this.state2);
              this.props.dispatch(dataActions.updateAlcohol(this.state1.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state2, HousingQ_styles.buttonContainerNo1]}
            onPress={() => {
              this.changeColor(this.state2, this.state1);
              this.props.dispatch(dataActions.updateAlcohol(this.state2.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question2}>
            What are your sleep habits?{" "}
            <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state3, HousingQ_styles.buttonContainerYes2]}
            onPress={() => {
              this.changeThreeColor(this.state3, this.state4, this.state41);
              this.props.dispatch(dataActions.updateSleep(this.state3.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Morning Person</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state4, HousingQ_styles.buttonContainerNo2]}
            onPress={() => {
              this.changeThreeColor(this.state4, this.state3, this.state41);
              this.props.dispatch(dataActions.updateSleep(this.state4.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Night Owl</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state41,
              HousingQ_styles.buttonContainerYes2,
              { marginTop: 43 },
              { marginBottom: -30 },
            ]}
            onPress={() => {
              this.changeThreeColor(this.state41, this.state4, this.state3);
              this.props.dispatch(dataActions.updateSleep(this.state41.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Indifferent</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Are you okay with your</Text>
          <Text style={HousingQ_styles.question3}>
            roommates having guests over?{" "}
            <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state5, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeColor(this.state5, this.state6);
              this.props.dispatch(dataActions.updateGuess(this.state5.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state6, HousingQ_styles.buttonContainerNo3]}
            onPress={() => {
              this.changeColor(this.state6, this.state5);
              this.props.dispatch(dataActions.updateGuess(this.state6.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>
            Do you spend most of your time
          </Text>
          <Text style={HousingQ_styles.question3}>outside of your room?</Text>
          <TouchableOpacity
            style={[this.state7, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeThreeColor(this.state7, this.state8, this.state50);
              this.props.dispatch(dataActions.updateOutside(this.state7.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state8, HousingQ_styles.buttonContainerNo3]}
            onPress={() => {
              this.changeThreeColor(this.state8, this.state7, this.state50);
              this.props.dispatch(dataActions.updateOutside(this.state8.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state50,
              HousingQ_styles.buttonContainerYes3,
              { marginTop: 43 },
              { marginBottom: -30 },
            ]}
            onPress={() => {
              this.changeThreeColor(this.state50, this.state7, this.state8);
              this.props.dispatch(dataActions.updateOutside(this.state50.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Sometimes</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>
            When you study, do you need
          </Text>
          <Text style={HousingQ_styles.question3}>
            the room to be silent?{" "}
            <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state9, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeColor(this.state9, this.state10);
              this.props.dispatch(dataActions.updateSilent(this.state9.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state10, HousingQ_styles.buttonContainerNo3]}
            onPress={() => {
              this.changeColor(this.state10, this.state9);
              this.props.dispatch(dataActions.updateSilent(this.state10.name));
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Are you okay with your</Text>
          <Text style={HousingQ_styles.question3}>
            roommate staying up to work
          </Text>
          <Text style={HousingQ_styles.question3}>while you sleep?</Text>
          <TouchableOpacity
            style={[this.state11, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeColor(this.state11, this.state12);
              this.props.dispatch(
                dataActions.updateRoommateWork(this.state11.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state12, HousingQ_styles.buttonContainerNo3]}
            onPress={() => {
              this.changeColor(this.state12, this.state11);
              this.props.dispatch(
                dataActions.updateRoommateWork(this.state12.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Are you open to sharing</Text>
          <Text style={HousingQ_styles.question3}>
            appliances? <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state51, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeColor(this.state51, this.state52);
              this.props.dispatch(
                dataActions.updateShareAppliances(this.state51.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state52, HousingQ_styles.buttonContainerNo3]}
            onPress={() => {
              this.changeColor(this.state52, this.state51);
              this.props.dispatch(
                dataActions.updateShareAppliances(this.state52.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>
            If you have a car, are you
          </Text>
          <Text style={HousingQ_styles.question3}>
            comfortable with driving
          </Text>
          <Text style={HousingQ_styles.question3}>your roommates?</Text>
          <TouchableOpacity
            style={[this.state56, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeThreeColor(this.state56, this.state57, this.state58);
              this.props.dispatch(
                dataActions.updateCarWithRoommate(this.state56.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[this.state57, HousingQ_styles.buttonContainerNo3]}
            onPress={() => {
              this.changeThreeColor(this.state57, this.state56, this.state58);
              this.props.dispatch(
                dataActions.updateCarWithRoommate(this.state57.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state58,
              HousingQ_styles.buttonContainerYes3,
              { marginTop: 43 },
              { marginBottom: -30 },
            ]}
            onPress={() => {
              this.changeThreeColor(this.state58, this.state57, this.state56);
              this.props.dispatch(
                dataActions.updateCarWithRoommate(this.state58.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Don't have car</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Do you tend to keep</Text>
          <Text style={HousingQ_styles.question3}>to yourself or interact</Text>
          <Text style={HousingQ_styles.question3}>
            with your roommates?{" "}
            <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state59, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeColor(this.state59, this.state60);
              this.props.dispatch(
                dataActions.updateRoommateInteraction(this.state59.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Keep to myself</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state60,
              HousingQ_styles.buttonContainerNo3,
              { bottom: 1 },
            ]}
            onPress={() => {
              this.changeColor(this.state60, this.state59);
              this.props.dispatch(
                dataActions.updateRoommateInteraction(this.state60.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Interact</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>
            If something is bothering you,
          </Text>
          <Text style={HousingQ_styles.question3}>
            will you tell your roommate
          </Text>
          <Text style={HousingQ_styles.question3}>
            right away? <Text style={HousingQ_styles.highlight}>*</Text>
          </Text>
          <TouchableOpacity
            style={[this.state54, HousingQ_styles.buttonContainerYes3]}
            onPress={() => {
              this.changeColor(this.state54, this.state55);
              this.props.dispatch(
                dataActions.updateTellRoommateIfBothered(this.state54.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state55,
              HousingQ_styles.buttonContainerNo3,
              { marginBottom: 110 },
            ]}
            onPress={() => {
              this.changeColor(this.state55, this.state54);
              this.props.dispatch(
                dataActions.updateTellRoommateIfBothered(this.state55.name)
              );
            }}
          >
            <Text style={HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>
          <View>
            <Text style={HousingQ_styles.invalidText}>
              {this.fieldState.blankError}
            </Text>
          </View>
          <TouchableOpacity
            style={HousingQ_styles.nextButton}
            onPress={() => {
              //this.createHousingInfo()
              if (!this.validate(this.props.userInfo)) {
                console.log("YOU SHALL NOT PASS");
              } else {
                this.clearField();
                console.log("YOU SHALL PASS");
                if (
                  this.userInfo.role === "Flamingo" ||
                  this.userInfo.role === "Owl"
                ) {
                  this.props.navigation.navigate("HasHousingQ"); //
                } else if (
                  this.userInfo.role === "Penguin" ||
                  this.userInfo.role === "Duck" ||
                  this.userInfo.role === "Parrot"
                ) {
                  this.props.navigation.navigate("NoHousingQ");
                }
              }
            }}
          >
            <Text style={[HousingQ_styles.buttonText, { color: "#FFF" }]}>
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const HousingHeader_styles = StyleSheet.create({
  header: {
    backgroundColor: "#6736B6",
    height: 90,
    bottom: 50,
    marginBottom: -45,
  },
  headerText: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 20,
    top: 53,
    textAlign: "center",
  },
  returnToProfile: {
    color: "#FFF",
    fontSize: 17,
    bottom: 4,
    left: 27,
  },
  returnToProfileArrow: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 30,
    top: 22,
    left: 5,
  },
});

const HousingQ_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  slider: {
    bottom: 90,
    marginTop: 40,
    marginBottom: 30,
    width: 260,
    left: 50,
  },
  highlight: {
    color: "red",
  },
  question1: {
    fontWeight: "400",
    color: "#3d3e40",
    fontSize: 19,
    bottom: 95,
    left: 49,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  rentText: {
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    bottom: 185,
  },
  buttonContainerYes1: {
    right: 50,
    marginTop: -80,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
  },
  buttonContainerNo1: {
    left: 100,
    top: 43,
    marginTop: -80,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
  },
  question2: {
    fontWeight: "400",
    color: "#3d3e40",
    fontSize: 19,
    top: 90,
    left: 49,
  },
  buttonContainerYes2: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 108,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
  },
  buttonContainerNo2: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -70,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
  },
  question3: {
    fontWeight: "400",
    color: "#3d3e40",
    fontSize: 19,
    top: 80,
    left: 49,
  },
  buttonContainerYes3: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
  },
  buttonContainerNo3: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -70,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
  },
  buttonContainerYes4: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    bottom: 180,
  },
  buttonContainerNo4: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    top: -127,
  },
  buttonContainerYes5: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 65,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    bottom: 180,
  },
  buttonContainerNo5: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    top: -127,
  },
  buttonContainerYes6: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 65,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    bottom: 180,
  },
  buttonContainerNo6: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    marginBottom: 13,
    borderRadius: 23,
    top: -127,
  },
  buttonContainerYes7: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    bottom: 180,
  },
  buttonContainerNo7: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    marginBottom: 13,
    borderRadius: 23,
    top: -127,
  },
  buttonContainerYes8: {
    fontWeight: "bold",
    textAlign: "center",
    right: 50,
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    borderRadius: 23,
    bottom: 180,
  },
  buttonContainerNo8: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    marginBottom: 13,
    borderRadius: 23,
    top: -127,
  },
  rentButton: {
    fontWeight: "bold",
    textAlign: "center",
    left: 100,
    top: 33,
    marginTop: -90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    marginBottom: 13,
    borderRadius: 23,
    top: -127,
  },
  invalidText: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
    alignItems: "center",
    bottom: 40,
  },
  nextButton: {
    fontWeight: "bold",
    textAlign: "center",
    left: 24,
    top: 33,
    marginTop: -70,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 110,
    marginRight: 160,
    marginBottom: 90,
    borderRadius: 23,
    top: 40,
    backgroundColor: "#6736B6",
  },
});

// DISPATCH
// MAP DISPATCH
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (func) => dispatch(func),
  };
};

const mapStateToProps = (state) => ({
  userInfo: state.data.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
