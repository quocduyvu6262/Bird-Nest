import React from 'react';
import {StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform} from 'react-native';
import {Formik} from 'formik'

const RegisterScreen = navData => {
    return (
        <KeyboardAvoidingView 
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
                    <View style={styles.image}>
                        <View style={styles.card}>
                        <Text style={styles.heading}>Register</Text>
                        <View style={styles.form}>
                            <View style={styles.inputs}>
                                <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" ></TextInput>
                                <TextInput style={styles.input} placeholder="Name" ></TextInput>
                                <TextInput secureTextEntry={true} style={styles.input} placeholder="Password"></TextInput>
                                <Text></Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={styles.buttonAlt}>
                                    <Text style={styles.buttonAltText}>Sign Up</Text>
                                </TouchableOpacity> */}
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Have an account?</Text>
                                    <TouchableOpacity
                                    onPress={() => navData.navigation.navigate("Login")}
                                    >
                                    <Text style={styles.loginButton}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>    
                        </View>
                        </View>
                    </View>
                    )}
                </Formik>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },  
    card: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: '80%',
      marginTop: '55%',
      borderRadius: 20,
      maxHeight: 380,
      paddingBottom: '20%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: '10%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    loginContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
        paddingVertical: 16,
        flexDirection: "row",
    },
    loginText: {
        color: "#738289",
        fontSize: 16,
    },
    loginButton: {
        color: "#738289",
        fontSize: 16,
        fontWeight: "bold",
    },
      // error: {
      //     color: 'red'
      // }
  });

export default RegisterScreen;