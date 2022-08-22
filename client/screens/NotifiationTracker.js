import Axios from "axios";
import Constants1 from "../constants/constants.js";
import Default from "../assets/default.jpg";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as dataActions from '../redux/slices/data';
import * as Device from 'expo-device';
import React, {useEffect, useState, useRef} from "react";

const NotificationTracker = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      const [expoPushToken, setExpoPushToken] = useState('');
      const [notification, setNotification] = useState(false);
      const notificationListener = useRef();
      const responseListener = useRef();

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
          console.log("RAN");
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
            console.log("shouldn't run");
            dispatch(dataActions.updateToken(token));
            insertToken(token);
          }
          console.log(token);
          console.log(registered);
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
}
export default NotificationTracker;