import React, {useEffect, useLayoutEffect, useState} from "react";
import { List, Divider } from 'react-native-paper';
import { 
    SafeAreaView, 
    View, 
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
} from "react-native";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    collection,
    addDoc,
    setDoc,
    doc,
    getFirestore,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    auth, 
    database
} from '../../firebase';

export default UserItem = ({id, chatName, enterChat, createPrivateChat, user}) => {
    
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() =>{
                createPrivateChat(user)
                enterChat(id, chatName)
            }}
            >
                <List.Item 
                    style={styles.ListItem}
                    key={id}
                    Divider
                    title={chatName}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    ListItem:{
        borderBottomWidth: 0.2,
        borderRadius: 10

    }
})