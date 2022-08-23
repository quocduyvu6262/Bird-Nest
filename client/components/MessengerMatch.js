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
// 344 = stephen
const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);
const MessengerMatch = () => {
    const selectedUserID = 'testuser3';
    const [userList, setUserList] = useState([]);
    const [listState, setListState] = useState(false);
    const viewMatchedUsers = async () => {
        let userList = [];
        Axios.post(`${await Constants.BASE_URL()}/api/history/matches`, {
            user_id: user.id,
        })
        .then((response) => {
        let userData = response.data;
        console.log(userData[0][0].uid)
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        setUserList(userData)
        })
        .catch((error) => {
        console.log(error);
        });
        setListState(true);
    };
    const user = useSelector(state => state.data.userInfo);
    const displayName = user.fullname;
    const trimName = displayName.replace(/\s/g, '');
    const userID = `${trimName}_${user.uid}`;
    const createChannel = async () => {
        const channel = chatClient.channel('messaging',{
          members: [userID, selectedUserID]
        });
        await channel.create();
      }

    const MatchLoad = (props) => {
        return(
            <View>
                <TouchableOpacity 
                    style={styles.textContainer}
                    onPress={()=>{
                        createChannel()
                    }}>
                    <Image 
                        style={styles.image}
                        source={props.src}
                    />
                    <Text style={{marginTop:5}}>{userList.fullname}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    useEffect(() => {
        viewMatchedUsers();
      }, []);
      
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
                    <MatchLoad
                        name={"Dave Smith"}
                        src={Elie}
                    />
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