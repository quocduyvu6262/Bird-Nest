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
import Elie from '../assets/Elie.jpg'
import Axios from "axios";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useSelector } from "react-redux";
import { StreamChat } from 'stream-chat';
import Constants from '../constants/constants';
import {getChatUID} from '../utils/getChatUID';

const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);


const MessengerMatch = () => {

    /**
     * Declare states
     */
    const [secondUserChatUIDList, setSecondUserChatUIDList] = useState([])
    const [userList, setUserList] = useState([[{}]])
    const [wait, setWait] = useState(false);
    const user = useSelector(state => state.data.userInfo);
    const userID = getChatUID(user.fullname, user.uid);
    
    /**
     * TODO: add function header
     */
    const viewMatchedUsers = async () => {
        let userList = [];
        Axios.post(`${await Constants.BASE_URL()}/api/chat/matchedChat`, {
            user_id: user.id,
        })
        .then((response) => {
            let userData = response.data;
            // manually push all but last, then setUserList on last user to trigger FlatList rerender
            // reason is that FlatList will not re-render unless setUserList is properly called
            // but setUserList (setState) will only set state once
            setUserList(userData)
        })
        .catch((error) => {
            console.log(error);
        });
        setWait(true);
    };

    /**
     * TODO: add function header
     */
    const secondUser = async () => {
        let secondUserIDs = []
        for (let i = 0; i < userList.length; i++) {
            if (typeof userList[i].fullname == "undefined" || typeof userList[i].uid == "undefined") {
                console.log("FUCK");
            } else {
                const secondUserID = getChatUID(userList[i].fullname, userList[i].uid)
                secondUserIDs.push(secondUserID)
            }
        }
        setSecondUserChatUIDList(secondUserIDs);
        console.log(secondUserChatUIDList)
    }

    /**
     * TODO: add function header
     */
    const CreateChannel = async () => {
        if (secondUserIDs.length > 0) {
            for (let i = 0; i < secondUserIDs.length; i++) {
                const channel = chatClient.channel('messaging',{
                    members: [userID, secondUserIDs[i]]
                });
                await channel.create();
            }
        }
    }

    /**
     * TODO: add function header
     */
    const MatchLoad = (props) => {
        return(
            <View>
                <TouchableOpacity 
                    style={styles.textContainer}
                    // onPress={()=>{
                    //     createChannel()
                    // }}
                    >
                    <Image 
                        style={styles.image}
                        source={props.src}
                    />
                    {wait && (
                    <Text style={{marginTop:5}}>{props.name}
                    </Text>)}
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Use effect
     */
    useEffect(() => {
        viewMatchedUsers();
    }, []);


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
                    style={styles.user}
                    horizontal = {true}>
                {wait && userList.map((user,i) => {return (
                    <MatchLoad
                        key={i}
                        name={user.fullname}
                        src={Elie}
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