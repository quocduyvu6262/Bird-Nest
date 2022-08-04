import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Input } from 'react-native-element';
import { GiftedChat } from 'react-native-gifted-chat';
import * as AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    collection,
    addDoc,
    getFirestore,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    auth, 
    database
} from '../../firebase';

export default MyAddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat"
        })
    }, [])

    return(
        <View style={styles.container}>
            <Input 
                
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {}
})