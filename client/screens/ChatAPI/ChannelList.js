import React from 'react';
import {
    ChannelList,
} from 'stream-chat-expo';
import Constants from '../../constants/constants';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';




export default ChannelListScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.userInfo);
    const displayName = user.fullname;
    const trimName = displayName.replace(/\s/g, '');
    const userID = `${trimName}_${user.uid}`
    
    const filters = {
        members: {
            '$in': [`${userID}`]
        }
    }
    const sort = {
        last_message_at: -1
    }
    return(
        <ChannelList
            onSelect={(channel) => {
                const { navigation } = props;
                navigation.navigate('ChannelScreen', {channel});
            }}
            filters={filters}
            sort={sort}
        />
    )
}

