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
import Constants1 from "../constants/constants.js";
import Default from "../assets/default.jpg";
import { not } from "react-native-reanimated";
import moment from 'moment';

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
  let dates = user.notiDate;
  let notiLength = user.notiNames.length - 1;
  const updateUI = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/picName`, {
      user_id: user.id,
    })
      .then((response) => {
        console.log('rannn');
        let userData = response.data;
        let name = userData[0].fullname;
        let pic = userData[0].profilepic;
        if(pic == null) {
          pic = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"; //update to not require link
        }
        dispatch(dataActions.updateNotiNames(name));
        dispatch(dataActions.updateNotiPics(pic)); //need to load pic from firebase
        dispatch(dataActions.updateNotiUnread());
        var currentDate = moment().format("YYYYMMDD HHmmss");
        dispatch(dataActions.updateNotiDate(currentDate));
        dispatch(dataActions.updateSingleSeen());
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const insertToken = async (token) => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/token`, {
      user_id: user.id,
      token: token
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("NOTI: " + notification.request.content.title);
      updateUI();
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
      if(user.token == null) {
        dispatch(dataActions.updateToken(token));
        insertToken(token);
      }
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
  const seen = (count1) => {
    dispatch(dataActions.updateNotiSeen(count1));
  }
  let count = -1
  var notis = pics.map(function(image) {
   count = count + 1;
   let postDate = moment(dates[count]).fromNow()
    if(user.notiSeen[count] == false) {
      return (
        <View key = {count*5} style = {{borderBottomColor: "lightgray", padding: 10, borderBottomWidth: 0.8,}}>
          <View key={count} style = {{flexWrap: 'wrap', alignItems: 'center',justifyContent: 'flex-start', flexDirection: 'row'}}>
          <Image 
          style={{height: 60, 
          width: 60, 
          borderRadius: 40}}
          source={{uri: image}}
          >
          </Image>
          <Text  style = {{fontSize: 14, fontWeight: 'bold', marginLeft: 15}}>{names[count]}</Text>
          <Text style = {{fontSize: 14}}> is a match!</Text>
          <Text style={{ color: '#560CCE', fontWeight: 'bold', fontSize: 10, marginLeft: 30}}>NEW</Text>
          </View>
          <Text style={{ color: '#560CCE', fontWeight: 'bold', fontSize: 10, marginLeft: 75, marginTop: -15}}>{postDate}</Text>
        </View>
        
      )
    }
    else {
      return (
        <View key = {count*5} style = {{borderBottomColor: "lightgray", padding: 10, borderBottomWidth: 0.8,}}>
          <View key={count} style = {{flexWrap: 'wrap', alignItems: 'center',justifyContent: 'flex-start', flexDirection: 'row'}}>
            <Image 
            style={{height: 60, 
            width: 60, 
            borderRadius: 40}}
            source={{uri: image}}
            >
            </Image>
            <Text  style = {{fontSize: 14, fontWeight: 'bold', marginLeft: 15}}>{names[count]}</Text>
            <Text style = {{fontSize: 14}}> is a match!</Text>
          </View>
          <Text style={{ color: '#560CCE', fontWeight: 'bold', fontSize: 10, marginLeft: 75, marginTop: -15}}>{postDate}</Text>
        </View>
      )
    }
  });
   /*
   let temp = ['temp'];
   var render = temp.map(function(dummy) {
      dispatch(dataActions.updateNotiLength(count-1));
   });
   */
  if(names.length == 0 && pics.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <MainHeader screen="Chirp Notifications" navigation={navigation} />
        <View style = {{alignItems: 'center',justifyContent: 'flex-start'}}>
        <Image 
          style={{height: 150, 
          width: 150, marginTop: 120, opacity: 0.3}}
          source={require("../assets/bell.jpg")}
          ></Image>
          <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#560CCE'}}> No notifications found</Text>
          <Text style = {{fontSize: 15, color: '#5b5c5e', marginTop: 5}}> Match with users to recieve notications!</Text>
        </View>
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <MainHeader screen="Chirp Notifications" navigation={navigation} />
        <ScrollView>
        {notis}
        </ScrollView>
      </SafeAreaView>
    );
  }
};
//dispatch(dataActions.updateNotiSeen(0));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
});
export default ChirpNotification;

