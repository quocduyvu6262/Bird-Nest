import { View, Text, StyleSheet, StatusBar, Pressable, FlatList, Button, TextInput, Image } from "react-native";
import React from "react";

export default function UserFunc({
  users,
  onClickUser,
  userToAdd,
  setUserToAdd,
  onAddFriend,
}) {
  const renderUser = ({item}) => {
    return (
      <Pressable onPress={() => onClickUser(item)} style={styles.row}>
        <Image style={styles.avatar} source={{uri: item.avatar}} />
        <Text>{item.username}</Text>
      </Pressable>
    );
  };
  return (
    <>
      <View style={styles.addUser}>
        <TextInput
          style={styles.input}
          onChangeText={setUserToAdd}
          value={userToAdd}
          />
        <Button title={'Add User'} onPress={() => onAddFriend(userToAdd)} />
      </View>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.username.toString()}
      />
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },
  addUser: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    backgroundColor: '#cacaca',
    flex: 1,
    marginRight: 10,
    padding: 10,
  },
  });
