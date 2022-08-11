import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
  StatusBar,
  ScrollView,
  Touchable,
} from "react-native";
import React, { useState } from "react";

import MainHeader from "../components/MainHeader";
import Background from "../components/Background";
import PeckCard from "../components/PeckCard";
import UserCard from "../components/UserCard";
import Button from "../components/Button";
import InfoCard from "../components/InfoCard";

import Elie from "../assets/Elie.jpg";

const PeckView = ({ navigation }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const bioButton = () => {
    setButtonClicked(false);
  };

  const roomInfoButton = () => {
    setButtonClicked(true);
  };
  return (
    <SafeAreaView style={PeckView_Styles.container}>
      <MainHeader screen="Peck View" navigation={navigation} />
      <ScrollView>
        <Background>
          <PeckCard name="Elie" image={Elie}>
            
          </PeckCard>
          <View style={PeckView_Styles.buttonContainer}>
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
            {!buttonClicked && <BioInfo />}

            {buttonClicked && <RentInfo />}
          </InfoCard>
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
};

const BioInfo = () => {
  return (
    <View style={PeckView_Styles.subContainer}>
      <Text style={PeckView_Styles.text}>
        Currently looking for a person to take over my lease!
      </Text>
    </View>
  );
};

const RentInfo = () => {
  return (
    <View style={PeckView_Styles.subContainer}>
      <Text style={PeckView_Styles.text}>Rent: $2000</Text>

      <Text style={PeckView_Styles.text}>Lease Term: 12 months</Text>

      <Text style={PeckView_Styles.text}>City: La Jolla, California</Text>
    </View>
  );
};
const PeckView_Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  subContainer: {
    padding: 10,
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
});

export default PeckView;
