import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

const ProfileCard = ({ item }) => {
  // react-native-gesture-handler docs

  // const renderRightActions = () => {
  //   return (
  //     <View style={{ backgroundColor: "red", width: 100 }}>
  //       <Text>Hello</Text>
  //     </View>
  //   );
  // };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-20, -20],
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
        <TouchableOpacity style={styles.swipeButton}>
          <Text>No</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [20, 20],
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
          style={[styles.swipeButton, { backgroundColor: "green" }]}
        >
          <Text>Yes</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      friction={2}
      overshootFriction={4}
      containerStyle={{ overflow: "visible" }}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={item.item.src} />
        <View style={styles.text_box}>
          <Text>{item.item.city}</Text>
          <View style={styles.text_box_name}>
            <Text style={{ color: "white" }}>{item.item.name}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "90%",
    backgroundColor: "lightgray",
    // backgroundColor: "white",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 15,
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
    // backgroundColor: "lightgray",
    height: "90%",
    width: "70%",
    alignSelf: "flex-end",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    marginRight: 8,
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
  noButton: {
    height: 90,
    width: 70,
    backgroundColor: "lightgray",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 15,
    shadowOffset: { height: 20 },
    shadowOpacity: 0.5,
    shadowColor: "black",
    shadowRadius: 5,
    elevation: 5,
  },
  swipeButton: {
    backgroundColor: "red",
    height: "100%",
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default ProfileCard;
