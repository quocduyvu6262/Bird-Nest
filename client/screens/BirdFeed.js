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
  Switch,
} from "react-native";

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

import { Icon } from "@rneui/themed";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import MainHeader from "../components/MainHeader.js";
import Constants from "../constants/constants.js";
import barackObama from "../assets/barackObama.jpeg";

const BirdFeed = ({ navigation }) => {
  const [transferList, setTransferList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);
  const [overlayClicked, setOverlayClicked] = useState(false);
  const [backgroundGrey, setBackgroundGrey] = useState(false);

  const [switchEnabledNeigh, setSwitchEnabledNeigh] = useState(false);
  const toggleSwitchNeigh = () =>
    setSwitchEnabledNeigh((previousState) => !previousState);

  const [switchEnabledSqua, setSwitchEnabledSqua] = useState(false);
  const toggleSwitchSqua = () =>
    setSwitchEnabledSqua((previousState) => !previousState);

  const [switchEnabledPri, setSwitchEnabledPri] = useState(false);
  const toggleSwitchPri = () =>
    setSwitchEnabledPri((previousState) => !previousState);

  const [switchEnabledIn, setSwitchEnabledIn] = useState(false);
  const toggleSwitchIn = () =>
    setSwitchEnabledIn((previousState) => !previousState);

  const [switchEnabledPer, setSwitchEnabledPer] = useState(false);
  const toggleSwitchPer = () =>
    setSwitchEnabledPer((previousState) => !previousState);

  const [switchEnabledRoo, setSwitchEnabledRoo] = useState(false);
  const toggleSwitchRoo = () =>
    setSwitchEnabledRoo((previousState) => !previousState);

  const [switchEnabledYes, setSwitchEnabledYes] = useState(false);
  const toggleSwitchYes = () =>
    setSwitchEnabledYes((previousState) => !previousState);

  const [switchEnabledNo, setSwitchEnabledNo] = useState(false);
  const toggleSwitchNo = () =>
    setSwitchEnabledNo((previousState) => !previousState);

  const [switchEnabledRec, setSwitchEnabledRec] = useState(false);
  const toggleSwitchRec = () =>
    setSwitchEnabledRec((previousState) => !previousState);

  const [switchEnabledApt, setSwitchEnabledApt] = useState(false);
  const toggleSwitchApt = () =>
    setSwitchEnabledApt((previousState) => !previousState);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const SingleSwitch = (props) => {
    return (
      <View style={styles.switchView}>
        <Switch
          trackColor={{ false: "%767577", true: "green" }}
          thumbColor={props.enabled ? "#white" : "white"}
          onValueChange={props.toggle}
          value={props.enabled}
        ></Switch>
        <Text style={styles.switchText}>
          <Text></Text>
          {props.variable}
        </Text>
      </View>
    );
  };
  // ----- LOGIC FOR VIEW USER BUTTONS -----

  const viewUsers = () => {
    setUserList([]);
    Axios.post(`${Constants.BASE_URL}/api/matching/`, {
      user_id: 10,
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
  };

  const overlayButton = () => {
    overlayClicked ? setOverlayClicked(false) : setOverlayClicked(true);
  };

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
        <TouchableOpacity
          style={[styles.input, { marginVertical: 7 }]}
          onPress={overlayButton}
        >
          <Icon3
            style={styles.input}
            name="options-sharp"
            size={30}
            color="black"
          />
        </TouchableOpacity>

        {overlayClicked && (
          <View style={styles.subContainer}>
            <ScrollView style={styles.filterCard}>
              <TouchableOpacity
                style={styles.filterHeader}
                onPress={overlayButton}
              >
                <Icon name="west" size={30} />
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>

              <SingleSwitch
                variable="Neighborhood"
                enabled={switchEnabledNeigh}
                toggle={toggleSwitchNeigh}
              />

              <SingleSwitch
                variable="Square Footage"
                enabled={switchEnabledSqua}
                toggle={toggleSwitchSqua}
              />

              <SingleSwitch
                variable="Price Range"
                enabled={switchEnabledPri}
                toggle={toggleSwitchPri}
              />

              <SingleSwitch
                variable="Indoor Parking"
                enabled={switchEnabledIn}
                toggle={toggleSwitchIn}
              />

              <SingleSwitch
                variable="Percent Matched"
                enabled={switchEnabledPer}
                toggle={toggleSwitchPer}
              />

              <SingleSwitch
                variable="# of Roommates"
                enabled={switchEnabledRoo}
                toggle={toggleSwitchRoo}
              />

              <SingleSwitch
                variable="Pecked Yes"
                enabled={switchEnabledYes}
                toggle={toggleSwitchYes}
              />

              <SingleSwitch
                variable="Pecked No"
                enabled={switchEnabledNo}
                toggle={toggleSwitchNo}
              />

              <SingleSwitch
                variable="Most Recent"
                enabled={switchEnabledRec}
                toggle={toggleSwitchRec}
              />
              <SingleSwitch
                variable="Apartment"
                enabled={switchEnabledApt}
                toggle={toggleSwitchApt}
              />
            </ScrollView>
          </View>
        )}

        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={userList}
              // data={UserData}
              renderItem={(item) => <ProfileCard item={item} />}
              extraData={userList}
              // extraData={UserData}
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
});
export default BirdFeed;
