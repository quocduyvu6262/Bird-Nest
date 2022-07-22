import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from '../core/theme'
import React from "react";

const UserCard = props => {
    return(
        <View style={styles.card}>
            <Image style={styles.userImage} source={props.image}/>
            <Text style={styles.name}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop:50,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: "#D3D3D3",
        borderRadius: 30,
        elevation:2,
        paddingTop: 10,
        width: "100%"
    },
    userImage: {
        width:250,
        height:200,
        marginBottom:20,
    },
    name:{
        fontSize:25,
        marginBottom:20,
        fontWeight: 'bold',
        color: theme.colors.primary
    },
})

export default UserCard;
