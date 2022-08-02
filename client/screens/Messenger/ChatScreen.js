// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, Button, LogBox } from 'react-native'
import * as firebase from 'firebase'
import * as SecureStore from "expo-secure-store";
import Constant from '../../constants/constants'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBM6uF183divLctmv-7oivanZY76GrVxU",
  authDomain: "bird-nest-ed655.firebaseapp.com",
  projectId: "bird-nest-ed655",
  storageBucket: "bird-nest-ed655.appspot.com",
  messagingSenderId: "958405478516",
  appId: "1:958405478516:web:9d1660a73cdc062020e921",
  measurementId: "G-X34RQRY5BS"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')

const ChatScreen = () => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    // saveUserToFirestore(user) {
    //     const userRef = db.collection('user')
    //     userRef.doc(user.uid).set({
    //       uid: user.uid,
    //       displayName: user.displayName,
    //       photoURL: user.photoURL,
    //       email: user.email,
    //     })
    //   },
    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        SecureStore.getItemAsync(Constant.MY_SECURE_AUTH_STATE_KEY_TOKEN).then(accessToken => {
            console.log(accessToken)
        })
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
export default ChatScreen