import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";

import React, { Component, useState } from "react";
import { Icon } from "@rneui/themed";
import AppLoading from 'expo';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Slider} from '@rneui/themed';
// Redux
import {useDispatch, useSelector, connect} from 'react-redux';
import * as dataActions from '../../redux/slices/data';

class HasHousingQ extends Component {
  
  constructor(props){
    super(props)
  }
  userInfo = this.props.userInfo;
  housing = this.props.housing;

  fieldState = {blankError: ""};
  validate = (housing) => {
    if ((this.props.housing.neighborhood !== null) && (this.props.housing.rent !== null) && (this.props.housing.lease !== null)
      && (this.props.housing.garage !== null) && (this.props.housing.parking !== null) && (this.props.housing.gym !== null)
      && (this.props.housing.pool !== null) && (this.props.housing.appliances !== null) && (this.props.housing.furniture !== null)
      && (this.props.housing.AC !== null)) {
      return true;
    }
    else {
      return false;
    }
  }  

  setField = () => {
    this.fieldState = {blankError: "Please fill in all required fields*"};
    this.setState({blankError: "Please fill in all required fields*"});
  }

  clearField = () => {
    this.fieldState = {blankError: ""};
    this.setState({blankError: ""});
  }
  
    slider_state = {
      language: "English",
      value: this.props.housing.rent
    };
    state1 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state2 = {
      name: false,
      pressed: false,
      backgroundColor:  '#D9D9D9'
    };
    state3 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state4 = {
      name: false,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state5 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state6 = {
      name: false,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state7 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state8 = {
      name: false,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state9 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state10 = {
      name: false,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state11 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state12 = {
      name: false,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state13 = {
      name: true,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state14 = {
      name: false,
      pressed: false,
      backgroundColor: '#D9D9D9'
    };
    state15 = {
      name: 'Downtown SD',
      pressed: this.props.housing.neighborhood === 'Downtown SD',
      backgroundColor: this.props.housing.neighborhood === 'Downtown SD' ? '#3B9CF1' : '#D9D9D9'
    };
    state16 = {
      name: 'La Jolla',
      pressed: this.props.housing.neighborhood === 'La Jolla',
      backgroundColor: this.props.housing.neighborhood === 'La Jolla' ? '#3B9CF1' : '#D9D9D9'
    };
    state17 = {
      name: 'Del Mar',
      pressed: this.props.housing.neighborhood === 'Del Mar',
      backgroundColor: this.props.housing.neighborhood === 'Del Mar' ? '#3B9CF1' : '#D9D9D9'
    };
    state18 = {
      name: 'Mira Mesa',
      pressed: this.props.housing.neighborhood === 'Mira Mesa',
      backgroundColor: this.props.housing.neighborhood === 'Mira Mesa' ? '#3B9CF1' : '#D9D9D9'
    };
    state19 = {
      name: 'Pacific Beach',
      pressed: this.props.housing.neighborhood === 'Pacific Beach',
      backgroundColor: this.props.housing.neighborhood === 'Pacific Beach' ? '#3B9CF1' : '#D9D9D9'
    };
    state20 = {
      name: 'Clairemont',
      pressed: this.props.housing.neighborhood === 'Clairemont',
      backgroundColor: this.props.housing.neighborhood === 'Clairemont' ? '#3B9CF1' : '#D9D9D9'
    };
    state21 = {
      name: 'University City',
      pressed: this.props.housing.neighborhood === 'University City',
      backgroundColor: this.props.housing.neighborhood === 'University City' ? '#3B9CF1' : '#D9D9D9'
    };
    state22 = {
      name: 'UTC',
      pressed: this.props.housing.neighborhood === 'UTC',
      backgroundColor: this.props.housing.neighborhood === 'UTC' ? '#3B9CF1' : '#D9D9D9'
    };
    state23 = {
      name: 'Kerny Mesa',
      pressed: this.props.housing.neighborhood === 'Kerny Mesa',
      backgroundColor: this.props.housing.neighborhood === 'Kerny Mesa' ? '#3B9CF1' : '#D9D9D9'
    };
    state24 = {
      name: 'Solana Beach',
      pressed: this.props.housing.neighborhood === 'Solana Beach',
      backgroundColor: this.props.housing.neighborhood === 'Solana Beach' ? '#3B9CF1' : '#D9D9D9'
    };
    state25 = {
      name: 'Mission Valley',
      pressed: this.props.housing.neighborhood === 'Mission Valley',
      backgroundColor: this.props.housing.neighborhood === 'Mission Valley' ? '#3B9CF1' : '#D9D9D9'
    };
    state26 = {
      name: 'Carmel Valley',
      pressed: this.props.housing.neighborhood === 'Carmel Valley',
      backgroundColor: this.props.housing.neighborhood === 'Carmel Valley' ? '#3B9CF1' : '#D9D9D9'
    };
    state27 = {
      name: 'Sorrento Valley',
      pressed: this.props.housing.neighborhood === 'Sorrento Valley',
      backgroundColor: this.props.housing.neighborhood === 'Sorrento Valley' ? '#3B9CF1' : '#D9D9D9'
    };
    state28 = {
      name: 'Other',
      pressed: this.props.housing.neighborhood === 'Other',
      backgroundColor: this.props.housing.neighborhood === 'Other' ? '#3B9CF1' : '#D9D9D9'
    };
    state29 = {
      pressed: this.props.housing.lease === '1 - 3',
      backgroundColor: this.props.housing.lease === '1 - 3' ? '#3B9CF1' : '#D9D9D9'
    };
    state30 = {
      pressed: this.props.housing.lease === '4 - 7',
      backgroundColor: this.props.housing.lease === '4 - 7' ? '#3B9CF1' : '#D9D9D9'
    };
    state31 = {
      pressed: this.props.housing.lease === '8 - 11',
      backgroundColor: this.props.housing.lease === '8 - 11' ? '#3B9CF1' : '#D9D9D9'
    };
    state32 = {
      pressed: this.props.housing.lease === '12+',
      backgroundColor: this.props.housing.lease === '12+' ? '#3B9CF1' : '#D9D9D9'
    };
  changeColor(state_a, state_b){
    if(state_a.pressed == false && state_b.pressed == true && state_b.backgroundColor == '#3B9CF1') {
      state_b.backgroundColor='#D9D9D9';
      state_a.backgroundColor='#3B9CF1';
      state_b.pressed=false;
      state_a.pressed=true;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({backgroundColor: state_b.backgroundColor});
      this.setState({pressed: state_a.pressed});
      this.setState({pressed: state_b.pressed});
    }
    else if(!state_a.pressed){
      state_a.backgroundColor='#3B9CF1';
      state_a.pressed=true;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({pressed: state_a.pressed});
    } 
    else {
      state_a.backgroundColor='#D9D9D9';
      state_a.pressed=false;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({pressed: state_a.pressed});
    }
  }
  changeMultipleColor(state_a, state_b, state_c, state_d){
    if(state_a.pressed == false && (state_b.pressed == true || state_c.pressed == true || state_d.pressed == true)  && (state_b.backgroundColor == '#3B9CF1' || state_c.backgroundColor == '#3B9CF1' || state_d.backgroundColor == '#3B9CF1')) {
      state_a.backgroundColor='#3B9CF1';
      state_b.backgroundColor='#D9D9D9';
      state_c.backgroundColor='#D9D9D9';
      state_d.backgroundColor='#D9D9D9';
      state_a.pressed=true;
      state_b.pressed=false;
      state_c.pressed=false;
      state_d.pressed=false;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({backgroundColor: state_b.backgroundColor});
      this.setState({backgroundColor: state_c.backgroundColor});
      this.setState({backgroundColor: state_d.backgroundColor});
      this.setState({pressed: state_a.pressed});
      this.setState({pressed: state_b.pressed});
      this.setState({pressed: state_c.pressed});
      this.setState({pressed: state_d.pressed});
    }
    else if(!state_a.pressed){
      state_a.backgroundColor='#3B9CF1';
      state_a.pressed=true;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({pressed: state_a.pressed});
    } 
    else {
      state_a.backgroundColor='#D9D9D9';
      state_a.pressed=false;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({pressed: state_a.pressed});
    }}
  changeMany(state_a, state_b, state_c, state_d, state_e, state_f, state_g, state_h, state_i, state_j, state_k, state_l, state_m, state_n){
    if(state_a.pressed == false && (state_b.pressed == true || state_c.pressed == true || state_d.pressed == true || state_e.pressed == true || state_f.pressed == true || state_g.pressed == true || state_h.pressed == true || state_i.pressed == true || state_j.pressed == true || state_k.pressed == true || state_l.pressed == true || state_m.pressed == true || state_n.pressed == true)  && (state_b.backgroundColor == '#3B9CF1' || state_c.backgroundColor == '#3B9CF1' || state_d.backgroundColor == '#3B9CF1' || state_e.backgroundColor == '#3B9CF1' || state_f.backgroundColor == '#3B9CF1' || state_g.backgroundColor == '#3B9CF1' || state_h.backgroundColor == '#3B9CF1' || state_i.backgroundColor == '#3B9CF1' || state_j.backgroundColor == '#3B9CF1' || state_k.backgroundColor == '#3B9CF1' || state_l.backgroundColor == '#3B9CF1' || state_m.backgroundColor == '#3B9CF1' || state_n.backgroundColor == '#3B9CF1')) {
      state_a.backgroundColor='#3B9CF1';
      state_b.backgroundColor='#D9D9D9';
      state_c.backgroundColor='#D9D9D9';
      state_d.backgroundColor='#D9D9D9';
      state_e.backgroundColor='#D9D9D9';
      state_f.backgroundColor='#D9D9D9';
      state_g.backgroundColor='#D9D9D9';
      state_h.backgroundColor='#D9D9D9';
      state_i.backgroundColor='#D9D9D9';
      state_j.backgroundColor='#D9D9D9';
      state_k.backgroundColor='#D9D9D9';
      state_l.backgroundColor='#D9D9D9';
      state_m.backgroundColor='#D9D9D9';
      state_n.backgroundColor='#D9D9D9';
      state_a.pressed=true;
      state_b.pressed=false;
      state_c.pressed=false;
      state_d.pressed=false;
      state_e.pressed=false;
      state_f.pressed=false;
      state_g.pressed=false;
      state_h.pressed=false;
      state_i.pressed=false;
      state_j.pressed=false;
      state_k.pressed=false;
      state_l.pressed=false;
      state_m.pressed=false;
      state_n.pressed=false;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({backgroundColor: state_b.backgroundColor});
      this.setState({backgroundColor: state_c.backgroundColor});
      this.setState({backgroundColor: state_d.backgroundColor});
      this.setState({backgroundColor: state_e.backgroundColor});
      this.setState({backgroundColor: state_f.backgroundColor});
      this.setState({backgroundColor: state_g.backgroundColor});
      this.setState({backgroundColor: state_h.backgroundColor});
      this.setState({backgroundColor: state_i.backgroundColor});
      this.setState({backgroundColor: state_j.backgroundColor});
      this.setState({backgroundColor: state_k.backgroundColor});
      this.setState({backgroundColor: state_l.backgroundColor});
      this.setState({backgroundColor: state_m.backgroundColor});
      this.setState({backgroundColor: state_n.backgroundColor});
      this.setState({pressed: state_a.pressed});
      this.setState({pressed: state_b.pressed});
      this.setState({pressed: state_c.pressed});
      this.setState({pressed: state_d.pressed});
      this.setState({pressed: state_e.pressed});
      this.setState({pressed: state_f.pressed});
      this.setState({pressed: state_g.pressed});
      this.setState({pressed: state_h.pressed});
      this.setState({pressed: state_i.pressed});
      this.setState({pressed: state_j.pressed});
      this.setState({pressed: state_k.pressed});
      this.setState({pressed: state_l.pressed});
      this.setState({pressed: state_m.pressed});
      this.setState({pressed: state_n.pressed});
    }
    else if(!state_a.pressed){
      state_a.backgroundColor='#3B9CF1';
      state_a.pressed=true;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({pressed: state_a.pressed});
    } 
    else {
      state_a.backgroundColor='#D9D9D9';
      state_a.pressed=false;
      this.setState({backgroundColor: state_a.backgroundColor});
      this.setState({pressed: state_a.pressed});
    }
  }
  selectMany(state){
    if(!state.pressed){
      state.backgroundColor='#3B9CF1';
      state.pressed=true;
      this.setState({backgroundColor: state.backgroundColor});
      this.setState({pressed: state.pressed});
    } 
    else {
      state.backgroundColor='#D9D9D9';
      state.pressed=false;
      this.setState({backgroundColor: state.backgroundColor});
      this.setState({pressed: state.pressed});
    }
  }
  handleSliderChange = (value1) => {
    this.slider_state.value = value1;
    this.setState({value: this.slider_state.value});
    this.props.dispatch(dataActions.updateRent(value1))
  }
  render() {
  
  return (
    <SafeAreaView style={HousingQ_styles.container}>
        <View style={HousingHeader_styles.header}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.goBack()}
              style={HousingHeader_styles.returnToProfileArrow}>
                <Image
                  source={require("../../assets/backArrow.png")}
                  style={HousingHeader_styles.backIcon}
                  />
                <Text style={HousingHeader_styles.backText}>Habits</Text>
            </TouchableOpacity>
          <Text style={HousingHeader_styles.headerText}>Housing (4/5)</Text>
        </View>
        <ScrollView>
          
          <Text 
          style={[HousingQ_styles.question1, {marginTop: 120}]}
          >What city or neighborhood is</Text>
          <Text style={HousingQ_styles.question1}>the property located in?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          <TouchableOpacity style={[this.state15, HousingQ_styles.buttonContainerYes4]}
          onPress={()=>{
            this.changeMany(this.state15, this.state16, this.state17, this.state18, this.state19, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state15.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Downtown SD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state16, HousingQ_styles.buttonContainerNo4]}
          onPress={()=>{
            this.changeMany(this.state16, this.state15, this.state17, this.state18, this.state19, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state16.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>La Jolla</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state17, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>{
            this.changeMany(this.state17, this.state16, this.state15, this.state18, this.state19, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state17.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Del Mar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state18, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>{
            this.changeMany(this.state18, this.state16, this.state17, this.state15, this.state19, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state18.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Mira Mesa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state19, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>{
            this.changeMany(this.state19, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state19.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Pacific Beach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state20, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>{
            this.changeMany(this.state20, this.state16, this.state17, this.state18, this.state15, this.state19, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state20.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Clairemont</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state21, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>{
            this.changeMany(this.state21, this.state16, this.state17, this.state18, this.state15, this.state20, this.state19, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state21.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>University City</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state22, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>{
            this.changeMany(this.state22, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state19, this.state23, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state22.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>UTC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state23, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>{
            this.changeMany(this.state23, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state19, this.state24, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state23.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Kearny Mesa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state24, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>{
            this.changeMany(this.state24, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state23, this.state19, this.state25, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state24.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Solana Beach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state25, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>{
            this.changeMany(this.state25, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state23, this.state24, this.state19, this.state26, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state25.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Mission Valley</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state26, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>{
            this.changeMany(this.state26, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state19, this.state27, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state26.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Carmel Valley</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state27, HousingQ_styles.buttonContainerYes6]}
          onPress={()=>{
            this.changeMany(this.state27, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state19, this.state28)
            this.props.dispatch(dataActions.updateNeighborhood(this.state27.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Sorrento Valley</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state28, HousingQ_styles.buttonContainerNo6]}
          onPress={()=>{
            this.changeMany(this.state28, this.state16, this.state17, this.state18, this.state15, this.state20, this.state21, this.state22, this.state23, this.state24, this.state25, this.state26, this.state27, this.state19)
            this.props.dispatch(dataActions.updateNeighborhood(this.state28.name));
          }}>
            <Text style = {HousingQ_styles.buttonText}>Other</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question1}>How much does a roomate need</Text>
          <Text style={HousingQ_styles.question1}>to pay in rent?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          
          <Slider 
            value={this.slider_state.value}
            maximumValue={5000}
            minimumValue={500}
            step={25}
            onValueChange={this.handleSliderChange}
            style={HousingQ_styles.slider}
            thumbStyle={{ height: 15, width: 15, backgroundColor:'#6736B6' }}
          >
          </Slider>
          <Text style = {HousingQ_styles.rentText}>Rent: ${this.slider_state.value}</Text>
         

          <Text style={HousingQ_styles.question1}>In terms of months, how long is</Text>
          <Text style={HousingQ_styles.question1}>the lease?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          <TouchableOpacity style={[this.state29, HousingQ_styles.buttonContainerYes7]}
          onPress={()=>{
            this.changeMultipleColor(this.state29, this.state30, this.state31, this.state32);
            this.props.dispatch(dataActions.updateLease("1 - 3"));
          }}>
            <Text style = {HousingQ_styles.buttonText}>1 to 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state30, HousingQ_styles.buttonContainerNo7]}
          onPress={()=>{
            this.changeMultipleColor(this.state30, this.state29, this.state31, this.state32)
            this.props.dispatch(dataActions.updateLease("4 - 7"))
          }}>
            <Text style = {HousingQ_styles.buttonText}>4 to 7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state31, HousingQ_styles.buttonContainerYes8]}
          onPress={()=>{
            this.changeMultipleColor(this.state31, this.state30, this.state29, this.state32)
            this.props.dispatch(dataActions.updateLease("8 - 11"));
          }}>
            <Text style = {HousingQ_styles.buttonText}>8 to 11</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state32, HousingQ_styles.buttonContainerNo8]}
          onPress={()=>{
            this.changeMultipleColor(this.state32, this.state30, this.state29, this.state31)
            this.props.dispatch(dataActions.updateLease("12+"));
          }}>
            <Text style = {HousingQ_styles.buttonText}>12 +</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question1}>Does the property have a</Text>
          <Text style={HousingQ_styles.question1}>garage?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          <TouchableOpacity style={[this.state1, HousingQ_styles.buttonContainerYes1]} 
          onPress={()=>{
            this.changeColor(this.state1, this.state2)
            this.props.dispatch(dataActions.updateGarage(this.state1.name))
          }}>
          <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state2, HousingQ_styles.buttonContainerNo1]}
          onPress={()=>{
            this.changeColor(this.state2, this.state1)
            this.props.dispatch(dataActions.updateGarage(this.state1.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question2}>Does the property have parking?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>  
          <TouchableOpacity style={[this.state3, HousingQ_styles.buttonContainerYes2]}
          onPress={()=>{
            this.changeColor(this.state3, this.state4)
            this.props.dispatch(dataActions.updateParking(this.state3.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state4, HousingQ_styles.buttonContainerNo2]}
          onPress={()=>{
            this.changeColor(this.state4, this.state3)
            this.props.dispatch(dataActions.updateParking(this.state4.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Does the property have a gym?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          <TouchableOpacity style={[this.state5, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>{
            this.changeColor(this.state5, this.state6)
            this.props.dispatch(dataActions.updateGym(this.state5.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state6, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>{
            this.changeColor(this.state6, this.state5)
            this.props.dispatch(dataActions.updateGym(this.state6.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Does the property have a pool?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          <TouchableOpacity style={[this.state7, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>{
            this.changeColor(this.state7, this.state8)
            this.props.dispatch(dataActions.updatePool(this.state7.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state8, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>{
            this.changeColor(this.state8, this.state7)
            this.props.dispatch(dataActions.updatePool(this.state8.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Does the property provide</Text>
          <Text style={HousingQ_styles.question3}>appliances for residents?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>  
          <TouchableOpacity style={[this.state9, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>{
            this.changeColor(this.state9, this.state10)
            this.props.dispatch(dataActions.updateAppliances(this.state9.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state10, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>{
            this.changeColor(this.state10, this.state9)
            this.props.dispatch(dataActions.updateAppliances(this.state10.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Is the property already</Text>
          <Text style={HousingQ_styles.question3}>furnished?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text>
          <TouchableOpacity style={[this.state11, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>{
            this.changeColor(this.state11, this.state12)
            this.props.dispatch(dataActions.updateFurniture(this.state11.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state12, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>{
            this.changeColor(this.state12, this.state11)
            this.props.dispatch(dataActions.updateFurniture(this.state12.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Does the property have air</Text>
          <Text style={HousingQ_styles.question3}>conditioning?{" "}<Text style={HousingQ_styles.highlight}>*</Text></Text> 
          <TouchableOpacity style={[this.state13, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>{
            this.changeColor(this.state13, this.state14)
            this.props.dispatch(dataActions.updateAC(this.state13.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state14, HousingQ_styles.buttonContainerNo3, {marginBottom: 110}]}
          onPress={()=>{
            this.changeColor(this.state14, this.state13)
            this.props.dispatch(dataActions.updateAC(this.state14.name))
          }}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>
          <View>
            <Text style ={HousingQ_styles.invalidText}>
              {this.fieldState.blankError}
            </Text>
          </View>
          <TouchableOpacity
            style={HousingQ_styles.nextButton}
            onPress={() =>{
              if (!this.validate(this.props.housing)) {
                console.log("YOU SHALL NOT PASS");
                this.setField();
              }
              else {
                this.clearField();
                console.log("YOU SHALL PASS");
                this.props.navigation.navigate('Personality'); //
              }
            }}>
            <Text style={[HousingQ_styles.buttonText, { color: "#FFF" }]}>
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
     
  );
  }
}

// STYLE
const HousingHeader_styles = StyleSheet.create({
  header: {
    backgroundColor: "#6736B6",
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    height: 90,
    bottom: 50,
    marginBottom: -45
  },
  headerText: {
    flex: 2,
    top: 20,
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  returnToProfileArrow: {
    left: 5,
    top: 20,
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: "#FFF",
    marginRight: -5,
   },
   backText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: 'bold',
   },
});

const HousingQ_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  slider: {
    bottom: 90,
    marginTop: 40,
    marginBottom: 30,
    width: 260,
    left: 50
  },
  highlight: {
    color: "red",
  },
  question1: {
    fontWeight: "400",
    color: "#3d3e40",
    fontSize: 19,
    bottom: 95,
    left: 49
  },
  buttonText: {
    fontWeight: "bold",
    color:"#000000",
    textAlign:'center',
  },
  rentText: {
    fontWeight: "bold",
    color:"#000000",
    textAlign:'center',
    bottom: 185
  },
  buttonContainerYes1: {
    right:50,
    marginTop:-80,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    
  },
  buttonContainerNo1: {
    left:100,
    top:43,
    marginTop:-80,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
  },
  question2: {
    fontWeight: "400",
    color: "#3d3e40",
    fontSize: 19,
    top: 90,
    left: 49
  },
  buttonContainerYes2: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop:108,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
  },
  buttonContainerNo2: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top:33,
    marginTop:-70,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
  },
  question3: {
    fontWeight: "400",
    color: "#3d3e40",
    fontSize: 19,
    top: 80,
    left: 49
  },
  buttonContainerYes3: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop:100,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
  },
  buttonContainerNo3: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-70,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
  },
  buttonContainerYes4: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop:100,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    bottom: 180
  },
  buttonContainerNo4: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-90,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    top: -127
  },
  buttonContainerYes5: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop: 65,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    bottom: 180
  },
  buttonContainerNo5: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-90,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    top: -127
  },
  buttonContainerYes6: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop: 65,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    bottom: 180
  },
  buttonContainerNo6: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-90,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    marginBottom: 13,
    borderRadius:23,
    top: -127
  },
  buttonContainerYes7: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop: 100,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    bottom: 180
  },
  buttonContainerNo7: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-90,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    marginBottom: 13,
    borderRadius:23,
    top: -127
  },
  buttonContainerYes8: {
    fontWeight: "bold",
    textAlign:'center',
    right:50,
    marginTop: 50,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    borderRadius:23,
    bottom: 180
  },
  buttonContainerNo8: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-90,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    marginBottom: 13,
    borderRadius:23,
    top: -127
  },
  rentButton: {
    fontWeight: "bold",
    textAlign:'center',
    left:100,
    top: 33,
    marginTop:-90,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:100,
    marginRight:150,
    marginBottom: 13,
    borderRadius:23,
    top: -127
  },
  invalidText: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
    alignItems: "center",
    bottom: 40,
  },
  nextButton: {
    fontWeight: "bold",
    textAlign:'center',
    left:24,
    top: 33,
    marginTop:-70,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:110,
    marginRight:160,
    marginBottom: 90,
    borderRadius:23,
    top: 40,
    backgroundColor: "#6736B6",
  },
});

// DISPATCH
// MAP DISPATCH
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: (func) => dispatch(func)
  }
};

const mapStateToProps = state => ({
  userInfo: state.data.userInfo,
  housing: state.data.housing
});

export default connect(mapStateToProps, mapDispatchToProps)(HasHousingQ);