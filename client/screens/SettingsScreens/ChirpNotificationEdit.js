import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Switch } from "react-native";
import React, { useState } from "react";
import * as Notifications from 'expo-notifications';

// Source to use push notification: https://blog.logrocket.com/create-send-push-notifications-react-native/

const ChirpNotificationEdit = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <SafeAreaView style={ChirpNotificationEdit_Styles.container}>
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