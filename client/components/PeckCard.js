import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import React from "react";

import { Icon } from "@rneui/themed";
import { useSelector } from "react-redux";
import { StreamChat } from 'stream-chat';
import Constants from '../constants/constants';


const chatClient = StreamChat.getInstance(Constants.CHAT_API_KEY);
const PeckCard = (props) => {
  const user = useSelector(state => state.data.userInfo);
  const selectedUserID = 'DaveSmith_m5DEcbNHZXpNcAndU8oAsNORk9uc';
  const createChannel = async () => {
    const channel = chatClient.channel('messaging',{
      members: [`${user.fullname.replace(/\s/g, '')}_${user.uid}`, selectedUserID]
    });
    await channel.create();
  }
  return (
    <View style={styles.card}>
        <Image style={styles.userImage} source={props.image} />
        <Header>{props.name}</Header>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity style = {styles.buttons}>
                <Icon 
                  name = "cancel" 
                  color = "red"
                  size = {60}>
                </Icon>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.buttons}
              onPress={() => {
                createChannel()
              }}
            >
                <Icon 
                name = "check-circle" 
                color = "green"
                size = {60}></Icon>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    alignSelf: 'center',
    alignItems: "center",
    paddingTop: 10,
  },
  userImage: {
    borderColor: "#D3D3D3",
    borderRadius: 15,
    width: 350,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 2,
  },
  buttons: {
    marginTop: 245,
    marginLeft: 110,
    marginRight: 110,
  }
});

export default PeckCard;
