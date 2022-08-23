import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
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
  id,
}) => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  //   console.log(id);

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
        return user.id !== id;
      })
    );
  };

  const handleStateChange = ({ nativeEvent }) => {
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
      setTimeout(removeCard, 100);
    } else if (nativeEvent.state === State.END && dest === SNAP_POINTS[0]) {
      console.log("Swiped Left");
      //   if (userList.length == 1) {
      //     return;
      //   }
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
          <View style={styles.text}>
            <Text>Rent</Text>
            <Text>Neighborhood</Text>
            <Text></Text>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // alignSelf: "center",
    backgroundColor: "red",
    height: 600,
    width: 350,
    top: 50,
    left: (Dimensions.get("window").width - 350) / 2,
    borderRadius: 15,
  },
  cardInfoWrapper: {
    height: 560,
    width: 300,
    backgroundColor: "white",
  },
  image: {
    height: 300,
    width: 300,
  },
});
export default PeckViewCard;
