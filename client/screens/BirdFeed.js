import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  RefreshControlBase,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Bird_Drawing from "../assets/svg/Bird_Drawing.js";
import React, { useEffect, useState, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import moment from "moment";
import Axios from "axios";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import * as dataActions from "../redux/slices/data";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import ViewUsers from "../components/buttons/ViewUsers.js";
import AppLoading from "expo-app-loading";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Buttons from "../components/Button.js";

import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import MainHeader from "../components/MainHeader.js";
import Constants from "../constants/constants.js";
import barackObama from "../assets/barackObama.jpeg";
import FilterOverlay from "../components/FilterOverlay.js";
// Old Imports for filter
// import { Icon } from "@rneui/themed";
// import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { storage, ref, getDownloadURL } from "../firebaseConfig";
import Constants1 from "../constants/constants.js";

const BirdFeed = ({ navigation }) => {
  /**
   * Notification setup
   */
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const retrieveImage = async (path) => {
    if (path) {
      const reference = ref(storage, path);
      const url = await getDownloadURL(reference);
      return url;
    }
  };

  /**
   * Redux Hook
   */
  const user = useSelector((state) => state.data.userInfo);
  const housing = useSelector((state) => state.data.housing);
  const notificationListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();
  let names = user.notiNames;
  let pics = user.notiPics;
  let dates = user.notiDate;
  let notiLength = user.notiNames.length - 1;
  const dispatch = useDispatch();

  /**
   * Declare State
   */
  const [rentText, setRentText] = useState("");
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);
  const [overlayFilterClicked, setOverlayFilterClicked] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  let [fontsLoaded] = useFonts({ Pacifico_400Regular });

  /**
   * Check whether Filter Button is clicked
   * @returns whether Filter Button is clicked
   */
  const overlayFilterButton = () => {
    overlayFilterClicked
      ? setOverlayFilterClicked(false)
      : setOverlayFilterClicked(true);
  };
  // This is the old filter function on birdfeed
  const updateMatchUI = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/picName1`, {
      user_id: user.id,
    })
      .then(async (response) => {
        let userData = response.data;
        let name = userData[0].fullname;
        let pic = userData[0].profilepic;
        if (pic == null) {
          pic =
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"; //update to not require link
        } else {
          pic = await retrieveImage(pic);
        }
        dispatch(dataActions.updateNotiNames(name));
        dispatch(dataActions.updateNotiPics(pic));
        dispatch(dataActions.updateNotiUnread());
        var currentDate = moment().format("YYYYMMDD HHmmss");
        dispatch(dataActions.updateNotiDate(currentDate));
        dispatch(dataActions.updateIsMatch());
        dispatch(dataActions.updateSingleSeen());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateSwipeUI = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/picName2`, {
      user_id: user.id,
    })
      .then(async (response) => {
        let userData = response.data;
        let name = userData[0].fullname;
        let pic = userData[0].profilepic;
        if (pic == null) {
          pic =
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"; //update to not require link
        } else {
          pic = await retrieveImage(pic);
        }
        dispatch(dataActions.updateNotiNames(name));
        dispatch(dataActions.updateNotiPics(pic));
        dispatch(dataActions.updateNotiUnread());
        var currentDate = moment().format("YYYYMMDD HHmmss");
        dispatch(dataActions.updateNotiDate(currentDate));
        dispatch(dataActions.updateIsNotMatch());
        dispatch(dataActions.updateSingleSeen());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const insertToken = async (token) => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/token`, {
      user_id: user.id,
      token: token,
    });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (notification.request.content.title == "Swiped!") {
          console.log("HELLO");
          updateSwipeUI();
        } else {
          updateMatchUI();
        }
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      if (user.token == null) {
        dispatch(dataActions.updateToken(token));
        insertToken(token);
      }
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  const overlayButton = () => {
    overlayClicked ? setOverlayClicked(false) : setOverlayClicked(true);
  };

  /**
   * Call the matching algorithm and display
   * the list of users that match each criteria
   */
  const viewUsers = async () => {
    let userList = [];
    let apiEndpoint;
    if (user.role === "Flamingo" || user.role === "Owl") {
      apiEndpoint = "/api/matching/lookingfornohousing";
    } else {
      apiEndpoint = "/api/matching/lookingforhousing";
    }
    Axios.post(`${await Constants1.BASE_URL()}${apiEndpoint}`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        //console.log(userData);
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
            info: userData[i].info,
            // name: userData[i].info.fullname,
            // rent: userData[i].info.rent,
            src: barackObama,
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            info: userData[userData.length - 1].info,
            // name: userData[userData.length - 1].info.fullname,
            src: barackObama,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    setListState(true);
    //console.log("BIRDFEED USERLIST");
    //console.log(userList);
  };

  /**
   * Use effect Hook
   */
  useEffect(() => {
    viewUsers();
  }, []);

  // ---------------------------------------

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      // Header - Beginning
      <SafeAreaView style={styles.container}>
        <MainHeader screen="Bird Feed" navigation={navigation} />
        <View
          style={[
            styles.svg,
            { transform: [{ translateY: 20 }, { translateX: 100 }] },
          ]}
        >
          <Bird_Drawing />
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.input, { marginVertical: 7 }]}
            onPress={overlayFilterButton}
          >
            <Icon3
              style={styles.input}
              name="options-sharp"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <Buttons style={{ flex: 0.5 }} onPress={viewUsers}>
            Clear Filters
          </Buttons>
        </View>
        {overlayFilterClicked && (
          <FilterOverlay
            setUserList={setUserList}
            setListState={setListState}
            overlayFilterButton={overlayFilterButton}
          />
        )}

        <View style={{ flex: 1 }}>
          {listState && (
            <FlatList
              data={userList}
              extraData={userList}
              style={{ height: "100%" }}
              renderItem={(item) => (
                <TouchableOpacity>
                  <ProfileCard item={item} userID={user.id} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  input: {
    marginLeft: 4,
    alignSelf: "flex-start",
    flexDirection: "row",
    color: "black",
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 7,
    color: "#219EBC",
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
  },
  headerButtonView: {
    flexDirection: "row",
  },
  headerButtons: {
    marginRight: 15,
    alignSelf: "center",
    padding: 10,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#219EBC",
  },
  overlay: {
    position: "absolute",
    zIndex: 2,
  },
  filterHeader: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "42%",
    justifyContent: "space-between",
  },
  filterText: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Pacifico_400Regular",
    color: "#560CCE",
  },
  filterCard: {
    backgroundColor: "white",
    marginTop: 100,
    position: "absolute",
    zIndex: 2,
    alignSelf: "auto",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 15,
    width: "100%",
    height: 450,
  },
  switchView: {
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    fontSize: 20,
  },
  subContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "120%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  svg: {
    position: "absolute",
    zIndex: 5,
    // top: 100,
    // left: 200,
  },
  clearFilterButton: {},
});
export default BirdFeed;
