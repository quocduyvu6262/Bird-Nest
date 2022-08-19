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
import { useSelector } from 'react-redux';
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

  const user = useSelector(state => state.data.userInfo);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const names = ['Jack Multani', 'Michael Jordan', 'Lebron James', 'Steph Curry'];
  const pics = ['file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/9F71E273-D05D-42D2-A516-FA71C0646702.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/1377BCF5-8FCC-4B8E-96B5-E8789F41E326.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/3438ACD6-C3D9-432F-8136-CF2BACE4019A.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/03E1E014-DC80-4968-BCAC-B2A1E692C9F8.jpg']

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
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
  
  async function schedulePushNotification(name) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Match found! 🙌",
        body: name + ' is a potential roommate.',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
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
      <Button title={"Open Notification"} onPress={async () => {
          await schedulePushNotification('Jack Multani');
        }} />
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
