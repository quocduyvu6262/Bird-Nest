import React, { useEffect, useReducer, useRef } from "react";
import { View, Animated, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Logo from "../../assets/BirdFeedLogo.png";
// Import constants
import Constants from "../../constants/constants";
// Redux
import * as dataActions from "../../redux/slices/data";
import { useDispatch } from "react-redux";
<<<<<<< HEAD

export default function SplashScreen({navigation}) {

    const edges = useSafeAreaInsets();
    // dispatch instance
    const dispatch = useDispatch();
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

    /**
     * Pull data from Secure Store and store into Redux Store
     */
    const storeData = async () => {
        // Get and store image data
        SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_IMAGE_URI).then(res => {
            const imagesUri = JSON.parse(res);
            if(imagesUri){
                dispatch(dataActions.updateAvatar(imagesUri.avatar));
                if(imagesUri.album){
                    dispatch(dataActions.updateAllAlbum(imagesUri.album));
                }
            }
        })
        // Get and store user data
        SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_USER).then(res => {
            const user = JSON.parse(res);
            dispatch(dataActions.updateUser(user));
        }).catch( err => {
            console.log("Fail to store user data");
            throw err;
        })

        // Get and store housing data
        SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING).then(res => {
            const housing = JSON.parse(res);
            dispatch(dataActions.updateHousing(housing));
        }).catch( err => {
            console.log("Fail to store housing data");
            throw err;
        })
    }

    /**
     * Check login state in order to direct user to 
     * the right destination
     */
    const checkLoginState = async () => {
        // retrieve the value of the token
        const userToken = await SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN);
        // navigate to the app screen if a token is present
        // else navigate to the auth screen
        setTimeout( () => {
            if(userToken){
                storeData().then(() => {
                    navigation.navigate('BirdFeed');
                });
            } else {
                navigation.navigate('LoginScreen');
            }
        })
    }

    /**
     * Use Effect Hook
     */
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
    
    /**
     * Return Screen
     */
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
=======
export default function SplashScreen({ navigation }) {
  const edges = useSafeAreaInsets();
  // dispatch instance
  const dispatch = useDispatch();
  // Animation Values...
  const startAnimation = useRef(new Animated.Value(0)).current;
  // Scaling Down both Logo and Title...
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;
  // Offset Animation...
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  // Animating Content...
  const contentTransition = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  /**
   * Pull data from Secure Store and store into Redux Store
   */
  const storeData = async () => {
    // Get and store image data
    SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_IMAGE_URI).then(
      (res) => {
        const imagesUri = JSON.parse(res);
        if (imagesUri) {
          dispatch(dataActions.updateAvatar(imagesUri.avatar));
          if (imagesUri.album) {
            dispatch(dataActions.updateAllAlbum(imagesUri.album));
          }
        }
      }
    );
    // Get and store user data
    SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_USER)
      .then((res) => {
        const user = JSON.parse(res);
        dispatch(dataActions.updateUser(user));
      })
      .catch((err) => {
        console.log("Fail to store user data");
        throw err;
      });
    // Get and store housing data
    SecureStore.getItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING)
      .then((res) => {
        const housing = JSON.parse(res);
        dispatch(dataActions.updateHousing(housing));
      })
      .catch((err) => {
        console.log("Fail to store housing data");
        throw err;
      });
  };
  /**
   * Check login state in order to direct user to
   * the right destination
   */
  const checkLoginState = async () => {
    // retrieve the value of the token
    const userToken = await SecureStore.getItemAsync(
      Constants.MY_SECURE_AUTH_STATE_KEY_TOKEN
    );
    // navigate to the app screen if a token is present
    // else navigate to the auth screen
    setTimeout(() => {
      if (userToken) {
        storeData().then(() => {
          navigation.navigate("BirdFeed");
        });
      } else {
        navigation.navigate("LoginScreen");
      }
    });
  };
  /**
   * Use Effect Hook
   */
  useEffect(() => {
    // Starting Animation after 500ms...
    setTimeout(() => {
      // Parallel Animation...
      Animated.parallel([
        Animated.timing(startAnimation, {
          // For same height for non safe Area Devices...
          toValue: -Dimensions.get("window").height + (edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          // Scaling to 0.3
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          // Scaling to 0.8
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          // Moving to Right
          toValue: {
            x: Dimensions.get("window").width / 2 - 30,
            y: Dimensions.get("window").height / 2 - 10,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          // Moving to Right
          toValue: {
            x: 0,
            // Since image size is 1000..
            y: Dimensions.get("window").height / 2 - 100,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
      checkLoginState();
    }, 1000);
  }, []);
  const fadeIn = () => {
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 4000,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(new Animated.Value(0), {
      toValue: 0,
      duration: 4000,
    }).start();
  };
  /**
   * Return Screen
   */
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#fffff",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          zIndex: 1,
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={Logo}
            style={{
              width: 165,
              height: 165,
              // transform:[
              //     {translateX: moveLogo.x},
              //     {translateY: moveLogo.y},
              //     {scale: scaleLogo},
              // ]
            }}
            key={"uniqueKey"}
            entering={fadeIn}
            exiting={fadeOut}
          ></Animated.Image>
          <Animated.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
              // transform:[
              //      {translateY: moveTitle.y},
              //      {scale: scaleTitle}
              // ]
            }}
          >
            Bird Nest
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          transform: [{ translateY: contentTransition }],
        }}
      ></Animated.View>
    </View>
  );
>>>>>>> fbe17b64a68c092dc9e1609b2af1a385192ca0b5
}
