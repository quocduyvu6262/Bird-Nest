import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestHeader = ({title}) => {
  return (
    <View style={QuestHeader_styles.container}>
      <Text style={QuestHeader_styles.headTitle}>{title}</Text>
    </View>
  )
}

const QuestHeader_styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#6736B6",
      height: 90,
      bottom: 47,
    },
    headTitle: {
      color: "#FFF",
      top: 55,
      alignSelf: "center",
      fontSize: 20,
      fontWeight: "bold"
    },
});
export default QuestHeader