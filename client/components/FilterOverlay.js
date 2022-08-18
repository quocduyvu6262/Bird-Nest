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
import { Slider } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import Buttons from "./Button.js";
import { useDispatch, useSelector } from "react-redux";
import * as dataActions from '../redux/slices/data';


const FilterOverlay = ({overlayFilterButton}) => {
  DropDownPicker.setListMode("SCROLLVIEW");
  /**
   * Redux Hoook
   */
  const user = useSelector(state => state.data.userInfo);
  const housing = useSelector(state => state.data.housing);
  const dispatch = useDispatch();

  /**
   * Transform string value into integer value
   * @returns lease base on string range value
   */
   const getLeaseFromString = () => {
    if(housing.lease === '1 to 3'){
      return 1;
    }  
    if (housing.lease === '4 to 7'){
      return 4;
    } 
    if (housing.lease === '8 - 11'){
      return 8;
    } 
    return 12;
  }

  /**
   * Transform int value into string value
   * @returns string range value based on integer value
   */
  const getLeaseFromInteger = (lease) => {
    if(lease >=1 && lease <= 3){
      return '1 to 3';
    }
    if(lease >= 4 && lease <= 7){
      return '4 to 7';
    }
    if(lease >= 8 && lease <= 11){
      return '8 - 11';
    }
    return '12+'
  }


  /**
   * Declare state
   */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(housing.neighborhoodList);
  const [rent, setRent] = useState(housing.rent);
  const [lease, setLease] = useState(getLeaseFromString());
  const [squarefeet, setSquarefeet] = useState(housing.squarefeet);
  const [parking, setParking] = useState(housing.parking);
  const [gym, setGym] = useState(housing.gym);
  const [pool, setPool] = useState(housing.pool);
  const [appliances, setAppliances] = useState(housing.appliances);
  const [furniture, setFurniture] = useState(housing.furniture);
  const [AC, setAC] = useState(housing.AC);
  const [items, setItems] = useState([
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
  const itemcount = items.length;

  /**
   * Single switch function 
   * @param props 
   * @returns view
   */
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

  /**
   * Perform the filter submission
   */
  const submit = () => {
    // update redux
    console.log(lease);
    dispatch(dataActions.updateAllNeighborhoodList(value));
    dispatch(dataActions.updateRent(rent));
    dispatch(dataActions.updateLease(getLeaseFromInteger(lease)));
    dispatch(dataActions.updateSquarefeet(squarefeet));
    dispatch(dataActions.updateParking(parking));
    dispatch(dataActions.updateGym(gym));
    dispatch(dataActions.updatePool(pool));
    dispatch(dataActions.updateAppliances(appliances));
    dispatch(dataActions.updateAC(AC));
    // update Secure Store
    // back to birdfeed/peckview
    overlayFilterButton();
  }

  /**
   * Render Logic
   */
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
        <View style={styles.dropDown}>
          <Text style={styles.slideText}>Neighborhood: </Text>
          <DropDownPicker
            style={{ width: 175 }}
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
          <Text style={styles.slideText}>Rent : ${rent}</Text>
          <Slider
            value={rent}
            minimumValue={500}
            maximumValue={5000}
            step={25}
            onValueChange={(value) => setRent(value)}
            thumbStyle={{ height: 15, width: 15, backgroundColor: "#6736B6" }}
          />
        </View>

        <View style={styles.slider}>
          <Text style={styles.slideText}>Lease Month Term: {lease}</Text>
          <Slider
            value={lease}
            minimumValue={1}
            maximumValue={12}
            step={1}
            onValueChange={(value) => setLease(value)}
            thumbStyle={{ height: 15, width: 15, backgroundColor: "#6736B6" }}
          />
        </View>

        <View style={styles.slider}>
          <Text style={styles.slideText}>Square Feet : {squarefeet}</Text>
          <Slider
            value={squarefeet}
            minimumValue={100}
            maximumValue={6000}
            step={50}
            onValueChange={(value) => setSquarefeet(value)}
            thumbStyle={{ height: 15, width: 15, backgroundColor: "#6736B6" }}
          />
        </View>

        <SingleSwitch
          variable="Parking"
          enabled={parking}
          toggle={() => setParking(state => !state)}
        />

        <SingleSwitch
          variable="Gym"
          enabled={gym}
          toggle={() => setGym(state => !state)}
        />
        <SingleSwitch
          variable="Pool"
          enabled={pool}
          toggle={() => setPool(state => !state)}
        />

        <SingleSwitch
          variable="Appliances"
          enabled={appliances}
          toggle={() => setAppliances(state => !state)}
        />

        <SingleSwitch
          variable="Furniture"
          enabled={furniture}
          toggle={() => setFurniture(state => !state)}
        />

        <SingleSwitch
          variable="AC"
          enabled={AC}
          toggle={() => setAC(state => !state)}
        />

        <Buttons style={{ flex: 1 }} onPress={submit}>
          Submit
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
    zIndex: 2,
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
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  slideText: {
    alignSelf: "center",
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
