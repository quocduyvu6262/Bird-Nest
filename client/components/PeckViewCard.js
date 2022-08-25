import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import barackObama from "../assets/barackObama.jpeg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  useAnimatedStyle,
  useSharedValue,
  concat,
  interpolate,
  interpolateNode,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  withDelay,
  withTiming,
  Easing,
} from "react-native-reanimated";

const snapPoint = (value, velocity, points) => {
  "worklet";
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};

const PeckViewCard = ({
  user,
  SNAP_POINTS,
  width,
  userList,
  setUserList,
  userID,
  id,
}) => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  console.log(user.info);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      positionX.value = translateX.value;
      positionY.value = translateY.value;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = positionX.value + translationX;
      translateY.value = positionY.value + translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      translateX.value,
      [-width / 2, width / 2],
      [-15, 15],
      { extrapolate: Extrapolate.CLAMP }
    );
    const opacity = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [0.8, 1, 0.8]
    );

    return {
      // StyleSheet.absoluteFillObject,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotateZ}deg` },
      ],
      opacity: opacity,
    };
  });

  //   const opacityStyles = useAnimatedStyle(() => {
  //       const opacity = interpolate(translateX.value, [0 , width/4], )
  //   })

  const removeCard = () => {
    setUserList(
      userList.filter((user) => {
        // return user.id !== id;
        return user.info.User_id !== id;
      })
    );
  };

  const swipeUserYes = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/insertYes`, {
      user_id: userID,
      swiped_id: item.item.info.User_id,
      // swiped_id: 345,
      // user_id: 98,
      // swiped_id: 7,
    })
      .then(async (response) => {
        let responseInfo = response.data;
        console.log("token 0: " + responseInfo[0].token);
        // console.log("token 1: " + responseInfo[1].token);
        // console.log("item.item.info.fullname: " + item.item.info.fullname);
        console.log("userName: " + userName);
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
            swiped_user: userName,
          }).catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const swipeUserNo = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/insertNo`, {
      user_id: userID,
      swiped_id: item.item.info.User_id,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStateChange = async ({ nativeEvent }) => {
    const dest = snapPoint(
      translateX.value,
      nativeEvent.velocityX,
      SNAP_POINTS
    );

    if (nativeEvent.state === State.END && dest === SNAP_POINTS[2]) {
      console.log("Swiped Right");
      //   if (profileList.length == 1) {
      //     return;
      //   }
      await swipeUserYes();
      setTimeout(removeCard, 100);
    } else if (nativeEvent.state === State.END && dest === SNAP_POINTS[0]) {
      console.log("Swiped Left");
      //   if (userList.length == 1) {
      //     return;
      //   }
      await swipeUserNo();
      setTimeout(removeCard, 100);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.container,
          animatedStyles,
        ]}
      >
        <View style={styles.cardInfoWrapper}>
          <Image source={barackObama} style={styles.image} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{user.info.fullname}</Text>
            <Text>(Age), (Gender)</Text>
          </View>
          <View style={styles.mainTextWrapper}>
            <View>
              <View style={styles.mainTextInfo}>
                <Text>{user.info.neighborhood}</Text>
              </View>
              <Text style={styles.mainTextHeader}>Neighborhood</Text>
            </View>
            <View>
              <View style={styles.mainTextInfo}>
                <Text>${user.info.rent}</Text>
              </View>
              <Text style={styles.mainTextHeader}>Rent</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              View {user.info.fullname}'s Profile{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 600,
    width: 350,
    top: 50,
    left: (Dimensions.get("window").width - 350) / 2,
    borderRadius: 15,
    borderColor: "#560CCE",
    borderWidth: 4,
  },
  cardInfoWrapper: {
    height: 560,
    width: 300,
    backgroundColor: "white",
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 15,
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#560CCE",
    borderBottomWidth: 2,
  },
  name: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 25,
    color: "#560CCE",
    marginRight: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  mainTextWrapper: {
    flex: 1,
    // backgroundColor: "blue",
    padding: 10,
  },
  mainTextInfo: {
    borderBottomColor: "#560CCE",
    borderBottomWidth: 1,
    // alignSelf: "center",
  },
  mainTextHeader: {
    color: "gray",
  },
  button: {
    backgroundColor: "#560CCE",
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
    width: 280,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
export default PeckViewCard;
