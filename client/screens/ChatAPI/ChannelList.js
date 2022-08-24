import React, { useRef, useState, useCallback} from 'react';
import {
    ChannelList,
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import Constants from '../../constants/constants';
import { Text, SafeAreaView, LogBox, StatusBar, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../../components/MainHeader';
import MessengerMatch from './MessengerMatch';
import {getChatUID, 
    removeItem, 
    updateMatchedUserChatSecureStore,
} from '../../utils/helper';
import data, * as dataActions from '../../redux/slices/data'
import ChatOverlay from '../../components/Overlay/ChatOverlay';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Sending `onAnimatedValueUpdate` with no listeners registered.'
  ]);
  
const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);
export default ChannelListScreen = (props, navigation) => {
    /**
     * Declare state
     */
    const [userList, setUserList] = useState([]);
    const user = useSelector(state => state.data.userInfo);
    const dispatch = useDispatch();
    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ["50%"];
    const [clickedUser, setClickedUser] = useState(null);

    /**
     * Handle chat overlay
     */
    const handleSnapPress = useCallback((index, clickedUser) => {
        sheetRef.current?.snapToIndex(index);
        setClickedUser(clickedUser);
        setIsOpen(true);
    },[])

    /**
     * Handle send message for chat overlay
     */
    const handleSendMessageChatOverlay = async (currentUser, selectedUser, message) => {
        if(message && message.length){
            // create channel
            const selectedUserChatUID = getChatUID(selectedUser.fullname, selectedUser.uid);
            const currentUserChatUID = getChatUID(currentUser.fullname, currentUser.uid);
            const channel = chatClient.channel('messaging',{
                members: [currentUserChatUID, selectedUserChatUID]
            });
            await channel.create();
            // send message and navigate to channel
            const messageToSend = await channel.sendMessage({
                text: message,
                mentioned_users: [currentUserChatUID]
            });
            props.navigation.navigate('ChannelScreen', {channel});
            // update UI
            setIsOpen(false);
            // remove bubble
            const newMatchedUserList = removeItem(user.matchedChat, clickedUser.id);
            dispatch(dataActions.updateMatchedChat(newMatchedUserList));
            updateMatchedUserChatSecureStore(user, newMatchedUserList);
            //updateMatchedChatUserDatabase(user.id, newMatchedUserList);
            setUserList(userList.filter(user => {
                return !(user.id == clickedUser.id);
            }));
        }
    }

    /**
     * Filter members
     */
    const filters = {
        members: {
            '$in': [`${getChatUID(user.fullname , user.uid)}`]
        }
    }

    /**
     * Sort message
     */
    const sort = {
        last_message_at: -1
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, opacity: isOpen ? 0.2 : 1}}>
                <MainHeader screen="Messenger Pigeon" navigation={navigation}/>
                <MessengerMatch sheetRef={sheetRef} setIsOpen={setIsOpen} 
                                handleSnapPress={handleSnapPress}
                                userList={userList}
                                setUserList={setUserList}/>
                <ChannelList
                    onSelect={(channel) => {
                        const { navigation } = props;
                        navigation.navigate('ChannelScreen', {channel});
                    }}
                    filters={filters}
                    sort={sort}
                />
            </View>
            {isOpen && <ChatOverlay sheetRef={sheetRef} snapPoints={snapPoints} setIsOpen={setIsOpen}
                                    handleSendMessageChatOverlay={handleSendMessageChatOverlay}
                                    clickedUser={clickedUser}/>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
        backgroundColor: "white",
    }
})
