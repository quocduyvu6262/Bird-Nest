import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import GlobalContext from "../../context/Context";
import { auth, database } from "../../firebase";
import ListItem from "../../components/ListItem";

export default function Chats() {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const chatsQuery = query(
    collection(database, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
          <ListItem
          type="chats"
          description={"AHHHHHH"}
          key={"341"}
          room={"zoom"}
          time={"4"}
          user={"Bob"}
        />
      {rooms.map((room) => (
        <ListItem
          type="chats"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={room.user}
        />
      ))}
    </View>
  );
}