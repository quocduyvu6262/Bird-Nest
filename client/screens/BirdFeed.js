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
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Bird_Drawing from "../assets/svg/Bird_Drawing.js";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import ViewUsers from "../components/buttons/ViewUsers.js";
import AppLoading from "expo-app-loading";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import MainHeader from "../components/MainHeader.js";
import Constants from "../constants/constants.js";
import barackObama from "../assets/barackObama.jpeg";
import { useChatClient } from "./ChatAPI/useChatClient.js";
import FilterOverlay from "../components/FilterOverlay.js";
// Old Imports for filter
// import { Icon } from "@rneui/themed";
// import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";


const BirdFeed = ({ navigation }) => {

  /**
   * Redux Hook
   */
  const user = useSelector((state) => state.data.userInfo);
  const housing = useSelector((state) => state.data.housing);

  /**
   * Declare State
   */
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);
  const [overlayFilterClicked, setOverlayFilterClicked] = useState(false);
  let [fontsLoaded] = useFonts( {Pacifico_400Regular} );

  /**
   * Check whether Filter Button is clicked
   * @returns whether Filter Button is clicked
   */
  const overlayFilterButton = () => {
    overlayFilterClicked ?
      setOverlayFilterClicked(false) :
      setOverlayFilterClicked(true);
  };

  /**
   * Call the matching algorithm and display
   * the list of users that match each criteria
   */
  const viewUsers = async () => {
    //setUserList([]);
    let userList = [];
    let apiEndpoint;
    if(user.role === 'Flamingo' || user.role === 'Owl'){
      apiEndpoint = '/api/matching/lookingfornohousing';
    } else {
      apiEndpoint = '/api/matching/lookingforhousing'
    }
    Axios.post(`${await Constants.BASE_URL()}${apiEndpoint}`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
            name: userData[i].fullname,
            city: userData[i].city,
            src: barackObama,
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
            src: barackObama,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    setListState(true);
    console.log(userList);
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
        {overlayFilterClicked && (
          <FilterOverlay setUserList={setUserList} setListState={setListState} overlayFilterButton={overlayFilterButton}/>
        )}


        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={userList}
              renderItem={(item) => <ProfileCard item={item} />}
              extraData={userList}
            />
          </View>
        )}
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
});
export default BirdFeed;
