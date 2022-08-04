import React, {useEffect, useLayoutEffect, useState} from "react";
import { 
    SafeAreaView, 
    View, 
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
} from "react-native";
import MainHeader from "../../components/MainHeader";
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
import ChatItem from "./ChatItem";

export default MyChatList = ({navigation}) => {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database,"chats"), snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate('MyChatScreen',{
            id: id,
            chatName: chatName
        });
    }
    return(
        <SafeAreaView style={{backgroundColor:'white'}}> 
            <MainHeader screen="Rooms" navigation={navigation} />
            <ScrollView style={styles.container}>
                {chats.map(({id, data: {chatName}}) => (
                    <ChatItem 
                    key={id} 
                    id={id} 
                    chatName={chatName} 
                    enterChat={enterChat}/>
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