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

// import Redux functionality
import { useDispatch, useSelector } from "react-redux";
import * as dataActions from "../redux/slices/data";

const EditProfile = ({ navigation }) => {
  /**
   * Store and retrieve data from Redux store
   */
  const userInfo = useSelector((state) => state.data.userInfo);
  const housing = useSelector((state) => state.data.housing);
  const dispatch = useDispatch();

  // state declarations
  const [sliderValue, setSliderValue] = useState(housing.rent);
  const [leaseTerm, setLeaseTerm] = useState(null);

  /**
   * Pull data from Redux Store and store into
   * Database and Secure Storage
   */
  const storeData = async () => {
    const user = this.props.data.userInfo;
    const housing = this.props.data.housing;
    // Store into Secure Store
    SecureStore.setItemAsync(
      Constants.MY_SECURE_AUTH_STATE_KEY_USER,
      JSON.stringify(user)
    );
    SecureStore.setItemAsync(
      Constants.MY_SECURE_AUTH_STATE_KEY_HOUSING,
      JSON.stringify(housing)
    );

    // Store user into database
    // TODO: Implement the method to store user data into database
    Axios.post(`${await Constants.BASE_URL()}/api/users/questionnaire`, {
      userInfo: user,
    }).catch((err) => {
      console.log("Fail to store user into database from questionnaire");
    });
    // Store housing into database
    // TODO: Implement the method to store housing data into database
    if (user.role === "Flamingo" || user.role === "Owl") {
      // Post to housing
      Axios.post(`${await Constants.BASE_URL()}/api/housings/create`, {
        user_id: user.id,
        housing: housing,
      })
        .then()
        .catch((err) => {
          console.log(housing.squarefeet);
          console.log("Fail to update/insert housing from questionnaire");
        });
    } else if (
      user.role === "Parrot" ||
      user.role === "Penguin" ||
      user.role === "Duck"
    ) {
      // Post to nohousing
      Axios.post(`${await Constants.BASE_URL()}/api/nohousing/create`, {
        user_id: user.id,
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
    dispatch(dataActions.updateRent(value));
  };

  // set lease term variable and update redux store
  const handleLeaseTerm = (value) => {
    // console.log(value);
    setLeaseTerm(value);
    dispatch(dataActions.updateLease(value));
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader screen="Edit Profile" navigation={navigation} />
      <Text>Rent: ${sliderValue}</Text>
      <Slider
        value={sliderValue}
        maximumValue={5000}
        minimumValue={0}
        step={25}
        onValueChange={(value) => handleSliderChange(value)}
        style={styles.slider}
        thumbStyle={{ height: 15, width: 15, backgroundColor: "#6736B6" }}
      />

      <Text>Choose Lease Term (months)</Text>
      {/* Radio Button Logic */}
      <View style={styles.radioButtonQuestion}>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("1 - 3")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "1 - 3" ? "#560CCE" : "lightgray",
                },
              ]}
            />
            <Text style={styles.radioButtonText}>1 to 3</Text>
          </View>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("4 - 7")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "4 - 7" ? "#560CCE" : "lightgray",
                },
              ]}
            />
            <Text style={styles.radioButtonText}>4 to 7</Text>
          </View>
        </View>

        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButtonAnswerCombo}>
            <TouchableOpacity
              onPress={() => handleLeaseTerm("8 - 11")}
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    leaseTerm === "8 - 11" ? "#560CCE" : "lightgray",
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  slider: {
    width: 260,
    left: 50,
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
});

export default EditProfile;
