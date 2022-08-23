import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Buttons from "../../components/Button";
import * as SecureStore from "expo-secure-store";
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainHeader from "../../components/MainHeader";
// Import constants
import Constants from "../../constants/constants";
const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);
import { StreamChat } from "stream-chat";
import * as Updates from "expo-updates";
import { DevSettings } from "react-native";

const Settings = ({ navigation }) => {
  const logout = async () => {
    await SecureStore.deleteItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN)
      .then(async () => {
        await SecureStore.deleteItemAsync(
          Constants.MY_SECURE_AUTH_STATE_KEY_USER
        )
          .then(async () => {
            await SecureStore.deleteItemAsync(
              Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING
            )
              .then(async () => {
                SecureStore.deleteItemAsync(
                  Constants.MY_SECURE_AUTH_STATE_KEY_REDUX
                );
                SecureStore.deleteItemAsync(
                  Constants.MY_SECURE_AUTH_STATE_IMAGE_URI
                );
                navigation.navigate("LoginScreen");
                await chatClient.disconnectUser();
                DevSettings.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Settings" navigation={navigation} />
      <TouchableOpacity
        style={styles.regularButton}
        onPress={() => {
          navigation.navigate("ChirpNotificationEdit");
        }}
      >
        <Text style={styles.textButton}>Chirp Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.regularButton}
        onPress={() => navigation.navigate("IDQs")}
      >
        <Text style={styles.textButton}>Edit Questionnaire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.regularButton}
        onPress={() => navigation.navigate("HelpSupport")}
      >
        <Text style={styles.textButton}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.regularButton}
        onPress={() => navigation.navigate("TermsOfService")}
      >
        <Text style={styles.textButton}>Terms of Service</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.regularButton}
        onPress={() => navigation.navigate("AboutUs")}
      >
        <Text style={styles.textButton}>About Us</Text>
      </TouchableOpacity>
      
      <Buttons
        style={{flex: 1}}
        onPress={() => {
          logout();
        }}
      >
        Logout
      </Buttons>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.textButton}>Delete Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-end",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  regularButton: {
    width: 200,
    height: 50,
    marginTop: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#560CCE",
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  deleteButton: {
    marginBottom: 40,
    width: 200,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "red",
  },
});
export default Settings;
