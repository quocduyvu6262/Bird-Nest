import React from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import CarouselCards from "./ProfileCarousel/CarouselCards";

const UserCard = (props) => {
  return (
    <View style={styles.card}>
      <CarouselCards/>
        <Header>
          {props.name} 
        </Header>
        <Text style={styles.header}>
          {props.genderage}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    alignItems: "center",
  }, 
  header: {
    fontSize: 25,
    color: theme.colors.primary,
    fontWeight: 'bold',
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
