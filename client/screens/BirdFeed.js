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

import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import ViewUsers from "../components/buttons/ViewUsers.js";
import AppLoading from "expo-app-loading";

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
const BirdFeed = ({ navigation }) => {
  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);
  const [ageState, setAgeState] = useState(0);
  // This is the old filter function on birdfeed

  const overlayButton = () => {
    overlayClicked ? setOverlayClicked(false) : setOverlayClicked(true);
  };

  const age = 18;
  const minAge = 18;
  const maxAge = 99;
  const ageIncrement = 1;
  const ageName = "Age";
  
  const handlerAgeChange = (ageSlide) => {
    age.value = ageSlide;
    setAgeState({value:age.value});
  }
  const [gender, setGender] = useState("");
  const [pet, setPet] = useState(false);
  const [drugs, setDrugs] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [guest, setGuest] = useState(false);
  const [clean, setClean] = useState(false);
  const [temp, setTemp] = useState(false);
  const [sound, setSound] = useState(false);
  const [awake, setAwake] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [interaction, setInteraction] = useState(false);


  const [overlayClicked, setOverlayClicked] = useState(false);

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

  // const SingleSwitch = (props) => {
  //   return (
  //     <View style={styles.switchView}>
  //       <Switch
  //         trackColor={{ false: "%767577", true: "green" }}
  //         thumbColor={props.enabled ? "#white" : "white"}
  //         onValueChange={props.toggle}
  //         value={props.enabled}
  //       />
  //       <Text style={styles.switchText}>
  //         <Text></Text>
  //           {props.variable}
  //       </Text>
  //     </View>
  //   );
  // };

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  // ----- LOGIC FOR VIEW USER BUTTONS -----

  const viewUsers = () => {
    setUserList([]);
    Axios.post(`${Constants.BASE_URL}/api/matching/`, {
      user_id: 78,
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
          <FilterOverlay setOverlayClicked={setOverlayClicked} 
          overlayClicked={overlayClicked}
          overlayButton={overlayButton}
          
          age={age}
          min={minAge}
          max={maxAge}
          step={ageIncrement}
          handler={handlerAgeChange}
          sliderText={ageName}

          switchEnabledSqua={switchEnabledSqua}
          toggleSwitchSqua={toggleSwitchSqua}

          switchEnabledPri={switchEnabledPri}
          toggleSwitchPri={toggleSwitchPri}

          switchEnabledIn={switchEnabledIn}
          toggleSwitchIn={toggleSwitchIn}

          switchEnabledPer={switchEnabledPer}
          toggleSwitchPer={toggleSwitchPer}

          switchEnabledRoo={switchEnabledRoo}
          toggleSwitchRoo={toggleSwitchRoo}

          switchEnabledYes={switchEnabledYes}
          toggleSwitchYes={toggleSwitchYes}

          switchEnabledNo={switchEnabledNo}
          toggleSwitchNo={toggleSwitchNo}

          switchEnabledRec={switchEnabledRec}
          toggleSwitchRec={toggleSwitchRec}

          switchEnabledApt={switchEnabledApt}
          toggleSwitchApt={toggleSwitchApt}
          />
        )}
        
        {/* Old filter on birdfeed
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
        )} */}

        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={userList}
              // data={UserData}
              renderItem={ProfileCard}
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
