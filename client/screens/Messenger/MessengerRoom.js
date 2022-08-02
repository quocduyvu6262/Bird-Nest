import React, {Component} from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import io from "socket.io-client";

import Constants from "../../constants/constants";

export default class ChatRoom extends Component {

    constructor(props){
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: []
        }
    }

    componentDidMount() {
        this.socket = io(`${Constants.SOCKET_URL}`)
        this.socket.on("chat message", msg => {
            this.setState({chatMessages: [...this.state.chatMessages, msg]})
        })
    }

    submitChatMessage() {
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({chatMessage: ""})
    }

    render() {
        const chatMessage = this.state.chatMessages.map(chatMessage => {
            return(
                <Text key={chatMessage}>{chatMessage}</Text>
            )
        })
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    autoCorrect={false}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText={chatMessage => {
                        this.setState({chatMessage})
                    }}
                >
                </TextInput>
                {chatMessage}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        padding: 10
    },
    textInput: {
        height:40, 
        borderWidth: 0.8, 
        borderRadius: 10,
        marginTop: 100
    }
});