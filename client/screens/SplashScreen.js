import React, { useEffect, useReducer, useRef} from 'react';
import { View, Animated, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthLoading from '../screens/AuthLoading.js';
import * as SecureStore from 'expo-secure-store';
import Login from '../screens/Login.js';
import Logo from '../assets/bird.png';
// Import constants
import Constants from '../constants/constants';

export default function SplashScreen({navigation}) {

    const edges = useSafeAreaInsets();

    // Animation Values...
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down both Logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    // Offset Animation...
    const moveLogo = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

    // Animating Content...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    const checkLoginState = async () => {
        // retrieve the value of the token
        const userToken = await SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN);
        
        // navigate to the app screen if a token is present
        // else navigate to the auth screen
        setTimeout(() => {
            if(userToken){
                navigation.navigate('BirdFeed');
            } else {
                navigation.navigate('LoginScreen');
            }
        })
    }

    useEffect(()=> {

        // Starting Animation after 500ms...
        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        // Scaling to 0.3
                        toValue: 0.3,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        // Moving to Right
                        toValue: {
                            x: (Dimensions.get("window").width / 2) - 30,
                            y: (Dimensions.get("window").height / 2) - 10
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        // Moving to Right
                        toValue: {
                            x: 0,
                            // Since image size is 1000..
                            y: (Dimensions.get("window").height / 2) - 100
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
            .start();
            checkLoginState();
        }, 1000);
    }, [])
    
    // Moving up like Nav Bar...
    return (
        <View style = {{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left:0,
            right: 0,
        }}>
            <Animated.View style = {{
                flex:1,
                zIndex: 1,
                transform: [
                    {translateY: startAnimation}
            ]
        }}>
            <Animated.View style = {{
                flex: 1, 
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Animated.Image source = {Logo} style = {{
                    width: 100,
                    height: 100,
                    marginBottom: 20,
                    // transform:[
                    //     {translateX: moveLogo.x},
                    //     {translateY: moveLogo.y},
                    //     {scale: scaleLogo},
                    // ]
                }}></Animated.Image>

                <Animated.Text style = {{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                    // transform:[
                    //      {translateY: moveTitle.y},
                    //      {scale: scaleTitle}
                    // ]
                }}>Bird Nest</Animated.Text>
            </Animated.View>
            </Animated.View>

            <Animated.View style = {{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
                transform: [
                    {translateY: contentTransition}
                ]
            }}>  
            </Animated.View>
        </View>
    )
}
