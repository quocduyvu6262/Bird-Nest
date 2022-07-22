import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from '../core/theme'
import React from "react";

const InfoCard  = ({ mode, style, ...props }) => {
    return(
        <View 
        style={styles.card}
        {...props}>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flex: 1,
        marginTop: -65,
        width: "100%",
        height: 300,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: "#D3D3D3",
        elevation:2,
        paddingTop: 10
    },
})

export default InfoCard;