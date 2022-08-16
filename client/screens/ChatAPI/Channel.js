import React,{useLayoutEffect} from 'react';
import {
    Channel,
    MessageList,
    MessageInput,
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { LogBox } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Constants from '../../constants/constants'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Sending `onAnimatedValueUpdate` with no listeners registered.'
]);

const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);

const getChannelName = (members) => {
    const defaultName = 'Johnny Blaze';
    if (!members.length || members.length === 1) {
        return members[0]?.user.name || defaultName;
    }
    return `${members[0]?.user.name || defaultName}, ${members[1]?.user.name || defaultName}`;
}

export default ChannelScreen = (props) => {
    const { navigation } = props;
    const { route } = props;
    const { params: { channel } } = route;

    const members = Object.values(channel?.state.members).filter(
        ({ user }) => user.id !== chatClient.userID,
    );
    const channelName = getChannelName(members);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back",
            headerTitle: channelName
        })
    })
    return(
        <Channel channel={channel} >
            <MessageList />
            <MessageInput />
        </Channel>
    )
}
