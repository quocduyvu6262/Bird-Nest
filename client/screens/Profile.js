import React, { useEffect, useState } from "react";
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
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import UserCard from "../components/UserCard";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer.js";
import * as SecureStore from "expo-secure-store";
import Axios from "axios";
import MainHeader from "../components/MainHeader";
import Deondre from "../assets/deondre.jpg";
// Import constants
import Constants from "../constants/constants";
// Redux
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ navigation }) => {
  
  let pics1 = ['file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/F03C646F-D001-4D78-B078-821223701D56.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/FBEC029D-FA07-4C7F-B443-AFB28C5EF429.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/2B245AE6-D164-4ED7-A54F-0111FE86EC33.jpg']
  let pics2 = ['file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/0A1630EF-0177-4E0C-8FBD-6BFB778F3263.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/14AEEF7D-3B83-4C8C-9A9C-298D9464E2CC.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/14B13BC3-149C-408F-99C1-0374078B9DB8.jpg']
  let pics3 = ['file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/D4824626-F148-479F-9067-0155BA03502B.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/BD98E0AD-0415-4BAC-A8BB-7545CBC17683.jpg', 'file:///var/mobile/Containers/Data/Application/6525879C-DFA1-4D73-BC39-9EA131D452A5/Library/Caches/ExponentExperienceData/%2540quocduyvu6262%252FBirdNest/ImagePicker/FFCF7FEF-FEE1-4BFD-B465-79B1A0F18ECC.jpg']

  const data = useSelector(state => state.data);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState();
  const [rent, setRent] = useState();
  const [lease, setLease] = useState();
  const [city, setCity] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [interestButtonClicked, setInterestButtonClicked] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const [opacity, setOpacity] = useState(1);

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
    console.log('ran true');
  }
  const closeDelete = () => {
    setDeleteImage(false);
    console.log('ran false');
  }
  const changeIndex = () => {
    setIndex(index+1);
  }
  const changeOpacity = () => {
    setOpacity(0.5);
  }
  // return screen
  let count1 = 0;
  var images1 = pics1.map(function(image) {
    if(count1 == 0) {
      count1 = count1 + 1;
      return (
        <TouchableOpacity key={image} onPress ={changeOpacity}>
          <Image style={{opacity: opacity, height: 125, width: 125, borderColor: 'black', borderWidth: 1}} source={{ uri: image}} ></Image>
        </TouchableOpacity>
      )
    }
    else if(count1 == 1) {
      count1 = count1 + 1;
      return (
        <TouchableOpacity key={image} onPress ={changeOpacity}>
          <Image style={{opacity: opacity, height: 125, width: 125, borderColor: 'black', borderWidth: 1}} source={{ uri: image}} ></Image>
        </TouchableOpacity>
      )
    }
    else if (count1 == 2) {
      count1 = 0;
      return (
        <TouchableOpacity key={image} onPress ={changeOpacity}>
          <Image style={{opacity: opacity, height: 125, width: 125, borderColor: 'black', borderWidth: 1}} source={{ uri: image}} ></Image>
        </TouchableOpacity>
      )
    }
   });
   var images2 = pics2.map(function(image) {
    return (
      <TouchableOpacity key={image} onPress ={changeIndex}>
        <Image style={{height: 125, width: 125, borderColor: 'black', borderWidth: 1}} onPress ={changeIndex} source={{ uri: image}} ></Image>
      </TouchableOpacity>
    )
   });
   var images3 = pics3.map(function(image) {
    return (
      <TouchableOpacity key={image} onPress ={changeIndex}>
        <Image style={{height: 125, width: 125, borderColor: 'black', borderWidth: 1}} onPress ={changeIndex} source={{ uri: image}} ></Image>
      </TouchableOpacity>
    )
    });

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Profile" navigation={navigation} />
      <ScrollView>
        <Background>
          <Modal
          transparent = {true}
          visible = {deleteImage}
          >
          <View style ={{backgroundColor:'#000000aa', flex: 1}}>
            <View style = {{backgroundColor:'#ffffff', flex: 1, padding: 14, borderRadius: 15, marginTop: 110, marginBottom: 110}}>

              <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity 
                  onPress={closeDelete}
                >
                  <Text style={{fontSize: 16, color: '#560CCE'}}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 16, color: '#560CCE', fontWeight: 'bold'}}>Delete photos</Text>
                <TouchableOpacity 
                 onPress={closeDelete}
                >
                  <Text style={{fontSize: 16, color: '#560CCE'}}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                {images1}
              </View>
              <View style={{flexDirection:'row', alignItems: 'flex-start', justifyContent: 'center',}}>
                {images2}
              </View>
              <View style={{flexDirection:'row', alignItems: 'flex-start', justifyContent: 'center',}}>
                {images3}
              </View>

              <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#560CCE', margin: 27}}>Select photos</Text>
              </View>

              <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={closeDelete} style ={{margin: 15, backgroundColor: '#560CCE', borderRadius: 30, padding: 10, width: 110 }}>
                  <Text 
                  style={{textAlign: 'center', fontSize: 15, color: '#ffffff', fontWeight: 'bold'}}
                  >Confirm</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          </Modal>
          <UserCard
            name={data.userInfo.firstname + " " + data.userInfo.lastname}
          />
          
          <View style={styles.buttonContainer}>
          <TouchableOpacity>
              <Button
                color={"black"}
                onPress={openDelete}
                style={
                  {
                    borderBottomWidth: 1,
                  }
                }
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
            {!buttonClicked && <BioInfo bio={data.userInfo.bio}></BioInfo>}

            {buttonClicked && (
              <RentInfo rent={data.housing.rent} lease={data.housing.lease} neighborhood={data.housing.neighborhood} />
            )}
          </InfoCard>

          <Button
            color={interestButtonClicked ? "#560CCE" : "black"}
            onPress={interestButton}
            style={
              interestButtonClicked && {
                borderBottomColor: "#560CCE",
                borderBottomWidth: 1,
              }
            }
          >
            See Interests/Personality
          </Button>

          {interestButtonClicked && (
            <InfoCard>
              <InterestInfo></InterestInfo>
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
      <Text style={styles.text}>
        {props.bio}
      </Text>
    </View>
  );
};

// Rent Info
const RentInfo = (props) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}> Rent:</Text> ${props.rent}
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}> Lease Term:</Text> {props.lease}{" "}
        months
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}> Neighborhood:</Text> {props.neighborhood}
      </Text>
    </View>
  );
};
// Interest Info
const InterestInfo = (props) => {
  return (
    <View style={styles.subContainer}>
      <Text style={styles.text}>Ice cream</Text>
      <Text style={styles.text}>Drink</Text>
      <Text style={styles.text}>Boba</Text>
      <Text style={styles.text}>Movie</Text>
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
  text: {
    padding: 10,
    fontSize: 20,
  },
});
export default Profile;
