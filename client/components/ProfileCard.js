import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const ProfileCard = ({ item }) => {
  // react-native-gesture-handler docs

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
      // backgroundColor: isPressed.value ? "yellow" : "blue",
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <Image style={styles.image} source={item.item.src} />
        <View style={styles.text_box}>
          <Text>{item.item.city}</Text>
          <View style={styles.text_box_name}>
            <Text style={{ color: "white" }}>{item.item.name}</Text>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "90%",
    backgroundColor: "lightgray",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
    shadowOffset: { height: 20 },
    shadowOpacity: 0.5,
    shadowColor: "black",
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    // marginLeft: 15,
  },
  text_box: {
    backgroundColor: "white",
    height: "90%",
    width: "70%",
    alignSelf: "flex-end",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    marginRight: 8,
    borderBottomWidth: 2,
  },
  text_box_name: {
    position: "absolute",
    bottom: 0,
    left: 15,
    backgroundColor: "#560CCE",
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default ProfileCard;
