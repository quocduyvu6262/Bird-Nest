import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from '../core/theme'
import React from "react";

const InfoCard  = ({ mode, style, ...props }) => {
    return(
        <View 
            style={styles.card}
            {...props}
        >
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "120%",
        height: "auto",
        backgroundColor: theme.colors.surface,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: "#D3D3D3",
        backgroundColor: "D3D3D3",
        justifyContent: 'center',
        marginBottom: 5,
    }
})


export default InfoCard;