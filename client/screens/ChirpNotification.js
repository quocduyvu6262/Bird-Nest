import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Button,
  Image,
  
} from "react-native";
import React, {useEffect, useState, useRef} from "react";
import * as Device from 'expo-device';
import Footer from "../components/Footer.js";
import MainHeader from "../components/MainHeader.js";
import Bird_Drawing from "../assets/svg/Bird_Drawing";
//import Constants from "../constants/constants.js";
import Constants from 'expo-constants';
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const ChirpNotification = ({ navigation }) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [test, setTest] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const user = useSelector(state => state.data.userInfo);
  const dispatch = useDispatch();
  let names = ['Jack Multani', 'Michael Jordan', 'Lebron James', 'Steph Curry'];
  let pics = ['file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/3A9B8F43-006A-47CF-AE34-990959BC590D.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/0A6C8202-8AE8-4A7B-8460-6A113F1CA43E.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/EEFD7E73-1A06-4B90-9280-DAAB6B26521F.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/6B96B2F8-6044-4C3C-A2A5-38201C32480D.jpg']

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      names.push("Bird");
      pics.push("file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/7B3C18C3-9ED8-4DBE-B65A-9D7BE3FD3D93.jpg");
      
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  let count = -1;
  var notis = pics.map(function(image) {
    count = count + 1;
    console.log(names);
      return (
        <View key={image} style = {{alignItems: 'center',justifyContent: 'flex-start', flexDirection: 'row', borderBottomColor: "lightgray", padding: 10, borderBottomWidth: 0.8,}}>
          <Image 
          style={{height: 60, 
          width: 60, 
          borderRadius: 40}}
          source={{uri: image}}
          >
          </Image>
          <Text style = {{fontSize: 14, fontWeight: 'bold', marginLeft: 15}}>{names[count]}</Text>
          <Text style = {{fontSize: 14}}> is a match!</Text>
        </View>
      )
   });

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Chirp Notifications" navigation={navigation} />
      <ScrollView>
      {notis}
        </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
});
export default ChirpNotification;
