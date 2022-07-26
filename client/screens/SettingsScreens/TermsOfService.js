import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView} from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";

const TermsOfService = ({navigation}) => {
    return(
        <SafeAreaView style={TermsOfService_Styles.container}>
            <MainHeader screen="Terms of Service" navigation={navigation} />
            <Text>Terms Of Services Page</Text>
        </SafeAreaView>
    )
}
const TermsOfService_Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    }
)
export default TermsOfService