// USAGE if no extra header buttons: <MainHeader screen="Screen name with spaces in between" navigation={navigation} />
// if there are extra buttons, talk to Deondre
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import * as dataActions from "../redux/slices/data";
import {
  storage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebaseConfig";
import * as FileSystem from "expo-file-system";
import Axios from "axios";
import Constants from "../constants/constants";
import * as SecureStore from "expo-secure-store";

// import buttons

const MainHeader = ({ screen, navigation }) => {
  const user = useSelector((state) => state.data.userInfo);
  const imageFileSystemUri = useSelector(
    (state) => state.data.imageFileSystemUri
  );
  const dispatch = useDispatch();
  /**
   * Pick multiple images
   */
  const pickImages = async () => {
    // Permission required
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(); //ask user for permission into gallery
    if (permissionResult.granted === false) {
      //if user denies permission
      alert("Permission to access camera roll is required!");
      return;
    }
    let limit = 9;
    if (user.picsList) {
      let length = user.picsList.length;
      if (length == 9) {
        //if user already has 9 pics in their carousel
        return;
      }
      limit = 9 - length;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      //wait for user to choose image
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: limit,
    });
    // upload to firebase
    if (!result.cancelled) {
      let promises = [];
      let listUrl = [];
      let fileSystemList = [];
      let count = 0;
      result.selected.map(async (image, index, imageArray) => {
        const imageName = image.fileName.replace(/\s/g, "");
        const img = await fetch(image.uri);
        const bytes = await img.blob();
        const storageRef = ref(
          storage,
          `images/${user.uid}/album/${imageName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, bytes);
        promises.push(uploadTask);
        // retrieve image url
        let imageDownloadedUrl;
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => {},
          async () => {
            // handle successfull case
            count += 1;
            imageDownloadedUrl = await getDownloadURL(uploadTask.snapshot.ref);
            // download image to file system
            const result = await FileSystem.downloadAsync(
              imageDownloadedUrl,
              FileSystem.documentDirectory + imageName
            );
            dispatch(dataActions.updateAlbum(result.uri));
            fileSystemList.push(result.uri);
            // put file path
            listUrl.push(uploadTask.snapshot.ref._location.path_);
            dispatch(
              dataActions.updatePicsList(
                uploadTask.snapshot.ref._location.path_
              )
            );
            // upload path to redux  tore
            if (count === imageArray.length) {
              // upload to database
              let newListUrl = [];
              if (user.picsList) {
                newListUrl = [...user.picsList, ...listUrl].filter(unique);
              } else {
                newListUrl = listUrl;
              }
              Axios.post(`${await Constants.BASE_URL()}/api/images/multiple`, {
                id: user.id,
                pics: newListUrl
              }).then(async () => {
                // file system
                let newFileSystemList;
                if (imageFileSystemUri.album.length) {
                  newFileSystemList = [
                    ...imageFileSystemUri.album,
                    ...fileSystemList,
                  ];
                } else {
                  newFileSystemList = fileSystemList;
                }
                // upload to secure store
                await SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_KEY_USER, JSON.stringify({...user, picsList: newListUrl}));
                await SecureStore.setItemAsync(Constants.MY_SECURE_AUTH_STATE_IMAGE_URI, JSON.stringify({avatar: imageFileSystemUri.avatar, album: newFileSystemList}));
              })
            }
          }
        );
      });

      Promise.all(promises)
        .then(() => {
          console.log("All images uploaded");
        })
        .catch((err) => console.log("Fail to upload images"));
    }
  };

  /**
   * Helper function: unique filter
   * @param value
   * @param index
   * @param self
   * @returns
   */
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  /**
   * Rendering Logic
   */
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        {/* if screen is not any of these names, show the back button */}
        {!(
          screen === "Profile" ||
          screen === "Bird Feed" ||
          screen === "Messenger Pigeon" ||
          screen === "Peck View" ||
          screen === "Chirp Notifications"
        ) && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Icon name="west" size={30} />
          </TouchableOpacity>
        )}
        {screen === "Chirp Notifications" && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              dispatch(dataActions.updateNotiSeen());
              dispatch(dataActions.updateNotiRead());
            }}
            style={styles.backButton}
          >
            <Icon name="west" size={30} />
          </TouchableOpacity>
        )}
        <View style={styles.contentContainer}>
          {/*  Main Title - conditional render applied */}
          <Text
            style={
              screen === "Bird Feed" ||
              screen === "Profile" ||
              screen == "Peck View"
                ? styles.headerText
                : styles.headerTextNoIcons
            }
          >
            {screen}
          </Text>

          {/* if screen === Bird Feed */}
          {screen === "Bird Feed" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("PeckView")}
              >
                <Icon name="contacts" size={27} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="history" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => {
                  navigation.navigate("ChirpNotification");
                }}
              >
                <Image source={require(`../assets/bird.png`)} />
                {user.notiunRead && (
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      position: "absolute",
                      fontSize: 50,
                      left: 15,
                      bottom: -6,
                    }}
                  >
                    .
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {screen === "Peck View" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("BirdFeed")}
              >
                <Icon name="list" size={30}></Icon>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="history" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("ChirpNotification")}
              >
                <Image source={require(`../assets/bird.png`)} />
              </TouchableOpacity>
            </View>
          )}

          {/* if screen === Profile */}
          {screen === "Profile" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity
                onPress={pickImages}
                style={styles.headerButtons}
              >
                <Icon name="photo" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
                // onPress={() => navigation.navigate("IDQs")}
                style={styles.headerButtons}
              >
                <Icon name="edit" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("Settings")}
              >
                <Icon name="settings" size={30} />
              </TouchableOpacity>
            </View>
          )}

          {/* if screen === Messenger Pigeon */}
          {screen === "Messenger Pigeon" && (
            <View style={styles.headerButtonView}>
              <TouchableOpacity style={styles.headerButtons}>
                <Icon name="notifications" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButtons}
                onPress={() => navigation.navigate("History")}
              >
                <Icon name="add" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgray",
    // // shadowOffset: { height: 10 },
    // shadowRadius: 5,
    // elevation: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 25,
    color: "#560CCE",
    // color: "#560CCE",
    fontFamily: "Pacifico_400Regular",
  },
  headerTextNoIcons: {
    flex: 1,
    fontSize: 30,
    // color: "#560CCE",
    color: "#560CCE",
    textAlign: "center",
    fontFamily: "Pacifico_400Regular",
  },
  backButton: {
    position: "absolute",
    zIndex: 2,
    alignSelf: "center",
    marginLeft: 10,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  headerButtonView: {
    flexDirection: "row",
    marginLeft: 20,
  },
  headerButtons: {
    marginRight: 10,
    alignSelf: "center",
    padding: 5,
    // borderWidth: 3,
    // borderRadius: 50,
    // borderColor: "#219EBC",
  },
});

export default MainHeader;
