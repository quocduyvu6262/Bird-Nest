import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { theme } from '../core/theme'

const Background = ({ children, ...props }) => {
    return (
        <ImageBackground style={styles.background} resizeMode="repeat" {...props}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding": "height"}>
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: "20%"
    }
});

export default Background;