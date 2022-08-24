import React, { useRef, useState, useCallback} from 'react';
import {
    ChannelList,
} from 'stream-chat-expo';
import Constants from '../../constants/constants';
import { Text, SafeAreaView, LogBox, StatusBar, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../../components/MainHeader';
import MessengerMatch from './MessengerMatch';
import {getChatUID} from '../../utils/helper';
import ChatOverlay from '../../components/Overlay/ChatOverlay';

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
        // for chat overlay
    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ["60%"];
    const handleSnapPress = useCallback(index => {
        sheetRef.current?.snapToIndex(index);
        setIsOpen(true);
    },[])

    const filters = {
        members: {
            '$in': [`${userID}`]
        }
    }
    const sort = {
        last_message_at: -1
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, opacity: isOpen ? 0.2 : 1}}>
                <MainHeader screen="Messenger Pigeon" navigation={navigation}/>
                <MessengerMatch sheetRef={sheetRef} setIsOpen={setIsOpen} handleSnapPress={handleSnapPress}/>
                <ChannelList
                    onSelect={(channel) => {
                        const { navigation } = props;
                        navigation.navigate('ChannelScreen', {channel});
                    }}
                    filters={filters}
                    sort={sort}
                />
            </View>
            {isOpen && <ChatOverlay sheetRef={sheetRef} snapPoints={snapPoints} setIsOpen={setIsOpen}/>}
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
