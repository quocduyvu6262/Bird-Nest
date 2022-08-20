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
import * as dataActions from '../redux/slices/data';
import Axios from "axios";
import Constants from "../constants/constants.js";

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
  let names = user.notiNames;
  let pics = user.notiPics;

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      dispatch(dataActions.updateNotiNames('Bird'));
      dispatch(dataActions.updateNotiPics('file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/A5F74F76-BBF4-4F94-9345-8B037E90C7F3.jpg'));
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
