import {SafeAreaView, Text, StyleSheet, Image, StatusBar } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import React from "react";
import CarouselCards from "./ProfileCarousel/CarouselCards";

import { useEffect, useState } from "react";

const UserCard = (props) => {
  return (
    <SafeAreaView style={styles.card}>
      <CarouselCards/>
      <Header>{props.name}</Header>
    </SafeAreaView>
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
