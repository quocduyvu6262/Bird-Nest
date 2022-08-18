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
import {useSelector} from "react-redux"

const History = ({ navigation }) => {
  const user = useSelector(state => state.data.userInfo);
  const [userListYes, setUserListYes] = useState([]);
  const [userListNo, setUserListNo] = useState([]);
  const [listState, setListState] = useState(false);
 
  const [peckedClicked, setPeckedClicked] = useState(false);

  const PeckedNo = () => {
    setPeckedClicked(false);
  };
  const PeckedYes = () => {
    setPeckedClicked(true);
  };

  //methods
  const goBack = () => {
    navigation.goBack();
  };
  // view history
  const viewUsersYes = async () => {
    setUserListYes([]);
    Axios.post(`${await Constants.BASE_URL()}/api/history/yes`, {
      user_id: user.id,
    })
      .then((response) => {
        console.log(response.data)
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userListYes.push({
            name: userData[i].fullname,
            city: userData[i].city,
            src: barackObama,
          });
        }
        setUserListYes((prevList) => [
          ...userListYes,
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
  const viewUsersNo = async () => {
    setUserListNo([]);
    Axios.post(`${await Constants.BASE_URL()}/api/history/no`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userListNo.push({
            name: userData[i].fullname,
            city: userData[i].city,
            src: barackObama,
          });
        }
        setUserListNo((prevList) => [
          ...userListNo,
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
    viewUsersYes();
    viewUsersNo();
  }, []);

  const PeckYes = (props) => {
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
    )
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="History" navigation={navigation} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
        <Button
          color={!peckedClicked ? "#560CCE" : "black"}
          onPress={PeckedNo}
          style={
            !peckedClicked && {
              borderBottomColor: "#560CCE",
              borderBottomWidth: 1,
            }}
        > Pecked No </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button 
            color={peckedClicked ? "#560CCE" : "black"}
            onPress={PeckedYes}
            style={
              peckedClicked && {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
              }}
            > Pecked Yes </Button>
        </TouchableOpacity>
      </View>

      {!peckedClicked && <PeckNo 
      data={userListNo}
      extraData={userListNo}
      />}
      {peckedClicked && <PeckYes
      data={userListYes}
      extraData={userListYes}
      />}
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
    justifyContent: 'space-evenly',
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

