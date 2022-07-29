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
import QuestHeader from "../components/QuestHeader.js";
//import { useFonts, Inter_400Regular} from '@expo-google-fonts/inter';

//let [fontsLoaded] = useFonts({
//    Inter_400Regular,
//  });

const Roles = () => {
  const selectRoles = (selectedRole) => {
    console.log(selectedRole);
    /*
        //first check if your user id is in opposing table
            //if flamingo or owl, check if nohousing has an entry for your userid
            //if parrot, penguin, duck, check if housing has an entry for your userid
            //if opposing table has an entry, create a new entry in your corresponding 
              table and copy all values over from opposing table, then delete the opposing table row
        //if not in opposing table, post userid to corresponding table
            //if flamingo or owl post to housing screen
            //if parrot, penguin, duck post to nohousing
            //update Role variable in User table
            //INSERT statement
        */

    //const selectedRole  = "";

    //If housing role selected
    if (selectedRole === "Flamingo" || selectedRole === "Owl") {
      console.log("HOUSINGS");
      //Check opposing table (nohousing)
      Axios.get("http:192.168.1.13:3000/api/nohousing/11", {
        //TODO: don't hardcode ID
      })
        .then((response) => {
          //let userResponse = response.data;
          //console.log(response);
          console.log("RESPONSE");
          //if user not found in opposite table, insert normally into corresponding table (housing)
          if (response === "null") {
            //Update role in User Table
            Axios.post("http://192.168.1.13:3000/api/users/role", {
              user_id: 11, //TODO: Don't hard-code
              role: selectedRole,
            }).catch((error) => {
              console.log(error);
              console.log("POST ERROR");
            });
            //Insert user with user_id in corresponding table (housing)
            Axios.post("http://192.168.1.13:3000/api/housings/create", {
              user_id: 11, //TODO: Don't hard-code
            }).catch((error) => {
              console.log(error);
            });
          }
          //if user was found in opposite table (nohousing), copy that row into corresponding table and delete opposite table's row
          else {
            Axios.get("http://192.168.1.13:3000/api/nohousing/:id?=11", {
              //TODO: don't hardcode ID
            })
              .then((response) => {
                let oldInfo = response.data;
                //Update the corresponding table (housing) with opposite table's old data
                Axios.post("http://192.168.1.13:3000/api/housings/create", {
                  oldInfo,
                }).catch((error) => {
                  console.log(error);
                });
              })
              .catch((error) => {
                console.log(error);
              });
            //Delete the old user data in the opposite table (nohousing)
            Axios.post("http://192.168.1.13:3000/api/nohousing/delete", {
              user_id: 11, //TODO: Don't hard-code
              role: selectedRole,
            }).catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //if nohousing role selected
    else if (
      selectedRole === "Parrot" ||
      selectedRole === "Penguin" ||
      selectedRole === "Duck"
    ) {
      //Check opposing table
      Axios.get("http://192.168.1.13:3000/api/housings/", {
        //TODO: don't hardcode ID
      })
        .then((response) => {
          //let userResponse = response.data;
          console.log(response);
          //if user not found in opposite table, insert normally into corresponding table (housing)
          if (response === "null") {
            //Update role in User Table
            Axios.post("http://192.168.1.13:3000/api/users/role", {
              user_id: 11, //TODO: Don't hard-code
              role: selectedRole,
            }).catch((error) => {
              console.log(error);
            });
            //Insert user with user_id in corresponding table (nohousing)
            Axios.post("http://192.168.1.13:3000/api/nohousing/create", {
              user_id: 11, //TODO: Don't hard-code
            }).catch((error) => {
              console.log(error);
            });
          }
          //if user was found in opposite table (housing), copy that row into corresponding table and delete opposite table's row
          else {
            Axios.get("http://192.168.1.13:3000/api/housings/:id?=11", {
              //TODO: don't hardcode ID
            })
              .then((response) => {
                let oldInfo = response.data;
                //Update the corresponding table (nohousing) with opposite table's old data
                Axios.post("http://192.168.1.13:3000/api/nohousing/create", {
                  oldInfo,
                }).catch((error) => {
                  console.log(error);
                });
              })
              .catch((error) => {
                console.log(error);
              });
            //Delete the old user data in the opposite table (housing)
            Axios.post("http://192.168.1.13:3000/api/housings/delete", {
              user_id: 11, //TODO: Don't hard-code
              role: selectedRole,
            }).catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
          console.log("!!!!!!!!!!!!!!!!!!");
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={Roles_styles.container}>
      <View style={Roles_styles.header}>
        <Text style={Roles_styles.headTitle}>Roles (2/5)</Text>
        <TouchableOpacity style={Roles_styles.backButton}>
                <Image source={require("../assets/backArrow.png")} style={Roles_styles.backIcon}/>
                <Text style={Roles_styles.backText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ top: 15 }}>
          <View>
            <Text style={Roles_styles.roleText}>Choose your role!</Text>
          </View>
          <TouchableOpacity
            style={Roles_styles.flamingoButton}
            onPress={() => selectRoles("Flamingo")}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../assets/Flamingo-512.png")}
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
            onPress={() => selectRoles("Owl")}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../assets/owl-icon.png")}
            />
            <View style={Roles_styles.viewFlex}>
              <Text style={Roles_styles.roleTitle}>Owl</Text>
              <Text style={Roles_styles.roleDescription}>
                I have housing, am not living there, and need people to live in
                the space. (sublease)
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={Roles_styles.parrotButton}
            onPress={() => selectRoles("Parrot")}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../assets/icons8-parrot-96.png")}
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
            onPress={() => selectRoles("Penguin")}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../assets/icons8-linux-96.png")}
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
            onPress={() => selectRoles("Duck")}
          >
            <Image
              style={Roles_styles.icons}
              source={require("../assets/icons8-duck-96.png")}
            />
            <View style={Roles_styles.viewFlexMore}>
              <Text style={Roles_styles.roleTitle}>Duck</Text>
              <Text style={Roles_styles.roleDescription}>
                I do not have housing, and I already have friends who I want to
                room with (who are also looking for housing with me).
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={Roles_styles.nextButton}>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#6736B6",
    height: 90,
    bottom: 50,
    marginBottom: -50,
  },
  headTitle: {
    color: "#FFF",
    //top: 55,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  roleText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
  },
  headerText: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 20,
    top: 45,
    textAlign: "center",
  },
  icons: {
    width: 96,
    height: 96,
  },
  flamingoButton: {
    height: 120,
    width: "90%",
    backgroundColor: "#FE002E",
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
    backgroundColor: "#BC00FE",
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
    backgroundColor: "#FB5607",
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
    backgroundColor: "#3B9CF1",
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
    backgroundColor: "#FF5775",
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
  },
  roleDescription: {
    fontSize: 17,
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
    flexDirection: "row",
    //top: 60,
    bottom: 23,
    marginLeft: 12,
    alignItems: "center",
   },
   backText: {
    color: "#FFF",
    fontSize: 15,
   },
   backIcon: {
    height: 20,
    width: 20,
    tintColor: "#FFF",
    marginRight: -5,
   },
});

export default Roles;
