import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const TermsOfService = () => {
    return(
        <View style={TermsOfService_Styles.container}>
            <Text>Terms Of Services Page</Text>
        </View>
    )
}
const TermsOfService_Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    }
)
export default TermsOfService