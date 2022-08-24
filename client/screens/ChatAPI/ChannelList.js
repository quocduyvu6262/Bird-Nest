import React, { useState } from 'react';
import {
    ChannelList,
} from 'stream-chat-expo';
import Constants from '../../constants/constants';
import { Text, SafeAreaView, LogBox, StatusBar, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../../components/MainHeader';
import MessengerMatch from './MessengerMatch';
import {getChatUID} from '../../utils/helper';
import {Overlay} from 'react-native-elements';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Sending `onAnimatedValueUpdate` with no listeners registered.'
  ]);
  

export default ChannelListScreen = (props, navigation) => {
    /**
     * Declare state
     */
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.userInfo);
    const userID = getChatUID(user.fullname , user.uid);
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    
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
            <MessengerMatch setVisible={setVisible}/>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={styles.overlayContainer}>
                    <Text>Hello from Overlay!</Text>
                </View>
            </Overlay>
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

const styles = StyleSheet.create({
    overlayContainer:{
        height: "20%",
        width: 300
    }
})
