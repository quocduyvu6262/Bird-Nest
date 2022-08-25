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
import React, { useEffect, useRef, useState } from "react";
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
import { roleImagesIndex } from "../assets/roleImagesIndex";
import { storage, ref, deleteObject, getDownloadURL } from "../firebaseConfig";

const ProfileCard = ({ item, index, userID, userName }) => {
  const opacityTransition = useRef(new Animated.Value(0)).current;
  const translation = useRef(
    new Animated.ValueXY({
      x: item.index % 2 == 0 ? -200 : 200,
      y: -400,
    })
  ).current;
  const [avatar, setAvatar] = useState(null);

  const retrieveImage = async (path) => {
    if (path) {
      const reference = ref(storage, path);
      const url = await getDownloadURL(reference).catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn’t exist
            break;
          case "storage/unauthorized":
            // User doesn’t have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
      return url;
    }
  };

  const getAvatar = async () => {
    setAvatar(await retrieveImage(item.item.info.profilepic));
  };

  const swipeUserYes = async () => {
    Axios.post(`${await Constants1.BASE_URL()}/api/history/insertYes`, {
      // user_id: userID,
      // swiped_id: item.item.info.User_id,
      user_id: 345,
      swiped_id: 98,
      // swiped_id: 7,
    })
      .then(async (response) => {
        let responseInfo = response.data;
        console.log("token 0: " + responseInfo[0].token);

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
          <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
            Yes
          </Text>
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
          onPress={swipeUserNo}
          style={[styles.swipeButton, { backgroundColor: "#FE002E" }]}
        >
          <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
            No
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  useEffect(() => {
    getAvatar();
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
        <Image
          style={styles.image}
          source={
            avatar
              ? { uri: avatar }
              : {
                  uri: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
                }
          }
        />
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
            {item.item.info.neighborhood.length <= 2
              ? item.item.info.neighborhood.map((neighborhood, index) => {
                  if (index === 0 && item.item.info.neighborhood.length == 2) {
                    return `${neighborhood}, `;
                  } else {
                    return `${neighborhood} `;
                  }
                })
              : item.item.info.neighborhood.map((neighborhood, index) => {
                  if (index <= 1) {
                    return `${neighborhood}, `;
                  } else if (index === 2) {
                    return `etc.`;
                  }
                })}
          </Text>
          <View style={styles.barGroup}>
            <Text>Rent is ${item.item.info.rent}</Text>
            <Text style={styles.bar}> | </Text>
            <Text>{item.item.info.lease} months term</Text>
          </View>
          <Text>{item.item.info.squarefeet}sq ft</Text>
          <View style={styles.matchedInterestsBox}>
            <Text style={{ fontSize: 30, marginRight: 5 }}>
              {item.item.count}
            </Text>
            <View>
              <Text style={{ fontSize: 11 }}>matched</Text>
              <Text style={{ fontSize: 11 }}>interests!</Text>
            </View>
          </View>
          <View style={styles.roleImage}>
            <Image
              style={{ height: 50, width: 50 }}
              source={roleImagesIndex[item.item.info.role]}
              // source={roleImagesIndex["Flamingo"]}
            />
          </View>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  text_box: {
    height: "100%",
    width: "75%",
    alignSelf: "flex-end",
  },
  text_box_name: {
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 10,
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
    height: 130,
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
    backgroundColor: "#54BF22",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },
  matchedInterestsBox: {
    position: "absolute",
    top: 0,
    right: 0,
    // backgroundColor: "red",
    alignItems: "center",
    flexDirection: "row",
  },
  roleImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    // backgroundColor: "red",
    height: 50,
    width: 50,
    marginRight: 5,
  },
});

export default ProfileCard;
