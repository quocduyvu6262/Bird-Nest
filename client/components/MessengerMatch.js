import React from 'react';
import { Text, 
    SafeAreaView, 
    LogBox, 
    StatusBar, 
    View, 
    StyleSheet, 
    Image, 
    TouchableOpacity
} from 'react-native';
import Elie from '../assets/Elie.jpg'
const MessengerMatch = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.matchText}
            >Matches: </Text>
            <TouchableOpacity style={styles.textContainer}>
                <Image 
                    style={styles.image}
                    source={Elie}></Image>
                <Text style={{marginTop:5}}>Elie</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        borderBottomWidth: 0.17
    },
    textContainer: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
        alignItems:'center',
    },
    matchText: {
        fontSize: 20,
    },
    image: {
        borderRadius:100,
        width: 80,
        height: 80,
    }
})
export default MessengerMatch;