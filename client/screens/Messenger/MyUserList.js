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
import UserItem from './UserItem';
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
import MainHeader from '../../components/MainHeader';

export default MyUserList = ({navigation}) => {
    const currentUser = auth.currentUser
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const usersRef = collection(database, "users");
        // create query object
        const q = query(usersRef, where("uid", "not-in", [currentUser.uid]));
        const unsubscribe = onSnapshot(q, snapshot => {
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    }, [])
    const createPrivateChat = async (selectedUser) => {
        const id = currentUser.uid > selectedUser.id ? `${currentUser.uid + selectedUser.id}` : `${selectedUser.id + currentUser.uid}`;
        await setDoc(doc(database,"chats",id),{
            chatName: `${currentUser.displayName} and ${selectedUser.data.name}`,
            id: id
        })
    }

    const enterChat = (id, chatName) => {
        navigation.navigate('MyChatScreen',{
            id: id,
            chatName: chatName
        });
    }
    return (
        <SafeAreaView style={{backgroundColor:'white', flex: 1}}> 
            <MainHeader screen="Users" navigation={navigation} />
            <ScrollView style={styles.container}>
                {users.map(user => {
                    return (
                        <UserItem 
                            key={user.id} 
                            id={currentUser.uid > user.id ? `${currentUser.uid + user.id}` : `${user.id + currentUser.uid}`} 
                            chatName={user.data.name} 
                            user={user} 
                            enterChat={enterChat}
                            createPrivateChat={createPrivateChat}
                         />
                    )})}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})

