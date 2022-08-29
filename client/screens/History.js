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
<<<<<<< HEAD
import {useSelector} from "react-redux"

const History = ({ navigation }) => {
  const user = useSelector(state => state.data.userInfo);
=======
import { useSelector } from "react-redux";

const History = ({ navigation }) => {
  const user = useSelector((state) => state.data.userInfo);
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
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
<<<<<<< HEAD
        console.log(response.data)
=======
        console.log(response.data);
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userListYes.push({
<<<<<<< HEAD
            name: userData[i].fullname,
            city: userData[i].city,
=======
            info: userData[i].info,
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
            src: barackObama,
          });
        }
        setUserListYes((prevList) => [
          ...userListYes,
          {
<<<<<<< HEAD
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
=======
            info: userData[userData.length - 1].info,
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
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
<<<<<<< HEAD
=======
        console.log(userData);
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
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
<<<<<<< HEAD
              extraData={props.extraData}
=======
              extraData={userList}
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
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
<<<<<<< HEAD
    )
=======
    );
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="History" navigation={navigation} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
<<<<<<< HEAD
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
=======
          <Button
            color={!peckedClicked ? "#560CCE" : "black"}
            onPress={PeckedNo}
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
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
            color={peckedClicked ? "#560CCE" : "black"}
            onPress={PeckedYes}
            style={
              peckedClicked && {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
<<<<<<< HEAD
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
=======
              }
            }
          >
            {" "}
            Pecked Yes{" "}
          </Button>
        </TouchableOpacity>
      </View>

      {!peckedClicked && <PeckNo data={userListNo} extraData={userListNo} />}
      {peckedClicked && <PeckYes data={userListYes} extraData={userListYes} />}
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
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
<<<<<<< HEAD
    justifyContent: 'space-evenly',
=======
    justifyContent: "space-evenly",
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
  },
  subContainer: {
    padding: 10,
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
<<<<<<< HEAD

=======
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
});
export default History;
