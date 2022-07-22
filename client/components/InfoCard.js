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
        marginTop: -65,
        width: 340,
        height: 250,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height:1,
            width:-2
        },
        elevation:2,
        paddingTop: 10
    },
})

export default InfoCard;