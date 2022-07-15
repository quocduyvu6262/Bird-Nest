import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const ProfileCard = ({ item }) => {
  return (
    <View style={Profile_Card_styles.container}>
      <Image style={Profile_Card_styles.image} source={item.src} />
      <View style={Profile_Card_styles.text_box}>
        <Text>
          Neighborhood: {item.neighborhood},{item.city}, Max Rent: {item.rent}
        </Text>
        <Text style={{ position: "absolute", bottom: 0, right: 5 }}>
          {item.matching_number} matched preferences!
        </Text>
        <View style={Profile_Card_styles.text_box_name}>
          <Text>{item.name}</Text>
        </View>
      </View>
    </View>
  );
};

const Profile_Card_styles = StyleSheet.create({
  container: {
    height: 90,
    width: "90%",
    backgroundColor: "lightgray",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    // marginLeft: 15,
  },
  text_box: {
    backgroundColor: "white",
    height: "90%",
    width: "70%",
    alignSelf: "flex-end",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    marginRight: 8,
    borderBottomWidth: 2,
  },
  text_box_name: {
    position: "absolute",
    bottom: 0,
    left: 15,
    backgroundColor: "#219EBC",
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default ProfileCard;
