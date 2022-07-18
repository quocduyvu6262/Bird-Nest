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
import Navigator from "./navigation/Navigator";
import image from "./assets/D85_6160.jpg";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

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
    Axios.get("http://localhost:5000/")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Navigator />
  );
}

// Styling
const styles = StyleSheet.create({
 
});
