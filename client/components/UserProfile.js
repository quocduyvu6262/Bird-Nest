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
import * as dataActions from '../redux/slices/data';
import { storage, ref, deleteObject } from "../firebaseConfig";
import Constants from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system'
import Tags from "react-native-tags";

const UserProfile = ({ navigation, route }) => {
 
  const imageFileSystem = useSelector(state => state.data.imageFileSystemUri)
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
 
  const [buttonClicked, setButtonClicked] = useState(false);
  const [interestButtonClicked, setInterestButtonClicked] = useState(false);
  const item = route.params.item;
  const user = item.item.info;

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
  
  const retrieveImage = async (path) => {
    if(path){
      const reference = ref(storage, path);
      const url = await getDownloadURL(reference);
      return url;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen={`${user.firstname}'s Profile`} navigation={navigation} />
      <ScrollView>
        <Background>
          <UserCard
            name={user.firstname + " " + user.lastname} 
            genderage={user.gender + ", " + user.age}
            id={user.id}
            avatar={user.profilepic}
            picList={user.picsList}
          />
          <View style={styles.buttonContainer}>

            <TouchableOpacity>
              <Button
                color={!buttonClicked ? "#560CCE" : "black"}
                onPress={bioButton}
                style={
                  !buttonClicked && {
                    borderBottomColor: "#560CCE",
                    borderBottomWidth: 1,
                  }}>
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
                    borderBottomWidth: 1,}}>
                Room Info
              </Button>
            </TouchableOpacity>
          </View>

          <InfoCard>
            {!buttonClicked && <BioInfo bio={
              user.pronouns + "\n" + 
              user.bio}></BioInfo>}

            {buttonClicked && (
              <RentInfo
                rent={user.rent}
                lease={user.lease}
                neighborhood={user.isHousing ? user.neighborhood : user.neighborhood.join(", ")}
                garage={user.garage}
                parking={user.parking}
                gym={user.gym}
                pool={user.pool}
                appliances={user.appliances}
                furnished={user.furnished}
                ac={user.ac}
              />
            )}
          </InfoCard>

          <Button
            color={interestButtonClicked ? "#560CCE" : "black"}
            onPress={interestButton}
            style={
              interestButtonClicked ? {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
                width: "auto"} : {width: "auto"}}>
            About me as a roommate!
          </Button>

          {interestButtonClicked && (
            <InfoCard>
              <InterestInfo
                pets={user.pets}
                alc={user.alcohol}
                guests={user.guests}
                roommatesStayingUp={user.roommateWorkWhileYouSleep}
                sharing={user.shareAppliances}
                drivingRoommates={user.carWithRoommate}
                cooking={user.cook}
                outside={user.outside}
                study={user.silent}
                sleep={user.sleep}
                keepOrInteract={user.roommateInteraction}
                communication={user.tellRoommateIfBothered}
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
        <Text style={styles.rentHeaders}>Lease Term:</Text> {props.lease}{" "}
        months
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
        ].filter(n => n)}
        readonly={true}
      />
    </View>
  );
};
// Interest Info
const InterestInfo = (props) => {
  const iHave = []
  for (let i = 0; i < props.pets.length; i++) {
    iHave.push(props.pets[i])
  }

  let strSleep = ""
  if (props.sleep === "Morning") {
    strSleep = "Early Bird"
  } else if (props.sleep === "Night Owl") {
    strSleep = "Night Owl"
  } else if (props.sleep === "Indifferent") {
    strSleep = "What's sleep?"
  }

  let strInteractive = ""
  if (props.keepOrInteract === "Interact"){
    strInteractive = "Interactive"
  } else if (props.keepOrInteract === "Keep to myself") {
    strInteractive = props.keepOrInteract
  }

  return (
    <View style={styles.interestContainer}>
      <Text style = {styles.text}>
        What I have:
      </Text>
      <Tags 
        initialTags={iHave.filter(n=>n)}
      readonly={true}/>

      <Text style = {styles.text}>What I am okay with: </Text>
      <Tags
        initialTags={[
          props.alc ? 'Alchol/420' : null,
          props.guests ? 'Guests Over' : null,
          props.roommatesStayingUp ? "Okay with roommates up late" : null,
          props.sharing ? "Sharing appliances" : null,
          props.drivingRoommates ? "Driving roommates" : null,
        ].filter(n=>n)}
        readonly={true}/>

      <Text style={styles.text}>
        What I like:
      </Text>

      <Tags
        initialTags={[
          "Cooking " + props.cooking,
          props.outside ? "Being outside" : "Stay inside",
          props.study ? "Studying in silence" : null,
          ].filter(n=>n)}
        readonly={true}
        />
      <Text style={styles.text}> Who I am: </Text>

      <Tags
        initialTags={[
          strSleep,
          strInteractive,
          props.communcation ? "Communicative" : null,
        ].filter(n=>n)}
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
    justifyContent: 'center',
  },
  rentHeaders: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    padding: 10,
    fontSize: 20,
    textAlign:'left'
  },
});
export default UserProfile;
