import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
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
      // inputRange: [0, 50, 100, 101],
      // outputRange: [-20, 0, 0, 1],
      inputRange: [0, 100],
      outputRange: [-100, 0],
      // inputRange: [-300, -100, 0, 100, 101],
      // outputRange: [300, 0, 1, 0, 0],
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
        <Text>No</Text>
      </Animated.View>
      // <RectButton style={styles.leftAction}>
      //   <Animated.Text
      //     style={[
      //       styles.actionText,
      //       {
      //         transform: [{ translateX: trans }],
      //       },
      //     ]}
      //   >
      //     Archive
      //   </Animated.Text>
      // </RectButton>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
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
  noButton: {
    backgroundColor: "red",
  },
});

export default ProfileCard;
