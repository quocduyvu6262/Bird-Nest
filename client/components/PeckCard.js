import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import React from "react";

import { Icon } from "@rneui/themed";

const PeckCard = (props) => {
  return (
    <View style={PeckCard_styles.card}>
        <Image style={PeckCard_styles.userImage} source={props.image} />
        <Header>{props.name}</Header>
        <View style = {PeckCard_styles.buttonContainer}>
            <TouchableOpacity style = {PeckCard_styles.buttons}>
                <Icon 
                name = "cancel" 
                color = "red"
                size = {60}></Icon>
            </TouchableOpacity>

            <TouchableOpacity style = {PeckCard_styles.buttons}>
                <Icon 
                name = "check-circle" 
                color = "green"
                size = {60}></Icon>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const PeckCard_styles = StyleSheet.create({
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
