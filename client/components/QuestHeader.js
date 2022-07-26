import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestHeader = () => {
  return (
    <SafeAreaView styles={QuestHeader_styles.container}>
      <Text style={{paddingTop: "5%", backgroundColor: "red"}}>QuestionHeader</Text>
    </SafeAreaView>
  )
}

const QuestHeader_styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
export default QuestHeader