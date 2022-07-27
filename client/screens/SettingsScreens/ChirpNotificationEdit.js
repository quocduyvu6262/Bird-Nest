import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Switch, StatusBar } from "react-native";
import React, { useState } from "react";
import * as Notifications from 'expo-notifications';
import MainHeader from "../../components/MainHeader";
// Source to use push notification: https://blog.logrocket.com/create-send-push-notifications-react-native/

const ChirpNotificationEdit = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <SafeAreaView style={ChirpNotificationEdit_Styles.container}>
            <MainHeader screen="Chirp Notification" navigation={navigation} />
            <Text>Chirp Notification Page</Text>
                <Text style = {ChirpNotificationEdit_Styles.pushNotification}>
                        Push Notification
                </Text>

                <Switch
                style = {ChirpNotificationEdit_Styles.switchButton}
                trackColor ={{ false: "%767577", true: "green"}}
                thumbColor = {isEnabled ? "#white" : "white"}
                onValueChange ={toggleSwitch}
                value={isEnabled}>
                </Switch>
        </SafeAreaView>
    )
}
const ChirpNotificationEdit_Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    pushNotification: {
        marginTop: 40,
        width: 200,
        height: 50,
        backgroundColor: "#560CCE",
        fontSize: 25,
        color: "white",
        padding: 10,
    },
    switchButton: {
        marginTop: 40,
        flexDirection: "column",
        alignItems: 'center'
    }
    }
)
export default ChirpNotificationEdit