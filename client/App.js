import Axios from "axios";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import image from "./assets/D85_6160.jpg";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  // youtube.com/information
  const addUser = () => {
    Axios.post("http://localhost:5000/create", {
      username: username,
      email: email,
      password: password,
    })
      .then(() => {
        console.log("success");
      })
      .catch((error) => console.log(error));
  };

  const getUsers = () => {
    Axios.get("http://localhost:5000/users")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setUsername}
        placeholder="Username"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={setEmail}
        placeholder="Email"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={setPassword}
        placeholder="Password"
      ></TextInput>

      <TouchableOpacity onPress={addUser}>
        <Text>Create User</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getUsers}>
        <Text>Show Users</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
  },
});
