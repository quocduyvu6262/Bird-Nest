import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProfileCard from "../components/ProfileCard";
import { IconButton } from "react-native-paper";
import Axios from "axios";
import Constants from "../constants/constants";
import MainHeader from "../components/MainHeader";
import barackObama from "../assets/barackObama.jpeg";
import { useSelector } from "react-redux";

const History = ({ navigation }) => {
  const user = useSelector((state) => state.data.userInfo);
  const [userListYes, setUserListYes] = useState([]);
  const [userListNo, setUserListNo] = useState([]);
  const [listState, setListState] = useState(false);

  const [peckedClicked, setPeckedClicked] = useState(true);

  const PeckedNoButton = () => {
    setPeckedClicked(false);
  };
  const PeckedYesButton = () => {
    setPeckedClicked(true);
  };

  //methods
  const goBack = () => {
    navigation.goBack();
  };
  // view history
  const viewUsersYes = async () => {
    let userListYes = [];
    Axios.post(`${await Constants.BASE_URL()}/api/history/yes`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length; i++) {
          userListYes.push({
            info: userData[i],
            src: barackObama,
          });
        }
        setUserListYes(userListYes);
        setListState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewUsersNo = async () => {
    let userListNo = [];
    Axios.post(`${await Constants.BASE_URL()}/api/history/no`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length; i++) {
          userListNo.push({
            info: userData[i],
            src: barackObama,
          });
        }
        setUserListNo(userListNo);
        setListState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewUsersYes();
    // viewUsersNo();
  }, []);

  const PeckYes = (props) => {
    return (
      <View>
        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={props.data}
              renderItem={(item) => {
                return(
                  <ProfileCard item={item} />
                )
              }}
              extraData={props.extraData}
              // extraData={UserData}
            />
          </View>
        )}
      </View>
    );
  };

  const PeckNo = (props) => {
    return (
      <View>
        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={props.data}
              // data={UserData}
              renderItem={(item) => <ProfileCard item={item} />}
              extraData={props.extraData}
              // extraData={UserData}
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="History" navigation={navigation} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Button
            color={!peckedClicked ? "#560CCE" : "black"}
            onPress={PeckedNoButton}
            style={
              !peckedClicked && {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
              }
            }
          >
            {" "}
            Pecked No{" "}
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            color={peckedClicked ? "#560CCE" : "black"}
            onPress={PeckedYesButton}
            style={
              peckedClicked && {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
              }
            }
          >
            {" "}
            Pecked Yes{" "}
          </Button>
        </TouchableOpacity>
      </View>

      {!peckedClicked && <PeckNo data={userListNo}/>}
      {peckedClicked && <PeckYes data={userListYes}/>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlist: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  subContainer: {
    padding: 10,
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
});
export default History;
