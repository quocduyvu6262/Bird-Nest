import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import MainHeader from "../../components/MainHeader";
// Source to use push notification: https://blog.logrocket.com/create-send-push-notifications-react-native/

const ChirpNotificationEdit = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
<<<<<<< HEAD
  const [isMatch, setIsMatch] = useState(false);
  const toggleMatch= () => setIsMatch((previousState) => !previousState);
  
  return (
    <SafeAreaView style={ChirpNotificationEdit_Styles.container}>
      <MainHeader screen="Chirp Notification" navigation={navigation} />
      <Text style={ChirpNotificationEdit_Styles.pushNotification}>
        Enable Push Notifications
      </Text>

      <Switch
        style={ChirpNotificationEdit_Styles.switchButton}
        trackColor={{ false: "%767577", true: "green" }}
        thumbColor={isEnabled ? "#white" : "white"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      ></Switch>
      
      <Text style={ChirpNotificationEdit_Styles.pushNotification}>
        Matches
      </Text>

      <Switch
        style={ChirpNotificationEdit_Styles.switchButton}
        trackColor={{ false: "%767577", true: "green" }}
        thumbColor={isEnabled ? "#white" : "white"}
        onValueChange={toggleMatch}
        value={isMatch}
      ></Switch>

      <Text style={ChirpNotificationEdit_Styles.pushNotification}>
        Peck Yes
      </Text>

      <Switch
        style={ChirpNotificationEdit_Styles.switchButton}
        trackColor={{ false: "%767577", true: "green" }}
        thumbColor={isEnabled ? "#white" : "white"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      ></Switch>

      <Text style={ChirpNotificationEdit_Styles.pushNotification}>
        New Messenger Pigeon Messages
      </Text>
=======
  
  const [isMatch, setIsMatch] = useState(false);
  const toggleMatch= () => setIsMatch((previousState) => !previousState);

  const [isYes, setIsYes] = useState(false);
  const toggleYes= () => setIsYes((previousState) => !previousState);

  const [isMessage, setIsMessage] = useState(false);
  const toggleMessage= () => setIsMessage((previousState) => !previousState);
  
  return (
    <SafeAreaView style={ChirpNotificationEdit_Styles.container}>
      <MainHeader screen="Chirp Notifications" navigation={navigation} />
      <View style={{flexDirection: "row", alignSelf: "center"}}>
        
        
        <Switch
          style={ChirpNotificationEdit_Styles.switchButton}
          trackColor={{ false: "%767577", true: "54BF22" }}
          thumbColor={isEnabled ? "#white" : "white"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        ></Switch>
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5

        <Text style={ChirpNotificationEdit_Styles.notiText}>
          Enable Push Notifications
        </Text>
      </View>
      
      <Text style={ChirpNotificationEdit_Styles.notiText}>
        Enable Notifications for:
      </Text>
      
      <View style={{flexDirection: "row"}}>
        

        <Switch
          style={ChirpNotificationEdit_Styles.switchButton}
          trackColor={{ false: "%767577", true: "54BF22" }}
          thumbColor={isMatch ? "#white" : "white"}
          onValueChange={toggleMatch}
          value={isMatch}
        ></Switch>

        <Text style={ChirpNotificationEdit_Styles.notiText}>
          Matches
        </Text>
      </View>
      
      <View style={{flexDirection: "row"}}>
        

        <Switch
          style={ChirpNotificationEdit_Styles.switchButton}
          trackColor={{ false: "%767577", true: "54BF22" }}
          thumbColor={isYes ? "#white" : "white"}
          onValueChange={toggleYes}
          value={isYes}
        ></Switch>

        <Text style={ChirpNotificationEdit_Styles.notiText}>
          Peck Yes
        </Text>
      </View>

      <View style={{flexDirection: "row"}}>
        

        <Switch
          style={ChirpNotificationEdit_Styles.switchButton}
          trackColor={{ false: "%767577", true: "54BF22" }}
          thumbColor={isMessage ? "#white" : "white"}
          onValueChange={toggleMessage}
          value={isMessage}
        ></Switch>

        <Text style={ChirpNotificationEdit_Styles.notiText}>
          New Messages
        </Text>
      </View>
    </SafeAreaView>
  );
};
const ChirpNotificationEdit_Styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf: "center",
    // alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
<<<<<<< HEAD
  pushNotification: {
    marginTop: 30,
    height: 50,
    backgroundColor: "#560CCE",
=======
  textButton: {

  },
  notiText: {
    marginTop: 30,
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
    fontSize: 25,
    color: "#560CCE",
    padding: 10,
  },
  switchButton: {
    marginTop: 30,
    // flexDirection: "column",
    alignSelf: "center",
    marginLeft: 8,
  },
});
export default ChirpNotificationEdit;
