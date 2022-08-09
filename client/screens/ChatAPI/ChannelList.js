import React from 'react';
import {
    ChannelList,
} from 'stream-chat-expo';
import Constants from '../../constants/constants';
import { Text, SafeAreaView, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../../components/MainHeader';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Sending `onAnimatedValueUpdate` with no listeners registered.'
  ]);
  

export default ChannelListScreen = (props, navigation) => {
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
        <SafeAreaView style = {{flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, backgroundColor: "white",}}>
            <MainHeader screen="Messenger Pigeon" navigation={navigation} />
            <ChannelList
                onSelect={(channel) => {
                    const { navigation } = props;
                    navigation.navigate('ChannelScreen', {channel});
                }}
                filters={filters}
                sort={sort}
        />
        </SafeAreaView>
    )
}

