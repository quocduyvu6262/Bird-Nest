import React, {useState, useSateIf} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import * as SecureStore from 'expo-secure-store';
// Import constants
import Constants from '../constants/constants';

const HomeScreen = navData => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    // fetch token
    const loadProfile = async () => {
        const token = await AsyncStorage.getItem('token').catch(err => console.log(err)); 
        if(!token) {
            navData.navigation.navigate('Login');
        }
    }
    React.useEffect(() => {
        loadProfile();
    });

    // Logout
    const logout = props => {
        SecureStore.deleteItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY)
            .then(() => {
                props.navigation.replace('Login')
            })
            .catch(err => console.log(err));
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Welcome {name ? name: ''}</Text>
            </View>
            <View>
                <Text style={styles.text}>Your Email: {email ? email : ''}</Text>
            </View>
            <View>
                <Button 
                    title="Logout"
                    onPress={() => logout(navData)}
                />
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 40
    },
    text: {
        fontSize: 22
    }
})

export default HomeScreen;