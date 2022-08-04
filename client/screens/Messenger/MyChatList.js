import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
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

export default MyChatList = () => {
    const [chats, setChats] = useState([])
    useEffect(
        () =>
            onSnapshot(collection(db, 'chats'), (snapshot) => {
                setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            }
    ),[])

    return(
        <View></View>
    )
    
}