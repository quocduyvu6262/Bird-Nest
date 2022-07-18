import React from 'react';
import {StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import {Formik} from 'formik'

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding": "height"}  
            style={{flex: 1}}
        >
                <Formik initialValues={{
                    email: "",
                    password: ""
                }} 
                onSubmit={values => {
                    console.log(values);
                }}>
                    {(props) => (
                        <View style={styles.container}>
                            <View style={styles.logo}>
                            </View>
                            <View>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    keyboardType="email-address"
                                />
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <View style={styles.registerContainer}>
                                    <Text style={styles.registerText}>Don't have an account? </Text>
                                    <TouchableOpacity>
                                        <Text style={styles.registerButton}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
    // logo: {
    //   alignItems: "center",
    //   marginBottom: 40,
    // },
    // image: {
    //   width: 100,
    //   height: 100,
    // },
    input: {
      width: 300,
      backgroundColor: "#B6BFC4",
      borderRadius: 25,
      padding: 16,
      fontSize: 16,
      marginVertical: 10,
    },
    button: {
      width: 300,
      backgroundColor: "#738289",
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#ffffff",
      textAlign: "center",
    },
    registerContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      paddingVertical: 16,
      flexDirection: "row",
    },
    registerText: {
      color: "#738289",
      fontSize: 16,
    },
    registerButton: {
      color: "#738289",
      fontSize: 16,
      fontWeight: "bold",
    },
    // error: {
    //     color: 'red'
    // }
  });
  
  export default LoginScreen;