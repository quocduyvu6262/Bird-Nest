import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const AddressInput = () => {

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Address/Neighborhood"
                placeholderTextColor="#949494"
                onChangeText={(value) => dispatch(dataActions.updateFirstname(value))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: "-20%"
    },
    textInput: {
        fontSize: 20,
        color: "black",
        backgroundColor: "#D9D9D9",
        margin: 8,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 7,
    },
})

export default AddressInput;