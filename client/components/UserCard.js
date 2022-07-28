import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import React from "react";

const UserCard = (props) => {
  return (
    <View style={styles.card}>
      <Image style={styles.userImage} source={props.image} />
      <Header>{props.name}</Header>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    paddingTop: 10,
  },
  userImage: {
    borderColor: "#D3D3D3",
    borderRadius: 30,
    width: 350,
    height: 300,
    marginBottom: 20,
  },
});

export default UserCard;
