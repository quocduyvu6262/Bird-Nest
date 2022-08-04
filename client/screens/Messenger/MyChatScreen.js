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


export default MyChatScreen = () => {
    const [messages, setMessages] = useState([])
    
    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            //console.log('querySnapshot unsusbscribe');
            setMessages(
                querySnapshot.docs.map(doc => {
                  //console.log(doc.data())
                  return ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                })})
            );
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0]; 
        addDoc(collection(database, 'chats'), {
          _id: _id,
          createdAt: createdAt,
          text: text,
          user: user
        });
    }, []);

    return(
        // <GiftedChat 
        
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
    )
}