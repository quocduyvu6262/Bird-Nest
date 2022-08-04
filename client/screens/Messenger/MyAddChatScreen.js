import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { Platform, 
    StyleSheet, 
    Text, 
    TextInput,
    View,
} from "react-native";
import Button from '../../components/Button';
import { GiftedChat } from 'react-native-gifted-chat';
import * as AsyncStorage from '@react-native-async-storage/async-storage';
import {
    setDoc,
    doc,
    database,
    addDoc,
    collection
} from '../../firebase';

export default MyAddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");
    const createChat = async () => {
        // await setDoc(doc(database, "chats", input),{
        //     chatName: input
        // }).then(() => {
        //     console.log("Room added successfully")
        // }).catch(() => {
        //     console.log("Fail to add room")
        // })
        await addDoc(collection(database, "chats"),{
            chatName: input
        }).then(() => {
            console.log("Room added successfully")
            navigation.navigate('MyChatList');
        }).catch(() => {
            console.log("Room added fail")
        })
    }
    return(
        <View style={styles.container}>
            <TextInput 
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder='Enter the chat name'
            />
            <Button onPress={createChat}>
                Create new chat
            </Button>
            <Button onPress={() => {
                navigation.navigate('MyChatList')
            }}>
                Enter Chat List
            </Button>
            
            <Button onPress={() => {
                navigation.navigate('MyUserList')
            }}>
                Enter User List
            </Button>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})