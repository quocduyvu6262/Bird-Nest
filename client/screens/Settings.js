import {StatusBar} from 'expo-status-bar';
import React from 'react'
import{StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Buttons from '../components/Button'
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MY_SECURE_AUTH_STATE_KEY} from "@env";

const Settings = ({navigation}) => {
    const logout = () => {
        SecureStore.deleteItemAsync(MY_SECURE_AUTH_STATE_KEY)
            .then(() => {
              navigation.replace("LoginScreen");
            })
            .catch(err => console.log(err));
      }
    return(
        <View style = {Settings_Styles.container}>
            <TouchableOpacity style = {Settings_Styles.regularButton} 
            onPress={()=>{navigation.navigate('ChirpNotificationEdit')}}>
                <Text style = {Settings_Styles.textButton}>Chirp Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {Settings_Styles.regularButton}  
            onPress={()=>navigation.navigate('HelpSupport')}>
                <Text style = {Settings_Styles.textButton}>Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {Settings_Styles.regularButton}  
            onPress={()=>navigation.navigate('TermsOfService')}>
                <Text style = {Settings_Styles.textButton}>Terms of service</Text>
            </TouchableOpacity>

            <Buttons style = {Settings_Styles.logoutButton} 
            onPress={()=>{
                logout();
            }}>Logout</Buttons>


            <TouchableOpacity style = {Settings_Styles.deleteButton}>
                <Text style = {Settings_Styles.textButton}>Delete Profile</Text>
            </TouchableOpacity>
        </View>
    )
}
const Settings_Styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop: 20,
        flexDirection: "column",
        alignContent: 'flex-end',
        justifyContent: 'center',
    },
    regularButton: {
        width: 200,
        height: 50,
        marginTop: 80,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#560CCE',
    },
    textButton: {
        color: "white",
    },
    logoutButton: {
       flex: 1, 
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
    }
});
export default Settings;