//TODO: Make text in roles white
//TODO: Make header choose your role match the first screens text
//Fix the red text
//Make owl smaller
//Change colors of buttons
//Find new icons (possibly only for flamingo)
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import Axios from "axios";
import { Icon } from "@rneui/themed";
import QuestHeader from "../../components/QuestHeader.js";

// IMPORT REDUX
import { useDispatch, useSelector } from "react-redux";
import * as dataActions from "../../redux/slices/data";

const Roles = ({ navigation }) => {
  const userInfo = useSelector((state) => state.data.userInfo); //added in
  const dispatch = useDispatch();
  const [formState, setFormState] = useState("");
  const validate = () => {
    let blankError = "";
    if (userInfo.role === "") {
      blankError = "Please select a role*";
      setFormState(blankError);
      return false;
    }

    setFormState("");
    return true;
  };
  return (
    <SafeAreaView
      style={Roles_styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={Roles_styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Roles_styles.backButton}
        >
          <Image
            source={require("../../assets/backArrow.png")}
            style={Roles_styles.backIcon}
          />
          <Text style={Roles_styles.backText}>Profile</Text>
        </TouchableOpacity>
        <Text style={Roles_styles.headTitle}>Roles (2/5)</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ top: 15 }}>
          <View>
            <Text style={Roles_styles.headerText}>Choose your role!</Text>
          </View>
          <TouchableOpacity
            style={Roles_styles.flamingoButton}
            onPress={() => {
              //selectRoles("Flamingo")
              dispatch(dataActions.updateRole("Flamingo"));
              dispatch(dataActions.updateIsHousing(true));
            }}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../../assets/icons8-flamingo-96.png")}
            />
            <View style={Roles_styles.viewFlex}>
              <Text style={Roles_styles.roleTitle}>Flamingo</Text>
              <Text style={Roles_styles.roleDescription}>
                I have housing that I will live in & need another roommate or
                roommates.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Roles_styles.owlButton}
            onPress={() => {
              //selectRoles("Owl")
              dispatch(dataActions.updateRole("Owl"));
              dispatch(dataActions.updateIsHousing(true));
            }}
          >
            <Image
              style={Roles_styles.owlIcon}
              source={require("../../assets/owl-icon.png")}
            />
            <View style={Roles_styles.viewFlex}>
              <Text style={Roles_styles.owlRoleTitle}>Owl</Text>
              <Text style={Roles_styles.owlRoleDescription}>
                I have housing, am not living there, and need people to live in
                the space. (sublease)
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Roles_styles.parrotButton}
            onPress={() => {
              //selectRoles("Parrot")
              dispatch(dataActions.updateRole("Parrot"));
              dispatch(dataActions.updateIsHousing(false));
            }}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../../assets/icons8-parrot-96.png")}
            />
            <View style={Roles_styles.viewFlexMore}>
              <Text style={Roles_styles.roleTitle}>Parrot</Text>
              <Text style={Roles_styles.roleDescription}>
                I do not have housing, and I am looking for housing that has
                people living there with whom I want to be roommates.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Roles_styles.penguinButton}
            onPress={() => {
              //selectRoles("Penguin")
              dispatch(dataActions.updateRole("Penguin"));
              dispatch(dataActions.updateIsHousing(false));
            }}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../../assets/icons8-linux-96.png")}
            />
            <View style={Roles_styles.viewFlex}>
              <Text style={Roles_styles.roleTitle}>Penguin</Text>
              <Text style={Roles_styles.roleDescription}>
                I do not have housing, and I am looking for roommates to look
                for housing with.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Roles_styles.duckButton}
            onPress={() => {
              //selectRoles("Duck")
              dispatch(dataActions.updateRole("Duck"));
              dispatch(dataActions.updateIsHousing(false));
            }}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../../assets/icons8-duck-96.png")}
            />
            <View style={Roles_styles.viewFlexMore}>
              <Text style={Roles_styles.roleTitle}>Duck</Text>
              <Text style={Roles_styles.roleDescription}>
                I do not have housing, and I already have friends who I want to
                room with (who are also looking for housing with me).
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={Roles_styles.invalidText}>{formState}</Text>
          </View>
          <TouchableOpacity
            style={Roles_styles.nextButton}
            onPress={() => {
              if (!validate()) {
                console.log("YOU SHALL NOT PASS");
              } else {
                console.log("YOU SHALL PASS");
                navigation.navigate("BasicInfo");
              }
            }}
          >
            <Text style={Roles_styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Roles_styles = StyleSheet.create({
  /*
    container: {
        flex: 1,
        backgroundColor: "#CFEEF5",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        backgroundColor: "#6736B6",
        height: 90,
        width: '100%',
        bottom: 370,
    },
    */
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: "#6736B6",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 90,
    bottom: 50,
    marginBottom: -50,
  },
  headTitle: {
    flex: 2,
    top: 20,
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  roleText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    fontSize: 25,
    top: 0,
    color: "#6736B6",
    alignSelf: "center",
  },
  icons: {
    width: 96,
    height: 96,
  },
  owlIcon: {
    paddingLeft: 6,
    left: 6,
    width: 90,
    height: 90,
  },
  flamingoButton: {
    height: 120,
    width: "90%",
    backgroundColor: "#FF006E",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  owlButton: {
    height: 120,
    width: "90%",
    backgroundColor: "#563AFF",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  penguinButton: {
    height: 120,
    width: "90%",
    backgroundColor: "#FF9D0B",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  parrotButton: {
    height: 120,
    width: "90%",
    backgroundColor: "#54BF22",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  duckButton: {
    height: 120,
    width: "90%",
    backgroundColor: "#FF5732",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  roleTitle: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 18,
    textAlign: "left",
    alignContent: "flex-start",
    paddingLeft: 5,
  },
  owlRoleTitle: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 18,
    textAlign: "left",
    alignContent: "flex-start",
    paddingLeft: 11,
  },
  roleDescription: {
    fontSize: 17,
    color: "#FFF",
    paddingLeft: 5,
    //textAlign: "left",
    alignContent: "flex-start",
    flexWrap: "wrap",
    //fontFamily: "Inter400_Regular",
  },
  owlRoleDescription: {
    fontSize: 17,
    color: "#FFF",
    paddingLeft: 11,
    //textAlign: "left",
    alignContent: "flex-start",
    flexWrap: "wrap",
    //fontFamily: "Inter400_Regular",
  },
  viewFlex: {
    flexShrink: 1,
    top: -12,
  },
  viewFlexMore: {
    flexShrink: 1,
    top: -6,
  },
  invalidText: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
    alignItems: "center",
    bottom: -10,
  },
  nextButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#6736B6",
    paddingVertical: 8,
    marginBottom: 40,
    paddingHorizontal: 35,
    borderRadius: 23,
  },
  nextText: {
    fontSize: 14,
    color: "#FFF",
    margin: 3,
    fontWeight: "bold",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  backButton: {
    left: 5,
    top: 20,
    flex: 1.2,
    alignItems: "center",
    flexDirection: "row",
  },
  backText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: "#FFF",
    marginRight: -5,
  },
});

export default Roles;
