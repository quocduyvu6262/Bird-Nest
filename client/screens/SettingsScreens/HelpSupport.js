import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar,} from "react-native";
import React, {useState} from "react";
import InfoCard from "../../components/InfoCard";
import MainHeader from "../../components/MainHeader";

const HelpSupport = ({navigation}) => {
    const [contactus, setContactus] = useState(false);

    const contactUsButton = () => {
        contactus ? setContactus(false) : setContactus(true);
    }
    return(
        <SafeAreaView style={HelpSupport_Styles.container}>
            <MainHeader screen="Help & Support" navigation={navigation} />
            <View style = {HelpSupport_Styles.card}>
            <Text style = {HelpSupport_Styles.textStyle}>Help & Support Page</Text>
            </View>

            <TouchableOpacity 
            style = {HelpSupport_Styles.regularButton}
            onPress={contactUsButton}> 
                <Text style = {HelpSupport_Styles.textStyle}>Contact Us!</Text>
             </TouchableOpacity>

            {contactus &&
                <View style = {HelpSupport_Styles.overLay}>
                    <ContactNumber></ContactNumber>
                </View>
            }
        </SafeAreaView>
    )
}
const HelpSupport_Styles = StyleSheet.create({
    card: {
        marginTop: 60,
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 30,
        width:350,
        height:450,
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    regularButton: {
        width: 200,
        height: 50,
        marginTop: 80,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#560CCE',
    },
    textStyle: {
        padding: 10,
        fontSize: 20,
        alignSelf: 'center',
    },
    overLay: {
        marginTop: 60,
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 30,
    },
    }
)

const ContactNumber = () => {
    return (
        <View style = {HelpSupport_Styles.subContainer}>
            <Text style = {HelpSupport_Styles.textStyle}> Contact #: 943-204-3213</Text>
        </View>
    )
}
export default HelpSupport