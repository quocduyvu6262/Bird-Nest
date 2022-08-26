import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Modal,
} from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import UserCard from "../components/UserCard";
import InfoCard from "../components/InfoCard";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import MainHeader from "../components/MainHeader";
import * as dataActions from "../redux/slices/data";
import { storage, ref, deleteObject } from "../firebaseConfig";
import Constants from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import Tags from "react-native-tags";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.data.userInfo);
  console.log(user.isHousing)
  const imageFileSystem = useSelector((state) => state.data.imageFileSystemUri);
  const dispatch = useDispatch();
  let pics = imageFileSystem.album;
  let pics1 = [];
  let pics2 = [];
  let pics3 = [];
  if (pics) {
    for (let i = 0; i < pics.length; i++) {
      if (i < 3) {
        pics1.push(pics[i]);
      } else if (i >= 3 && i < 6) {
        pics2.push(pics[i]);
      } else if (i >= 6) {
        pics3.push(pics[i]);
      }
    }
  }
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let selectedPics = [];
  let keptPics = [];
  const data = useSelector((state) => state.data);
  const [index, setIndex] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [interestButtonClicked, setInterestButtonClicked] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  const [opacity4, setOpacity4] = useState(1);
  const [opacity5, setOpacity5] = useState(1);
  const [opacity6, setOpacity6] = useState(1);
  const [opacity7, setOpacity7] = useState(1);
  const [opacity8, setOpacity8] = useState(1);
  const [opacity9, setOpacity9] = useState(1);
  const [counter, setCounter] = useState(0);

  const roomInfoButton = () => {
    setButtonClicked(true);
  };
  const bioButton = () => {
    setButtonClicked(false);
  };
  const interestButton = () => {
    interestButtonClicked
      ? setInterestButtonClicked(false)
      : setInterestButtonClicked(true);
  };
  const openDelete = () => {
    setDeleteImage(true);
  };
  const closeDelete = () => {
    setOpacity1(1);
    setOpacity2(1);
    setOpacity3(1);
    setOpacity4(1);
    setOpacity5(1);
    setOpacity6(1);
    setOpacity7(1);
    setOpacity8(1);
    setOpacity9(1);
    setCounter(0);
    setDeleteImage(false);
  };
  const changeIndex = () => {
    setIndex(index + 1);
  };
  const findSelected = async () => {
    if (opacity1 == 0.5) {
      selectedPics.push(pics[0]);
    }
    if (opacity2 == 0.5) {
      selectedPics.push(pics[1]);
    }
    if (opacity3 == 0.5) {
      selectedPics.push(pics[2]);
    }
    if (opacity4 == 0.5) {
      selectedPics.push(pics[3]);
    }
    if (opacity5 == 0.5) {
      selectedPics.push(pics[4]);
    }
    if (opacity6 == 0.5) {
      selectedPics.push(pics[5]);
    }
    if (opacity7 == 0.5) {
      selectedPics.push(pics[6]);
    }
    if (opacity8 == 0.5) {
      selectedPics.push(pics[7]);
    }
    if (opacity9 == 0.5) {
      selectedPics.push(pics[8]);
    }
    let tempAlbum = Array.from(
      imageFileSystem.album ? imageFileSystem.album : []
    );
    let tempPicsList = Array.from(user.picsList ? user.picsList : []);
    for (let i = 0; i < selectedPics.length; i++) {
      const fileName = selectedPics[i].split("\\").pop().split("/").pop();
      const filePath = `images/${user.uid}/album/${fileName}`;
      const filePathFileSystem = selectedPics[i];
      // delete in firebase
      const reference = ref(storage, filePath);
      deleteObject(reference).then().catch();
      //deletes from Redux
      dispatch(dataActions.removePics(filePath));
      dispatch(dataActions.deleteAlbumItem(filePathFileSystem));
      // File System
      FileSystem.deleteAsync(FileSystem.documentDirectory + fileName);
      // Update Secure Store
      const index = tempAlbum.indexOf(filePathFileSystem);
      if (index > -1) {
        // only splice array when item is found
        tempAlbum.splice(index, 1); // 2nd parameter means remove one item only
      }
      const index2 = tempPicsList.indexOf(filePath);
      if (index2 > -1) {
        // only splice array when item is found
        tempPicsList.splice(index2, 1); // 2nd parameter means remove one item only
      }
    }
    if (selectedPics.length > 0) {
      SecureStore.setItemAsync(
        Constants.MY_SECURE_AUTH_STATE_KEY_USER,
        JSON.stringify({ ...user, picsList: tempPicsList })
      );
      SecureStore.setItemAsync(
        Constants.MY_SECURE_AUTH_STATE_IMAGE_URI,
        JSON.stringify({ avatar: imageFileSystem.avatar, album: tempAlbum })
      );
      // delete in database
      Axios.post(`${await Constants.BASE_URL()}/api/images/multiple`, {
        id: user.id,
        pics: tempPicsList,
      });
    }
    closeDelete();
  };
  const changeOpacity1 = () => {
    if (opacity1 == 1) {
      setCounter(counter + 1);
      setOpacity1(0.5);
    } else if (opacity1 == 0.5) {
      setCounter(counter - 1);
      setOpacity1(1);
    }
  };

  const changeOpacity2 = () => {
    if (opacity2 == 1) {
      setCounter(counter + 1);
      setOpacity2(0.5);
    } else if (opacity2 == 0.5) {
      setCounter(counter - 1);
      setOpacity2(1);
    }
  };

  const changeOpacity3 = () => {
    if (opacity3 == 1) {
      setCounter(counter + 1);
      setOpacity3(0.5);
    } else if (opacity3 == 0.5) {
      setCounter(counter - 1);
      setOpacity3(1);
    }
  };
  const changeOpacity4 = () => {
    if (opacity4 == 1) {
      setCounter(counter + 1);
      setOpacity4(0.5);
    } else if (opacity4 == 0.5) {
      setCounter(counter - 1);
      setOpacity4(1);
    }
  };

  const changeOpacity5 = () => {
    if (opacity5 == 1) {
      setCounter(counter + 1);
      setOpacity5(0.5);
    } else if (opacity5 == 0.5) {
      setCounter(counter - 1);
      setOpacity5(1);
    }
  };

  const changeOpacity6 = () => {
    if (opacity6 == 1) {
      setCounter(counter + 1);
      setOpacity6(0.5);
    } else if (opacity6 == 0.5) {
      setCounter(counter - 1);
      setOpacity6(1);
    }
  };
  const changeOpacity7 = () => {
    if (opacity7 == 1) {
      setCounter(counter + 1);
      setOpacity7(0.5);
    } else if (opacity7 == 0.5) {
      setCounter(counter - 1);
      setOpacity7(1);
    }
  };

  const changeOpacity8 = () => {
    if (opacity8 == 1) {
      setCounter(counter + 1);
      setOpacity8(0.5);
    } else if (opacity8 == 0.5) {
      setCounter(counter - 1);
      setOpacity8(1);
    }
  };

  const changeOpacity9 = () => {
    if (opacity9 == 1) {
      setCounter(counter + 1);
      setOpacity9(0.5);
    } else if (opacity9 == 0.5) {
      setCounter(counter - 1);
      setOpacity9(1);
    }
  };
  // return screen
  var images1 = pics1.map(function (image) {
    if (count1 == 0) {
      count1 = 1;
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity1()}>
          <Image
            style={{
              opacity: opacity1,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    } else if (count1 == 1) {
      count1 = 2;
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity2()}>
          <Image
            style={{
              opacity: opacity2,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    } else if (count1 == 2) {
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity3()}>
          <Image
            style={{
              opacity: opacity3,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    }
  });
  var images2 = pics2.map(function (image) {
    if (count2 == 0) {
      count2 = 1;
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity4()}>
          <Image
            style={{
              opacity: opacity4,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    } else if (count2 == 1) {
      count2 = 2;
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity5()}>
          <Image
            style={{
              opacity: opacity5,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    } else if (count2 == 2) {
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity6()}>
          <Image
            style={{
              opacity: opacity6,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    }
  });
  var images3 = pics3.map(function (image) {
    if (count3 == 0) {
      count3 = 1;
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity7()}>
          <Image
            style={{
              opacity: opacity7,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    } else if (count3 == 1) {
      count3 = 2;
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity8()}>
          <Image
            style={{
              opacity: opacity8,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    } else if (count3 == 2) {
      return (
        <TouchableOpacity key={image} onPress={() => changeOpacity9()}>
          <Image
            style={{
              opacity: opacity9,
              height: 125,
              width: 125,
              borderColor: "black",
              borderWidth: 1,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      );
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Profile" navigation={navigation} />
      <ScrollView>
        <Background>
          <Modal transparent={true} visible={deleteImage}>
            <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  flex: 1,
                  padding: 14,
                  borderRadius: 15,
                  marginTop: 110,
                  marginBottom: 110,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={closeDelete}>
                    <Text style={{ fontSize: 16, color: "#560CCE" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#560CCE",
                      fontWeight: "bold",
                    }}
                  >
                    Delete photos
                  </Text>
                  <TouchableOpacity onPress={findSelected}>
                    <Text style={{ fontSize: 16, color: "#560CCE" }}>Done</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  {images1}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  {images2}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  {images3}
                </View>

                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 16, color: "#560CCE", margin: 27 }}>
                    {counter} Photos Selected
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <UserCard
            name={data.userInfo.firstname + " " + data.userInfo.lastname}
            genderage={data.userInfo.gender + ", " + data.userInfo.age}
            id={data.userInfo.id}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Button
                color={"black"}
                onPress={openDelete}
                style={{
                  borderBottomWidth: 1,
                }}
              >
                Edit
              </Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                color={!buttonClicked ? "#560CCE" : "black"}
                onPress={bioButton}
                style={
                  !buttonClicked && {
                    borderBottomColor: "#560CCE",
                    borderBottomWidth: 1,
                  }
                }
              >
                Bio
              </Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                color={buttonClicked ? "#560CCE" : "black"}
                onPress={roomInfoButton}
                style={
                  buttonClicked && {
                    borderBottomColor: "#560CCE",
                    borderBottomWidth: 1,
                  }
                }
              >
                Room Info
              </Button>
            </TouchableOpacity>
          </View>

          <InfoCard>
            {!buttonClicked && <BioInfo bio={
              data.userInfo.bio}></BioInfo>}

            {buttonClicked && (
              <RentInfo
                rent={data.housing.rent}
                lease={data.housing.lease}
                neighborhood={
                  data.userInfo.isHousing
                    ? data.housing.neighborhood
                    : data.housing.neighborhoodList.join(", ")
                }
                // neighborhood={data.housing.neighborhood}
                garage={data.housing.garage}
                parking={data.housing.parking}
                gym={data.housing.gym}
                pool={data.housing.pool}
                appliances={data.housing.appliances}
                furnished={data.housing.furnished}
                ac={data.housing.ac}
              />
            )}
          </InfoCard>

          <Button
            color={interestButtonClicked ? "#560CCE" : "black"}
            onPress={interestButton}
            style={
              interestButtonClicked
                ? {
                    borderBottomColor: "#560CCE",
                    borderBottomWidth: 1,
                    width: "auto",
                  }
                : { width: "auto" }
            }
          >
            About me as a roommate!
          </Button>

          {interestButtonClicked && (
            <InfoCard>
              <InterestInfo
                pronouns={data.userInfo.pronouns}
                pets={data.userInfo.pets}
                alc={data.userInfo.alcohol}
                guests={data.userInfo.guests}
                roommatesStayingUp={data.userInfo.roommateWorkWhileYouSleep}
                sharing={data.userInfo.shareAppliances}
                drivingRoommates={data.userInfo.carWithRoommate}
                cooking={data.userInfo.cook}
                outside={data.userInfo.outside}
                study={data.userInfo.silent}
                sleep={data.userInfo.sleep}
                keepOrInteract={data.userInfo.roommateInteraction}
                communication={data.userInfo.tellRoommateIfBothered}
              />
            </InfoCard>
          )}
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
};

// Bio
const BioInfo = (props) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.text}>{props.bio}</Text>
    </View>
  );
};

// Rent Info
const RentInfo = (props) => {
  return (
    <View style={styles.rentContainer}>
      <Text style={styles.text}>
        <Text style={styles.rentHeaders}>Rent:</Text> ${props.rent}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.rentHeaders}>Lease Term:</Text> {props.lease} months
      </Text>
      <Text style={styles.text}>
        <Text style={styles.rentHeaders}>Neighborhood:</Text>{" "}
        <Text style={styles.neighborhoodText}> {props.neighborhood} </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={styles.rentHeaders}>Housing Preferences:</Text>
      </Text>
      <Tags
        initialTags={[
          props.garage ? `Garage` : null,
          props.parking ? `Parking` : null,
          props.gym ? `Gym` : null,
          props.pool ? `Pool` : null,
          props.appliances ? `Appliances` : null,
          props.furnished ? `Furnished` : null,
          props.ac ? `AC` : null,
        ].filter((n) => n)}
        readonly={true}
      />
    </View>
  );
};
// Interest Info
const InterestInfo = (props) => {
  const iHave = [];
  for (let i = 0; i < props.pets.length; i++) {
    iHave.push(props.pets[i]);
  }

  let strSleep = "";
  if (props.sleep === "Morning") {
    strSleep = "Early Bird";
  } else if (props.sleep === "Night Owl") {
    strSleep = "Night Owl";
  } else if (props.sleep === "Indifferent") {
    strSleep = "What's sleep?";
  }

  let strInteractive = "";
  if (props.keepOrInteract === "Interact") {
    strInteractive = "Interactive";
  } else if (props.keepOrInteract === "Keep to myself") {
    strInteractive = props.keepOrInteract;
  }

  return (
    <View style={styles.interestContainer}>
<<<<<<< HEAD
      <Text style = {styles.text}>
        What I go by:
      </Text>

      <Tags 
        initialTags={[
          props.pronouns
        ]}
      readonly={true}/>

      <Text style = {styles.text}>
        What I have:
      </Text>

      <Tags 
        initialTags={iHave.filter(n=>n)}
      readonly={true}/>
      <Text style = {styles.text}>What I am okay with: </Text>
=======
      <Text style={styles.text}>What I go by:</Text>

      <Tags initialTags={[props.pronouns]} readonly={true} />

      {props.pets.length != 0 && (
        <View>
          <Text style={styles.text}>What I have:</Text>
          <Tags initialTags={iHave.filter((n) => n)} readonly={true} />
        </View>
      )}
      <Text style={styles.text}>What I am okay with: </Text>
>>>>>>> origin/dev
      <Tags
        initialTags={[
          props.alc ? "Alchol/420" : null,
          props.guests ? "Guests Over" : null,
          props.roommatesStayingUp ? "Okay with roommates up late" : null,
          props.sharing ? "Sharing appliances" : null,
          props.drivingRoommates ? "Driving roommates" : null,
        ].filter((n) => n)}
        readonly={true}
      />

      <Text style={styles.text}>What I like:</Text>

      <Tags
        initialTags={[
          "Cooking " + props.cooking,
          props.outside ? "Being outside" : "Stay inside",
          props.study ? "Studying in silence" : null,
        ].filter((n) => n)}
        readonly={true}
      />
      <Text style={styles.text}> Who I am: </Text>

      <Tags
        initialTags={[
          strSleep,
          strInteractive,
          props.communcation ? "Communicative" : null,
        ].filter((n) => n)}
        readonly={true}
      />
      {/* <Text style={styles.text}>
        I don't like:
      </Text>

      <Tags
        initialTags={[
          props.outside ? "Staying inside" : "Being outside",
        ].filter(n=>n)}
        readonly={true}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  logoutButton: {
    flex: 1,
    bottom: 12,
  },
  subContainer: {
    padding: 10,
  },
  rentContainer: {
    padding: 10,
  },
  interestContainer: {
    padding: 10,
    justifyContent: "center",
  },
  rentHeaders: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    padding: 10,
    fontSize: 20,
    textAlign: "left",
  },
});
export default Profile;
