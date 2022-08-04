import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import * as AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    collection,
    addDoc,
    doc,
    getFirestore,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    auth, 
    database
} from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../components/MainHeader';

export default MyChatScreen = ({navigation, route}) => {
    const [messages, setMessages] = useState([])
    
    useLayoutEffect(() => {
        const collectionRef = doc(database,"chats",route.params.id);
        const messageRef = collection(collectionRef,"messages")
        const q = query(messageRef, orderBy('createdAt', 'desc'));
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
        // SUBDOC
        const collectionRef = doc(database,"chats",route.params.id);
        const messageRef = collection(collectionRef,"messages")
        addDoc(messageRef, {
          _id: _id,
          createdAt: createdAt,
          text: text,
          user: user
        })

    }, []);
        
    return(
        // <GiftedChat 
          //<Button onPress={() => navigation.navigate('Messener Pigeon')}>Go back</Button>
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
          <KeyboardAvoidingView style={styles.container}>
            <MainHeader screen={route.params.chatName} navigation={navigation}></MainHeader>
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
                  id: auth?.currentUser?.uid,
                  email: auth?.currentUser?.email,
                  avatar: 'https://i.pravatar.cc/300'
                }}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})