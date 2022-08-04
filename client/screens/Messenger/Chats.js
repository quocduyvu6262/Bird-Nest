import { collection, onSnapshot, query, where } from "@firebase/firestore"; 
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { database } from "../../firebase";

const Chats = () => {
  const [room, setRoom] = useState([]);
  const { user } = doc.data().user
  useEffect(() =>
    onSnapshot(
      query(
        collection(database, "room"),
        where("userRoom", "array-contains", user._id)
      ),
      (snapshot) =>
      setRoom(
        snapshot.docs.map((doc) => ({
          _id: doc._id,
          ...doc.data(),
        }))
      )
    ),
    [user]
  );
  return (
    <View>
      <Text>ChatList...</Text>
    </View>
  );
};

export default Chats;