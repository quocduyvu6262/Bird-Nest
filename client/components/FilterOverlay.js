import { 
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import Icon2 from "react-native-vector-icons/Ionicons";
// List of variables

// 13 buttons
// 3 sliders

// - age *slider*
// - gender *buttons*
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
  switchEnabledNeigh,
  toggleSwitchNeigh,
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
          <Text/> {props.variable}
        </Text>
      </View>
    );
  };
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

              <SingleSwitch
                variable="Neighborhood"
                enabled={switchEnabledNeigh}
                toggle={toggleSwitchNeigh}
              />

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
});
export default FilterOverlay;
