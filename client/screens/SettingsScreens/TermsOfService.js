import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";

const TermsOfService = ({ navigation }) => {
  return (
    <SafeAreaView style={TermsOfService_Styles.container}>
     <MainHeader screen="Terms Of Service" navigation={navigation} />
     <ScrollView>
       {/* terms of service text */}
        <Text style={TermsOfService_Styles.termsText}>
          Don't be a dick! Don't sue our asses, please; we don't get paid.
        </Text>
     </ScrollView>
    </SafeAreaView>
  );
};
const TermsOfService_Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    alignItems: "center"
  },
  termsText: {
    fontSize: 30,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
export default TermsOfService;
