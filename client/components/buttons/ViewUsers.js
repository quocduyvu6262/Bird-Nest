// COPY PASTE THIS CODE INTO BIRD FEED SCREEN ONCE ELIE AND STEPHEN

import Axios from "axios";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ViewUsers = () => {
  const viewUsers = () => {
    Axios.post("/api/matching/", {
      user_id: 10,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={viewUsers}>
        <Text>View Users</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewUsers;
