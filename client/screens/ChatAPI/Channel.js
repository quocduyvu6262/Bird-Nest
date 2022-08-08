import React from 'react';
import {
    Channel,
    MessageList,
    MessageInput,
} from 'stream-chat-expo';
import { LogBox } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


export default ChannelScreen = (props) => {
    const { route } = props;
    const { params: { channel } } = route;
    const {bottom} = useSafeAreaInsets()
    return(
        <Channel channel={channel} >
            <MessageList />
            <MessageInput />
        </Channel>
    )
}
