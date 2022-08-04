import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import React from "react";
import CarouselCards from "./ProfileCarousel/CarouselCards";

const UserCard = (props) => {
  return (
    <View style={styles.card}>
      {/* <Image style={styles.userImage} source={props.image} /> */}
      <CarouselCards/>
      <Header>{props.name}</Header>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    alignItems: "center",
  },
  userImage: {
    borderColor: "#D3D3D3",
    borderRadius: 15,
    width: 350,
    height: 300,
    position: "relative",
    bottom: 0,
  },
});

export default UserCard;
