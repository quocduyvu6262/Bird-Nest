import { 
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,

} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Slider } from '@rneui/themed';
// List of variables

// 10 buttons yes/no type questions
// 2 buttons cities/neighborhoods
// 1 string
// 3 sliders

// - age /slider/  *DONE* 
// - gender /buttons/
// - pet *buttons*
// - alcohol/420 friendly *buttons*
// - sleep habits *buttons*
// - guest over *buttons*
// - cleaniness *buttons*
// - temperature *buttons*
// - sound *buttons*
// - awake *buttons*
// - sharing *buttons*
// - interaction with roommates *buttons*
// - neighborhood *buttons*
// - city *buttons*
// - lease *slider*
// - rent *slider*
const FilterOverlay = (
  {navigation, 
  overlayButton,
  props,

  ageState,
  setAgeState,

  switchEnabledSqua,
  toggleSwitchSqua,

  switchEnabledPri,
  toggleSwitchPri,

  switchEnabledIn,
  toggleSwitchIn,

  switchEnabledPer,
  toggleSwitchPer,

  switchEnabledRoo,
  toggleSwitchRoo,

  switchEnabledYes,
  toggleSwitchYes,

  switchEnabledNo,
  toggleSwitchNo,

  switchEnabledRec,
  toggleSwitchRec,

  switchEnabledApt,
  toggleSwitchApt }) => {

  const SingleSwitch = (props) => {
    return (
      <View style={styles.switchView}>
        <Switch
          trackColor={{ false: "%767577", true: "green" }}
          thumbColor={props.enabled ? "#white" : "white"}
          onValueChange={props.toggle}
          value={props.enabled}
        />
        <Text style={styles.switchText}>
          {props.variable}
        </Text>
      </View>
    );
  };

  const MultipleButtons = (props) => {
    return (
      <View style = {styles.switchView}>
        
      </View>
    )
  }
  return (
    <View style={styles.subContainer}>
      <ScrollView style={styles.filterCard}>
        <TouchableOpacity
          style={styles.filterHeader}
          onPress={overlayButton}
          >
          <Icon name="west" size={30} />
            <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <View style={styles.slider}>
          <Text style = {styles.slideText}>
            Age : {ageState}
          </Text>
          <Slider
            value={ageState}
            minimumValue={18}
            maximumValue={99}
            step={1}
            onValueChange={value => setAgeState(value)}
            style={styles.slider}
            thumbStyle={{height: 15, width: 15, backgroundColor:'#6736B6'}}
          />
        </View>

        <SingleSwitch
          variable="Square Footage"
          enabled={switchEnabledSqua}
          toggle={toggleSwitchSqua}
        />

        <SingleSwitch
          variable="Price Range"
          enabled={switchEnabledPri}
          toggle={toggleSwitchPri}
        />

        <SingleSwitch
          variable="Indoor Parking"
          enabled={switchEnabledIn}
          toggle={toggleSwitchIn}
        />

        <SingleSwitch
          variable="Percent Matched"
          enabled={switchEnabledPer}
          toggle={toggleSwitchPer}
        />

        <SingleSwitch
          variable="# of Roommates"
          enabled={switchEnabledRoo}
          toggle={toggleSwitchRoo}
        />

        <SingleSwitch
          variable="Pecked Yes"
          enabled={switchEnabledYes}
          toggle={toggleSwitchYes}
        />

        <SingleSwitch
          variable="Pecked No"
          enabled={switchEnabledNo}
          toggle={toggleSwitchNo}
        />

        <SingleSwitch
          variable="Most Recent"
          enabled={switchEnabledRec}
          toggle={toggleSwitchRec}
        />

        <SingleSwitch
          variable="Apartment"
          enabled={switchEnabledApt}
          toggle={toggleSwitchApt}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  subContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "120%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  input: {
    alignSelf: "flex-start",
    flexDirection: "row",
    color: "black",
  },
  filterCard: {
    backgroundColor: "white",
    marginTop: 100,
    position: "absolute",
    zIndex: 2,
    alignSelf: "auto",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 15,
    width: "100%",
    height: 450,
  },
  filterHeader: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "42%",
    justifyContent: "space-between",
  },
  filterText: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Pacifico_400Regular",
    color: "#560CCE",
  },
  switchView: {
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    fontSize: 20,
  },
  slider: {
    flex:1,
    width: 150,
    alignSelf:'flex-start',
    marginLeft: 15,
    justifyContent: 'center',
  },
  slideText: {
    alignSelf:'center',
    flexDirection: "column",
    marginLeft: 5,
    fontSize: 20,
  },
});
export default FilterOverlay;
