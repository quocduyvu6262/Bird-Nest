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
  //import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
  import { Slider} from '@rneui/themed';
  import Axios from "axios";
  export default class NoHousingQ extends Component {

    createHousingInfo = () => {
      Axios.post("http://localhost:3000/api/housings/create", {
        user_id: 20,
        rent: 1250,
        city: "Kearny Mesa",
        lease: 5,
        garage: 1,
        parking: 0,
        gym: 1,
        pool: 0,
        appliances: 1,
        furniture: 0,
        ac: 1
      })
      .catch(error => console.log(error));
    };

      slider_state = {
        language: "English",
        value: 500
      };
      state1 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state2 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state3 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state4 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state5 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state6 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state7 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state8 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state9 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state10 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state11 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state12 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state13 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state14 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state15 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Downtown SD"
      };
      state16 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "La Jolla"
      };
      state17 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Del Mar"
      };
      state18 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Mira Mesa"
      };
      state19 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Pacific Beach"
      };
      state20 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Clairemont"
      };
      state21 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "University City"
      };
      state22 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "UTC"
      };
      state23 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Kearny Mesa"
      };
      state24 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Solana Beach"
      };
      state25 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Mission Valley"
      };
      state26 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Carmel Valley"
      };
      state27 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Sorrento Valley"
      };
      state28 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "Other"
      };
      state29 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "1 to 3"
      };
      state30 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "4 to 7"
      };
      state31 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "8 to 11"
      };
      state32 = {
        pressed: false,
        backgroundColor: '#D9D9D9',
        answer: "12+"
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
    }
    render() {
    
    return (
      <SafeAreaView style={HousingQ_styles.container}>
          <View style={HousingHeader_styles.header}>
            <Text style={HousingHeader_styles.headerText}>Housing (4/5)</Text>
            <TouchableOpacity style={{alignSelf: 'flex-start'}}>
              <Text style={HousingHeader_styles.returnToProfileArrow}>{"< "}</Text>
              <Text style={HousingHeader_styles.returnToProfile}>Habits</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={[HousingQ_styles.question1, {marginTop: 120}]}>What cities or neighborhoods</Text>
            <Text style={HousingQ_styles.question1}>are you interested to live in?</Text>
            <TouchableOpacity style={[this.state15, HousingQ_styles.buttonContainerYes4]}
            onPress={()=>this.selectMany(this.state15)}>
              <Text style = {HousingQ_styles.buttonText}>Downtown SD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state16, HousingQ_styles.buttonContainerNo4]}
            onPress={()=>this.selectMany(this.state16)}>
              <Text style = {HousingQ_styles.buttonText}>La Jolla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state17, HousingQ_styles.buttonContainerYes5]}
            onPress={()=>this.selectMany(this.state17)}>
              <Text style = {HousingQ_styles.buttonText}>Del Mar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state18, HousingQ_styles.buttonContainerNo5]}
            onPress={()=>this.selectMany(this.state18)}>
              <Text style = {HousingQ_styles.buttonText}>Mira Mesa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state19, HousingQ_styles.buttonContainerYes5]}
            onPress={()=>this.selectMany(this.state19)}>
              <Text style = {HousingQ_styles.buttonText}>Pacific Beach</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state20, HousingQ_styles.buttonContainerNo5]}
            onPress={()=>this.selectMany(this.state20)}>
              <Text style = {HousingQ_styles.buttonText}>Clairemont</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state21, HousingQ_styles.buttonContainerYes5]}
            onPress={()=>this.selectMany(this.state21)}>
              <Text style = {HousingQ_styles.buttonText}>University City</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state22, HousingQ_styles.buttonContainerNo5]}
            onPress={()=>this.selectMany(this.state22)}>
              <Text style = {HousingQ_styles.buttonText}>UTC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state23, HousingQ_styles.buttonContainerYes5]}
            onPress={()=>this.selectMany(this.state23)}>
              <Text style = {HousingQ_styles.buttonText}>Kearny Mesa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state24, HousingQ_styles.buttonContainerNo5]}
            onPress={()=>this.selectMany(this.state24)}>
              <Text style = {HousingQ_styles.buttonText}>Solana Beach</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state25, HousingQ_styles.buttonContainerYes5]}
            onPress={()=>this.selectMany(this.state25)}>
              <Text style = {HousingQ_styles.buttonText}>Mission Valley</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state26, HousingQ_styles.buttonContainerNo5]}
            onPress={()=>this.selectMany(this.state26)}>
              <Text style = {HousingQ_styles.buttonText}>Carmel Valley</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state27, HousingQ_styles.buttonContainerYes6]}
            onPress={()=>this.selectMany(this.state27)}>
              <Text style = {HousingQ_styles.buttonText}>Sorrento Valley</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state28, HousingQ_styles.buttonContainerNo6]}
            onPress={()=>this.selectMany(this.state28)}>
              <Text style = {HousingQ_styles.buttonText}>Other</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question1}>What is the maximum rent you</Text>
            <Text style={HousingQ_styles.question1}>are willing to pay?</Text>
            
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
            <Text style = {HousingQ_styles.rentText}>Max Rent: ${this.slider_state.value}</Text>
           

            <Text style={HousingQ_styles.question1}>In terms of months, how long of</Text>
            <Text style={HousingQ_styles.question1}>a lease are you looking for?</Text>
            <TouchableOpacity style={[this.state29, HousingQ_styles.buttonContainerYes7]}
            onPress={()=>this.changeMultipleColor(this.state29, this.state30, this.state31, this.state32)}>
              <Text style = {HousingQ_styles.buttonText}>1 to 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state30, HousingQ_styles.buttonContainerNo7]}
            onPress={()=>this.changeMultipleColor(this.state30, this.state29, this.state31, this.state32)}>
              <Text style = {HousingQ_styles.buttonText}>4 to 7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state31, HousingQ_styles.buttonContainerYes8]}
            onPress={()=>this.changeMultipleColor(this.state31, this.state30, this.state29, this.state32)}>
              <Text style = {HousingQ_styles.buttonText}>8 to 11</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state32, HousingQ_styles.buttonContainerNo8]}
            onPress={()=>this.changeMultipleColor(this.state32, this.state30, this.state29, this.state31)}>
              <Text style = {HousingQ_styles.buttonText}>12 +</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question1}>Do you need to have a garage at</Text>
            <Text style={HousingQ_styles.question1}>the property?</Text>  
            <TouchableOpacity style={[this.state1, HousingQ_styles.buttonContainerYes1]} 
            onPress={()=>this.changeColor(this.state1, this.state2)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state2, HousingQ_styles.buttonContainerNo1]}
            onPress={()=>this.changeColor(this.state2, this.state1)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question2}>Do you need to have parking at</Text>
            <Text style={HousingQ_styles.question2}>the property?</Text>  
            <TouchableOpacity style={[this.state3, HousingQ_styles.buttonContainerYes2]}
            onPress={()=>this.changeColor(this.state3, this.state4)}>
              <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state4, HousingQ_styles.buttonContainerNo2]}
            onPress={()=>this.changeColor(this.state4, this.state3)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question3}>Do you need to have a gym at</Text>
            <Text style={HousingQ_styles.question3}>the property?</Text>  
            <TouchableOpacity style={[this.state5, HousingQ_styles.buttonContainerYes3]}
            onPress={()=>this.changeColor(this.state5, this.state6)}>
              <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state6, HousingQ_styles.buttonContainerNo3]}
            onPress={()=>this.changeColor(this.state6, this.state5)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question3}>Do you need to have a pool at</Text>
            <Text style={HousingQ_styles.question3}>the property?</Text> 
            <TouchableOpacity style={[this.state7, HousingQ_styles.buttonContainerYes3]}
            onPress={()=>this.changeColor(this.state7, this.state8)}>
              <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state8, HousingQ_styles.buttonContainerNo3]}
            onPress={()=>this.changeColor(this.state8, this.state7)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question3}>Do you need the property to</Text>
            <Text style={HousingQ_styles.question3}>have appliances?</Text>  
            <TouchableOpacity style={[this.state9, HousingQ_styles.buttonContainerYes3]}
            onPress={()=>this.changeColor(this.state9, this.state10)}>
              <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state10, HousingQ_styles.buttonContainerNo3]}
            onPress={()=>this.changeColor(this.state10, this.state9)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question3}>Do you need the property to be</Text>
            <Text style={HousingQ_styles.question3}>furnished?</Text>
            <TouchableOpacity style={[this.state11, HousingQ_styles.buttonContainerYes3]}
            onPress={()=>this.changeColor(this.state11, this.state12)}>
              <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state12, HousingQ_styles.buttonContainerNo3]}
            onPress={()=>this.changeColor(this.state12, this.state11)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <Text style={HousingQ_styles.question3}>Do you want the property to</Text>
            <Text style={HousingQ_styles.question3}>have air conditioning?</Text> 
            <TouchableOpacity style={[this.state13, HousingQ_styles.buttonContainerYes3]}
            onPress={()=>this.changeColor(this.state13, this.state14)}>
              <Text style = {HousingQ_styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[this.state14, HousingQ_styles.buttonContainerNo3, {marginBottom: 110}]}
            onPress={()=>this.changeColor(this.state14, this.state13)}>
              <Text style = {HousingQ_styles.buttonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity style={HousingQ_styles.nextButton}
            onPress={()=>this.createHousingInfo()}>
              <Text style = {[HousingQ_styles.buttonText, {color:'#FFF'}]}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
       
    );
    }
  }
  const HousingHeader_styles = StyleSheet.create({
    header: {
      backgroundColor: "#6736B6",
      height: 90,
      bottom: 45,
      marginBottom: -45
    },
    headerText: {
      fontWeight: "bold",
      color: "#FFF",
      fontSize: 20,
      top: 53,
      textAlign: "center",
    },
    returnToProfile: {
      color: "#FFF",
      fontSize: 17,
      bottom: 4,
      left: 27,
    },
    returnToProfileArrow: {
      fontWeight: "600",
      color: "#FFF",
      fontSize: 30,
      top: 22,
      left: 5,
    }
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
