import React, {useState, useEffect} from 'react';
import { Text, 
    SafeAreaView, 
    LogBox, 
    StatusBar, 
    View, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import Elie from '../../assets/Elie.jpg'
import Axios from "axios";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useDispatch, useSelector } from "react-redux";
import { StreamChat } from 'stream-chat';
import Constants from '../../constants/constants';
import {getChatUID, 
    removeItem, 
    updateMatchedUserChatSecureStore,
    updateMatchedChatUserDatabase,
    viewMatchedUserChat
} from '../../utils/helper';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import data, * as dataActions from '../../redux/slices/data'

const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);


const MessengerMatch = ({sheetRef, setIsOpen, handleSnapPress, userList, setUserList}) => {

    /**
     * Declare states
     */
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.userInfo);

    /**
     * TODO: add function header
     */
    const MatchLoad = (props) => {
        const clickedUser = props.user;
        return(
            <View props>
                <TouchableOpacity 
                    style={styles.textContainer}
                    onPress={()=>{
                        handleSnapPress(0, clickedUser);
                    }}
                    >
                    <Image 
                        style={styles.image}
                        source={props.src}
                    />
                    <Text style={{marginTop:5}}>{props.name} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Use effect
     */
    useEffect(() => {
        viewMatchedUserChat(user.matchedChat).then(({data}) => {
            // data is the list of matched user
            setUserList(data);
        });
    },[]);
    /**
     * Render logic
     */
    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });
    if (!fontsLoaded) {
        return <View></View>;
    } else {
    return (
        <View style={{borderBottomWidth: 0.17, marginTop: 5}}>
            <View style={styles.container}>
                <Text style={styles.matchText}
                >Matches! </Text>
                <ScrollView
                    style={styles.users}
                    horizontal = {true}>
                    {userList.map((user,i) => {return (
                        <MatchLoad 
                            key={i}
                            name={user.fullname}
                            src={Elie}
                            user={user}
                        />
                    )})}
                </ScrollView>
            </View>
        </View>
    )
}}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
    },
    users: {
        flexDirection: "row",
    },
    textContainer: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
        alignItems:'center',
    },
    matchText: {
        fontSize: 25,
        marginLeft: 5,
    },
    image: {
        borderRadius:100,
        width: 75,
        height: 75,
    }
})
export default MessengerMatch;