import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useChatClient } from './useChatClient';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { 
  OverlayProvider,
  Chat,
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import Constants from '../../constants/constants';

// CHAT SCREEN
import ChannelListScreen from './ChannelList';
import ChannelScreen from './Channel';


const Stack = createStackNavigator();
const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);


export default ChatNavigator = ({navigation, route}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if(routeName === 'ChannelScreen'){
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  })
  const {clientIsReady} = useChatClient();  
  if(!clientIsReady){
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
        <Text>Loading chat ...</Text>
      </SafeAreaView>
    )
  }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="Messenger" component={ChannelListScreen} />
          <Stack.Screen 
            name="ChannelScreen" 
            component={ChannelScreen} 
          />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

