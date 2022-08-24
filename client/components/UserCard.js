import React from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import Header from "./Header";
import { theme } from "../core/theme";
import CarouselCards from "./ProfileCarousel/CarouselCards";
import {useSelector} from "react-redux";
import UserCarouselCards from "./ProfileCarousel/UserCarouselCards";

const UserCard = (props) => {
  const user = useSelector(state => state.data.userInfo);
  return (
    <View style={styles.card}>
      {user.id == props.id 
        ? <CarouselCards avatar={props.avatar} picList={props.picList}/>
        : <UserCarouselCards avatar={props.avatar} picList={props.picList}/>
      }
     
        <Header>
          {props.name} 
        </Header>
        <Text style={styles.genderAge}>
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
  userImage: {
    borderColor: "#D3D3D3",
    borderRadius: 15,
    width: 350,
    height: 300,
    position: "relative",
    bottom: 0,
  },
  genderAge: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  }
});

export default UserCard;
