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
  TextInput,

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
  overlayFilterButton,

  overlayDropDownClicked,
  overlayDropDownButton,
  
  props,

  ageState,
  setAgeState,

  neighborhood,
  setNeighborhood,

  setRentState,
  rentState,

  setLeaseState,
  leaseState,

  setSqFtState,
  sqFtState,

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
  return (
    <View style={styles.subContainer}>
      <ScrollView style={styles.filterCard}>
        <TouchableOpacity
          style={styles.filterHeader}
          onPress={overlayFilterButton}
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
            thumbStyle={{height: 15, width: 15, backgroundColor:'#6736B6'}}
          />
        </View>

        <View style = {styles.neighborText}>
          <Text style = {styles. slideText}>Neighborhood: </Text>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={overlayDropDownButton}>
          <Text
            onChangeText={setNeighborhood("Test")}>
              {neighborhood}
          </Text>
          </TouchableOpacity>
          {overlayDropDownClicked && (
            <View style = {styles.dropDownContainer}>
              <ScrollView style = {styles.dropDownCard}>
                <TouchableOpacity
                  style={styles.filterHeader}
                  onPress={overlayDropDownButton}>
                     <Icon name="west" size={30} />
                    <Text style = {styles.filterText}> Go back </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <Text>
                    La Jolla
                  </Text>
              </TouchableOpacity> */}
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.slider}>
          <Text style = {styles.slideText}>
            Rent : {rentState}
          </Text>
          <Slider
            value={rentState}
            minimumValue={500}
            maximumValue={5000}
            step={25}
            onValueChange={value => setRentState(value)}
            thumbStyle={{height: 15, width: 15, backgroundColor:'#6736B6'}}
          />
        </View>

        <View style={styles.slider}>
          <Text style = {styles.slideText}>
            Lease Month Term: {leaseState}
          </Text>
          <Slider
            value={leaseState}
            minimumValue={1}
            maximumValue={12}
            step={1}
            onValueChange={value => setLeaseState(value)}
            thumbStyle={{height: 15, width: 15, backgroundColor:'#6736B6'}}
          />
        </View>

        <View style={styles.slider}>
          <Text style = {styles.slideText}>
            Square Feet : {sqFtState}
          </Text>
          <Slider
            value={sqFtState}
            minimumValue={100}
            maximumValue={6000}
            step={50}
            onValueChange={value => setSqFtState(value)}
            thumbStyle={{height: 15, width: 15, backgroundColor:'#6736B6'}}
          />
        </View>

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
  dropDownContainer: {
    width: '100%',
    position: "absolute",
    zIndex: 2,
  },
  input: {
    width: 170,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  dropDown: {
    alignSelf: 'center',
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  dropDownCard: {
    alignSelf: 'center',
    width:'75%',
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: 'white',
    position: "absolute",
    zIndex: 2,
    borderColor: "black",
  },
  filterCard: {
    backgroundColor: "white",
    marginTop: 100,
    position: "absolute",
    zIndex: 2,
    alignSelf: "auto",
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
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  slideText: {
    alignSelf:'center',
    marginLeft: 5,
    fontSize: 20,
  },
  neighborText: { 
    backgroundColor: 'white',
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
});
export default FilterOverlay;
