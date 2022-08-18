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
import DropDownPicker from 'react-native-dropdown-picker';
import Buttons from './Button.js';
// IMPORT REDUX
import { useDispatch, useSelector } from "react-redux";
import * as dataActions from "../redux/slices/data";
import Axios from "axios";
import Constants from "../constants/constants";
// List of variables

// 10 buttons yes/no type questions
// 2 buttons cities/neighborhoods
// 1 string
// 3 sliders

// Important ones to do for week 1
// - neighborhood /buttons/ *DONE*
// - lease /slider/ *DONE*
// - rent /slider/ *DONE*
// - parking /switch/ *DONE*
// - gym /switch/ *DONE*
// - pool /switch/ *DONE*
// - appliances /switch/ *DONE*
// - furniture /switch/ *DONE*
// - AC /switch/ *DONE*

// Second priority ones to do for week 2
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
// - role

const FilterOverlay = (
  
  {navigation, 
  overlayFilterButton,

  open,
  setOpen,

  value,
  setValue,

  items,
  setItems,

  itemcount,

  ageState,
  setAgeState,

  setRentState,
  rentState,

  setLeaseState,
  leaseState,

  setSqFtState,
  sqFtState,

  switchEnabledPar,
  toggleSwitchPar,

  switchEnabledGym,
  toggleSwitchGym,

  switchEnabledPoo,
  toggleSwitchPoo,

  switchEnabledApp,
  toggleSwitchApp,

  switchEnabledFur,
  toggleSwitchFur,

  switchEnabledAC,
  toggleSwitchAC,
  
}) => {
  DropDownPicker.setListMode("SCROLLVIEW");
  const userInfo = useSelector((state) => state.data.userInfo); //added in
  const dispatch = useDispatch();

  const Filter = async(filterMap) => {
    Axios.post(`${await Constants.BASE_URL()}/api/matching/filter`, {
      filterMap : filterMap
    })
    .then(async(filteredUsers) => {
      //set userlist from birdfeed to empty array then set it to the filteredUsers
    })
    .catch(err => {

    })
  }

const FilterOverlay = ({
  navigation,
  overlayFilterButton,

  open,
  setOpen,

  value,
  setValue,

  items,
  setItems,

  itemcount,

  setRentState,
  rentState,

  setLeaseState,
  leaseState,

  setSqFtState,
  sqFtState,

  switchEnabledPar,
  toggleSwitchPar,

  switchEnabledGym,
  toggleSwitchGym,

  switchEnabledPoo,
  toggleSwitchPoo,

  switchEnabledApp,
  toggleSwitchApp,

  switchEnabledFur,
  toggleSwitchFur,

  switchEnabledAC,
  toggleSwitchAC,
}) => {

  DropDownPicker.setListMode("SCROLLVIEW");
  const SingleSwitch = (props) => {
    return (
      <View style={styles.switchView}>
        <Switch
          trackColor={{ false: "%767577", true: "green" }}
          thumbColor={props.enabled ? "#white" : "white"}
          onValueChange={props.toggle}
          value={props.enabled}
        ></Switch>
        <Text style={styles.switchText}>
          <Text></Text>
          {props.enabled ? props.variable : `No ${props.variable}`}
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

        {/* <View style={styles.slider}>
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
        </View> */}
        <View style = {styles.dropDown}>
          <Text style = {styles.slideText }>Neighborhood: </Text>
          <DropDownPicker
            style = {{width: 175}}
            dropDownContainerStyle={{
              backgroundColor: "#dfdfdf",
              width: 175,
            }}
            placeholder="0 items has been selected"
            dropDownDirection="AUTO"
            multiple={true}
            min={0}
            max={itemcount}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            />
        </View>

        <View style={styles.slider}>
          <Text style = {styles.slideText}>
            Rent : ${rentState}
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
          variable="Parking"
          enabled={switchEnabledPar}
          toggle={toggleSwitchPar}
        />

        <SingleSwitch
          variable="Gym"
          enabled={switchEnabledGym}
          toggle={toggleSwitchGym}
        />
        <SingleSwitch
          variable="Pool"
          enabled={switchEnabledPoo}
          toggle={toggleSwitchPoo}
        />

        <SingleSwitch
          variable="Appliances"
          enabled={switchEnabledApp}
          toggle={toggleSwitchApp}
        />

      <SingleSwitch
          variable="Furniture"
          enabled={switchEnabledFur}
          toggle={toggleSwitchFur}
        />

      <SingleSwitch
          variable="AC"
          enabled={switchEnabledAC}
          toggle={toggleSwitchAC}
        />

        <Buttons
          style={{flex: 1}}
          onPress={() => {
          //console.log(value);
          //console.log(userInfo);
          let filterMap = new Map();
          filterMap.set("neighborhood", value); //!!!Array
          filterMap.set("rent", rentState);
          filterMap.set("lease", leaseState);
          filterMap.set("squarefeet", sqFtState);
          filterMap.set("parking", switchEnabledPar);
          filterMap.set("gym", switchEnabledGym);
          filterMap.set("pool", switchEnabledPoo);
          filterMap.set("appliances", switchEnabledApp);
          filterMap.set("furniture", switchEnabledFur);
          filterMap.set("AC", switchEnabledAC);
          Filter(filterMap);
        }}> Submit
         </Buttons>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "120%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  dropDown: {
    marginLeft: 10,
    zIndex:2,
    flexDirection: "row",
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
