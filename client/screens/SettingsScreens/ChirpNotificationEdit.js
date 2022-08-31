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
  textButton: {

  },
  notiText: {
    marginTop: 30,
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
