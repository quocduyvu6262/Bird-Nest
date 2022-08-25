import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { BounceIn } from "react-native-reanimated";
import Axios from "axios";
import Constants1 from "../constants/constants.js";
// import { useSelector, useDispatch } from "react-redux";

const ProfileCard = ({ item, index, userID, userName }) => {
  const opacityTransition = useRef(new Animated.Value(0)).current;
  const translation = useRef(
    new Animated.ValueXY({
      x: item.index % 2 == 0 ? -200 : 200,
      y: -400,
    })
  ).current;
  // const user = useSelector((state) => state.data.userInfo);

  // console.log(item.item.info.id);
  // console.log(userID);
  // console.log(item.item.info.User_id);

  const swipeUserYes = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/insertYes`, {
      // user_id: item.item.info.User_id,
      user_id: 98,
      // swiped_id: userID,
      swiped_id: 345,
      // user_id: 98,
      // swiped_id: 7,
    })
      .then(async (response) => {
        let responseInfo = response.data;
        if (responseInfo.length === 2) {
          Axios.post(`${await Constants1.BASE_URL()}/api/notifications/match`, {
            pushTokens: [responseInfo[0].token, responseInfo[1].token],
            phone_user: userName,
            swiped_user: item.item.info.fullname,
          })
            .then()
            .catch((error) => {
              console.log(error);
            });
        } else if (responseInfo.length === 1) {
          Axios.post(`${await Constants1.BASE_URL()}/api/notifications/swipe`, {
            pushTokens: responseInfo[0].token,
            swiped_user: item.item.info.fullname,
          }).catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 0],
    });
    return (
      <Animated.View
        style={[
          styles.noButton,
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <TouchableOpacity onPress={swipeUserYes} style={styles.swipeButton}>
          <Text>Yes</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 0],
    });
    return (
      <Animated.View
        style={[
          styles.noButton,
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.swipeButton, { backgroundColor: "red" }]}
        >
          <Text>No</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityTransition, {
        toValue: 1,
        delay: 200 * item.index + 200,
        useNativeDriver: true,
      }),
      Animated.timing(translation.x, {
        toValue: 0,
        duration: 800 * item.index + 200,
        useNativeDriver: true,
        easing: Easing.easing,
      }),
      Animated.timing(translation.y, {
        toValue: 0,
        duration: 400 * item.index + 200,
        useNativeDriver: true,
        easing: Easing.easing,
      }),
    ]).start();
  }, []);

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={2}
      overshootFriction={4}
      containerStyle={{ overflow: "visible" }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityTransition,
            transform: [
              { translateX: translation.x },
              { translateY: translation.y },
            ],
          },
        ]}
      >
        <Image style={styles.image} source={item.item.src} />
        <View style={styles.text_box}>
          <View style={styles.text_box_name}>
            <Text
              style={{ color: "#560CCE", fontWeight: "bold", fontSize: 20 }}
            >
              {item.item.info.fullname}
            </Text>
            <Text style={{ color: "gray" }}>
              {item.item.info.gender}, {item.item.info.pronouns},{" "}
              {item.item.info.age}{" "}
            </Text>
          </View>
          <Text>
            {/* {item.item.info.neighborhood.map(
              (neighborhood, index) => `${neighborhood}, `
            )} */}
            {item.item.info.neighborhood}
          </Text>
          <View style={styles.barGroup}>
            <Text>Rent is ${item.item.info.rent}</Text>
            <Text style={styles.bar}> | </Text>
            <Text>{item.item.info.lease} months term</Text>
          </View>
          <Text>{item.item.info.squarefeet}</Text>
          <Text>{item.item.info.parking}</Text>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    // backgroundColor: "lightgray",
    backgroundColor: "white",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    // marginLeft: 15,
  },
  text_box: {
    // backgroundColor: "gray",
    // backgroundColor: "lightgray",
    height: "100%",
    width: "75%",
    alignSelf: "flex-end",
    // padding: 10,
    // marginRight: 8,
  },
  text_box_name: {
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 10,
    // flexDirection: "row",
    // alignItems: "flex-end",
  },
  barGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bar: {
    fontWeight: "bold",
    color: "#560CCE",
  },
  noButton: {
    height: 100,
    width: 80,
    backgroundColor: "lightgray",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  swipeButton: {
    backgroundColor: "green",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default ProfileCard;
