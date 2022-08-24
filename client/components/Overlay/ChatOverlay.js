import React, { useCallback, useRef, useState } from 'react';
import {Text, View, StyleSheet, Touchable} from 'react-native';
import BottomSheet, {BottomSheetView, TouchableOpacity} from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';



const ChatOverlay = ({sheetRef, snapPoints, setIsOpen, handleSendMessage}) => {
    const [message, setMessage] = useState("");
    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => setIsOpen(false)}
        >
            <BottomSheetView>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder='Send your first message'
                    />
                    <TouchableOpacity
                        onPress={() => {
                            handleSendMessage(message);
                        }}
                    >
                        <Text style={styles.sendButton}>Send</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0.2,
        borderRadius: 50,
        borderColor: 'grey',
        width: "80%",
        padding: 10,
    },
    sendButton: {
        fontSize: "16%"
    }
})

export default ChatOverlay;