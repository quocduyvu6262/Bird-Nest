import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MainHeader from "../components/MainHeader";
import { Slider } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import Axios from "axios";
import Constants from "../constants/constants";
import * as SecureStore from "expo-secure-store";

// import Redux functionality
import { useDispatch, useSelector } from "react-redux";
import * as dataActions from "../redux/slices/data";
import { TextInput } from "react-native-paper";

const EditProfile = ({ navigation }) => {
  /**
   * Store and retrieve data from Redux store
   */
  const userInfo = useSelector((state) => state.data.userInfo);
  const housing = useSelector((state) => state.data.housing);
  const dispatch = useDispatch();

  // console.log(userInfo.id);
  // console.log(housing);

  // state declarations
  const [sliderValue, setSliderValue] = useState(housing.rent);
  const [leaseTerm, setLeaseTerm] = useState(housing.lease);
  const [bioText, setBioText] = useState(userInfo.bio);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false); // neighborhood dropdown list
  const [neighborhoodValue, setNeighborhoodValue] = useState(userInfo.isHousing ? housing.neighborhood : housing.neighborhoodList);
  const [neighborhoodItems, setNeighborhoodItems] = useState([
    { label: "Downtown SD", value: "Downtown SD" },
    { label: "La Jolla", value: "La Jolla" },
    { label: "Del Mar", value: "Del Mar" },
    { label: "Mira Mesa", value: "Mira Mesa" },
    { label: "Pacific Beach", value: "Pacific Beach" },
    { label: "Clairemont", value: "Clairemont" },
    { label: "University City", value: "University City" },
    { label: "UTC", value: "UTC" },
    { label: "Solana Beach", value: "Solana Beach" },
    { label: "Mission Valley", value: "Mission Valley" },
    { label: "Carmel Valley", value: "Carmel Valley" },
    { label: "Sorrento Valley", value: "Sorrento Valley" },
    { label: "Other", value: "Other" },
  ]);

  // might need this as a fix later for the dropdown; ignore for now
  //   DropDownPicker.setListMode("SCROLLVIEW");

  /**
   * Pull data from Redux Store and store into
   * Database and Secure Storage
   */
  const storeData = async () => {
    // Store into Secure Store
    await SecureStore.setItemAsync(
      Constants.MY_SECURE_AUTH_STATE_KEY_USER,
      JSON.stringify(userInfo)
    );
    await SecureStore.setItemAsync(
      Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING,
      JSON.stringify(housing)
    );

    // Store user into database
    // TODO: Implement the method to store user data into database
    Axios.post(`${await Constants.BASE_URL()}/api/users/questionnaire`, {
      userInfo: userInfo,
    }).catch((err) => {
      console.log("Fail to store user into database from questionnaire");
    });
    // Store housing into database
    // TODO: Implement the method to store housing data into database
    if (userInfo.role === "Flamingo" || userInfo.role === "Owl") {
      // Post to housing
      Axios.post(`${await Constants.BASE_URL()}/api/housings/create`, {
        user_id: userInfo.id,
        housing: housing,
      })
        .then()
        .catch((err) => {
          console.log("Fail to update/insert housing from questionnaire");
        });
    } else if (
      userInfo.role === "Parrot" ||
      userInfo.role === "Penguin" ||
      userInfo.role === "Duck"
    ) {
      // Post to nohousing
      Axios.post(`${await Constants.BASE_URL()}/api/nohousing/create`, {
        user_id: userInfo.id,
        housing: housing,
      })
        .then()
        .catch((err) => {
          console.log("Fail to update/insert nohousing from questionnaire");
        });
    }
  };

  // set slider variable and update redux store
  const handleSliderChange = (value) => {
    setSliderValue(value);
    // dispatch(dataActions.updateRent(value));
  };

  // set lease term variable and update redux store
  const handleLeaseTerm = (value) => {
    // console.log(value);
    setLeaseTerm(value);
    // dispatch(dataActions.updateLease(value));
  };

  const handleBioText = (text) => {
    setBioText(text);
    // dispatch(dataActions.updateBio(text));
  };

  const handleSave = async () => {
    // update redux
    dispatch(dataActions.updateRent(sliderValue));
    dispatch(dataActions.updateLease(leaseTerm));
    dispatch(dataActions.updateBio(bioText));
    if(userInfo.isHousing){
      dispatch(dataActions.updateNeighborhood(neighborhoodValue));
    }else{
      dispatch(dataActions.updateAllNeighborhoodList(neighborhoodValue));
    }
    // update database
    await storeData();
    navigation.goBack();
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Edit Profile" navigation={navigation} />
      <Text style={[styles.headerText, { marginTop: 20 }]}>Change Rent</Text>
      <View style={styles.sliderWrapper}>
        <View style={styles.sliderText}>
          <Text>${sliderValue}</Text>
        </View>
        <Slider
          value={sliderValue}
          maximumValue={5000}
          minimumValue={0}
          step={25}
          onValueChange={(value) => handleSliderChange(value)}
          style={styles.slider}
          thumbStyle={{ height: 15, width: 15, backgroundColor: "#6736B6" }}
        />
      </View>

      <View style={styles.separator} />

      <Text style={styles.headerText}>Choose Lease Term (months)</Text>
      {/* Radio Button Logic */}
      <View style={styles.radioButtonQuestion}>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("1 to 3")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "1 to 3" ? "#560CCE" : "lightgray",
                },
              ]}
            />
            <Text style={styles.radioButtonText}>1 to 3</Text>
          </View>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("4 to 7")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "4 to 7" ? "#560CCE" : "lightgray",
                },
              ]}
            />
            <Text style={styles.radioButtonText}>4 to 7</Text>
          </View>
        </View>

        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("8 to 11")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "8 to 11" ? "#560CCE" : "lightgray",
                },
              ]}
            />
            <Text style={styles.radioButtonText}>8 to 11</Text>
          </View>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("12+")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "12+" ? "#560CCE" : "lightgray",
                },
              ]}
            />
            <Text style={styles.radioButtonText}>12+</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      {/* Neighborhood Dropdown List */}
      <Text style={styles.headerText}>Select Neighborhood</Text>
      <View style={styles.dropdown}>
        <DropDownPicker
          open={isNeighborhoodOpen}
          setOpen={setIsNeighborhoodOpen}
          value={neighborhoodValue}
          items={neighborhoodItems}
          setValue={setNeighborhoodValue}
          setItems={setNeighborhoodItems}
          style={{ backgroundColor: "#560CCE" }}
          textStyle={{ fontSize: 18, color: "white", fontWeight: "bold" }}
          dropDownContainerStyle={{ backgroundColor: "#560CCE" }}
        />
      </View>

      <View style={styles.separator} />

      {/* change bio input */}
      <Text style={styles.headerText}>Change Your Bio</Text>
      <TextInput
        label="Biography"
        placeholder="Enter Bio"
        value={bioText}
        onChangeText={(text) => handleBioText(text)}
        mode="outlined"
        style={{ width: 300, height: 50, alignSelf: "center" }}
      />

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 25,
    // marginTop: 30,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#560CCE",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  sliderWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  slider: {
    width: 260,
  },
  sliderText: {
    // backgroundColor: "red",
    // alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 55,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#560CCE",
    marginRight: 20,
  },
  radioButtonAnswerCombo: {
    flexDirection: "row",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "lightgray",
  },
  radioButtonQuestion: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioButtonGroup: {
    height: 60,
    justifyContent: "space-around",
  },
  radioButtonText: {
    marginLeft: 10,
  },
  dropdown: {
    width: 300,
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 10,
  },
  saveButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 200,
    backgroundColor: "#560CCE",
    marginTop: 80,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default EditProfile;
