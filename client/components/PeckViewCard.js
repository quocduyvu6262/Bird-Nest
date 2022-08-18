import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  GestureDetector,
  PanGestureHandler,
  State,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const aspectRatio = 722 / 368;
const CARD_WIDTH = width - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const side = (width + CARD_WIDTH + 100) / 2;
const SNAP_POINTS = [-side, 0, side];

const snapPoint = (value, velocity, points) => {
  "worklet";
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};

const PeckViewCard = ({ user, index, listState }) => {
  const x = useSharedValue(0);
  const y = useSharedValue(-height - 200);
  const theta = Math.random() * 20 - 10;
  const rotateZ = useSharedValue(Math.random() * 20 - 10);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (listState) {
      const delay = 1000 + index * DURATION;
      y.value = withDelay(
        delay,
        withTiming(0, {
          duration: DURATION,
          easing: Easing.inOut(Easing.ease),
        })
      );
      rotateZ.value = withDelay(
        delay,
        withTiming(theta, {
          duration: DURATION,
          easing: Easing.inOut(Easing.ease),
        })
      );
    }
  }, [listState]);

  const onGestureEvent = useAnimatedGestureHandler({
    // get context info of object so card remembers position
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
      scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
      rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX;
      y.value = ctx.y + translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
      opacity.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      });
      x.value = withSpring(dest, { velocity: velocityX });
      y.value = withSpring(0, { velocity: velocityY });
      scale.value = withTiming(1, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      });
    },
  });

  const Animated_Style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 3000 },
      { rotateX: "30deg" },
      { rotateZ: `${rotateZ.value}deg` },
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  const Animated_Opacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleStateChange = ({ nativeEvent }) => {
    const dest = snapPoint(x.value, nativeEvent.velocityX, SNAP_POINTS);
    if (nativeEvent.state === State.END && dest === SNAP_POINTS[2]) {
      console.log("Yes");
      // setHidden(true);
      opacity.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (nativeEvent.state === State.END && dest === SNAP_POINTS[1]) {
      console.log("No");
      // setHidden(true);
      opacity.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      });
    }
  };

  return (
    <View
      style={Peck_View_Styles.container}
      // { display: hidden ? "none" : "flex" },
      pointerEvents="box-none"
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View style={[Peck_View_Styles.card, Animated_Style]}>
          <View style={Peck_View_Styles.cardFlourish}>
            <View style={Peck_View_Styles.cardFlourish2}>
              <View style={Peck_View_Styles.cardContent}>
                <Image
                  source={user.src}
                  style={Peck_View_Styles.image}
                  resizeMode="cover"
                />
                <Text style={Peck_View_Styles.text}>{user.name}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const Peck_View_Styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // position: "absolute",
    // ------ CLEAN UP THIS POSITIONING ---------
    // top: "25%",
    // left: "15%",
    justifyContent: "center",
    alignItems: "center",
    // height: 500,
    // width: 300,
  },
  card: {
    backgroundColor: "#560CCE",
    borderRadius: 10,
    // width: 300,
    // height: 500,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  cardFlourish: {
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
    height: "98%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  cardFlourish2: {
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
    height: "98%",
    backgroundColor: "#560CCE",
    borderRadius: 10,
  },
  cardContent: {
    width: "98%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    borderRadius: 15,
    marginTop: 15,
  },
  text: {
    marginTop: 20,
    backgroundColor: "white",
  },
});

export default PeckViewCard;
