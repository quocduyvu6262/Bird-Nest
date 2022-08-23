import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import Constants from '../../constants/constants';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {getChatUID} from '../../utils/getChatUID';

const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);

export const useChatClient = () => {
    const user = useSelector(state => state.data.userInfo);
    const [clientIsReady, setClientIsReady] = useState(false);
    const userID = getChatUID(user.fullname, user.uid);
    useEffect(() => {
        const setupClient = async () => {
            try {
                axios.post(`${await Constants.BASE_URL()}/api/chat`,{
                    uid: userID
                }).then(async result => {
                    await chatClient.connectUser({
                        id: userID,
                        name: user.fullname
                    }, result.data);
                    setClientIsReady(true);
                })
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`An error occurred while connecting the user: ${error.message}`)
                }
            }
        }
        
        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        if (!chatClient.userID) {
            setupClient();
        }

    }, []);
    return {
        clientIsReady,
    }
}
