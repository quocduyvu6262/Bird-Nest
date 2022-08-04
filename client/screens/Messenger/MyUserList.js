import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { KeyboardAvoidingView, 
    Platform, 
    StyleSheet, 
    Text, 
    TextInput, 
    View,
    SafeAreaView,
    ScrollView
} from "react-native";
import ChatItem from './ChatItem';
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
    where,
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
import MainHeader from '../../components/MainHeader';

export default MyUserList = ({navigation}) => {
    const currentUser = auth.currentUser.uid
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database,"users"), snapshot => {
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    }, [])
    const enterChat = (id, chatName = "Private Chat") => {
        navigation.navigate('MyChatScreen', {
            id: id,
            chatName: chatName
        });
    }
    const createPrivateChat = async(selectUserId) => {
        const id = `${currentUser}_${selectUserId}`
        await setDoc((database, "chats", id), {
            id: id,
            chatName: currentUser.name + "Private Chat",
        });
    }
    return (
        <SafeAreaView style={{backgroundColor:'white', flex: 1}}> 
            <MainHeader screen="Users" navigation={navigation} />
            <ScrollView style={styles.container}>
                {users.map(user => (
                    <ChatItem
                    key={user.id} 
                    id={user.id} 
                    chatName={user.data.name} 
                    enterChat={enterChat} 
                    createPrivateChat = {createPrivateChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})

