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
  export default class BasicInfo extends Component {

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
        backgroundColor: '#D9D9D9'
      };
      state16 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state17 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state18 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state19 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state20 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state21 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state22 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state23 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state24 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state25 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state26 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state27 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state28 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state29 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state30 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state31 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state32 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state41 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state42 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state43 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state44 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state45 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state46 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state47 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state48 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state49 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state50 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state51 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state52 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state53 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state54 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state55 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state56 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state57 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state58 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state59 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
      };
      state60 = {
        pressed: false,
        backgroundColor: '#D9D9D9'
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
          <Text style={HousingHeader_styles.headerText}>Habits (3/5)</Text>
          <TouchableOpacity style={{alignSelf: 'flex-start'}}>
            <Text style={HousingHeader_styles.returnToProfileArrow}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            
            >{"< "}</Text>
            <Text style={HousingHeader_styles.returnToProfile}>Roles</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={[HousingQ_styles.question1, {marginTop: 120}]}>Select the type of pet(s) that</Text>
          <Text style={HousingQ_styles.question1}>you own:</Text>
          <TouchableOpacity style={[this.state15, HousingQ_styles.buttonContainerYes4]}
          onPress={()=>this.selectMany(this.state15)}>
            <Text style = {HousingQ_styles.buttonText}>Dog</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state16, HousingQ_styles.buttonContainerNo4]}
          onPress={()=>this.selectMany(this.state16)}>
            <Text style = {HousingQ_styles.buttonText}>Cat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state17, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>this.selectMany(this.state17)}>
            <Text style = {HousingQ_styles.buttonText}>Fish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state18, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>this.selectMany(this.state18)}>
            <Text style = {HousingQ_styles.buttonText}>Snake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state19, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>this.selectMany(this.state19)}>
            <Text style = {HousingQ_styles.buttonText}>Turtle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state20, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>this.selectMany(this.state20)}>
            <Text style = {HousingQ_styles.buttonText}>Hamster</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state21, HousingQ_styles.buttonContainerYes5]}
          onPress={()=>this.selectMany(this.state21)}>
            <Text style = {HousingQ_styles.buttonText}>Guinea Pig</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state22, HousingQ_styles.buttonContainerNo5]}
          onPress={()=>this.selectMany(this.state22)}>
            <Text style = {HousingQ_styles.buttonText}>Other</Text>
          </TouchableOpacity>
         
         

          <Text style={[HousingQ_styles.question1, {marginTop: 10}]}>How often do you cook?</Text>
          <TouchableOpacity style={[this.state29, HousingQ_styles.buttonContainerYes7]}
          onPress={()=>this.changeMultipleColor(this.state29, this.state30, this.state31, this.state32)}>
            <Text style = {HousingQ_styles.buttonText}>Often</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state30, HousingQ_styles.buttonContainerNo7]}
          onPress={()=>this.changeMultipleColor(this.state30, this.state29, this.state31, this.state32)}>
            <Text style = {HousingQ_styles.buttonText}>Sometimes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state31, HousingQ_styles.buttonContainerYes8]}
          onPress={()=>this.changeMultipleColor(this.state31, this.state30, this.state29, this.state32)}>
            <Text style = {HousingQ_styles.buttonText}>Rarely</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state32, HousingQ_styles.buttonContainerNo8]}
          onPress={()=>this.changeMultipleColor(this.state32, this.state30, this.state29, this.state31)}>
            <Text style = {HousingQ_styles.buttonText}>Never</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question1}>Are you alcohol/420 friendly?</Text>
          <TouchableOpacity style={[this.state1, HousingQ_styles.buttonContainerYes1]} 
          onPress={()=>this.changeColor(this.state1, this.state2)}>
          <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state2, HousingQ_styles.buttonContainerNo1]}
          onPress={()=>this.changeColor(this.state2, this.state1)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question2}>What are your sleep habits?</Text>
          <TouchableOpacity style={[this.state3, HousingQ_styles.buttonContainerYes2]}
          onPress={()=>this.changeThreeColor(this.state3, this.state4, this.state41)}>
            <Text style = {HousingQ_styles.buttonText}>Morning Person</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state4, HousingQ_styles.buttonContainerNo2]}
          onPress={()=>this.changeThreeColor(this.state4, this.state3, this.state41)}>
            <Text style = {HousingQ_styles.buttonText}>Night Owl</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state41, HousingQ_styles.buttonContainerYes2, {marginTop: 43}, {marginBottom: -30}]}
          onPress={()=>this.changeThreeColor(this.state41, this.state4, this.state3)}>
            <Text style = {HousingQ_styles.buttonText}>Indifferent</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Are you okay with your</Text>
          <Text style={HousingQ_styles.question3}>roommates having guests over?</Text>  
          <TouchableOpacity style={[this.state5, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeColor(this.state5, this.state6)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state6, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>this.changeColor(this.state6, this.state5)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Do you spend most of your time</Text>
          <Text style={HousingQ_styles.question3}>outside of your room?</Text> 
          <TouchableOpacity style={[this.state7, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeThreeColor(this.state7, this.state8, this.state50)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state8, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>this.changeThreeColor(this.state8, this.state7, this.state50)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state50, HousingQ_styles.buttonContainerYes3, {marginTop: 43}, {marginBottom: -30}]}
          onPress={()=>this.changeThreeColor(this.state50, this.state7, this.state8)}>
            <Text style = {HousingQ_styles.buttonText}>Sometimes</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>When you study, do you need</Text>
          <Text style={HousingQ_styles.question3}>the room to be silent?</Text>  
          <TouchableOpacity style={[this.state9, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeColor(this.state9, this.state10)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state10, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>this.changeColor(this.state10, this.state9)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Are you okay with your</Text>
          <Text style={HousingQ_styles.question3}>roommate staying up to work</Text>
          <Text style={HousingQ_styles.question3}>while you sleep?</Text>
          <TouchableOpacity style={[this.state11, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeColor(this.state11, this.state12)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state12, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>this.changeColor(this.state12, this.state11)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Are you open to sharing</Text>
          <Text style={HousingQ_styles.question3}>appliances?</Text>
          <TouchableOpacity style={[this.state51, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeColor(this.state51, this.state52)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state52, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>this.changeColor(this.state52, this.state51)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>If you have a car, are you</Text>
          <Text style={HousingQ_styles.question3}>comfortable with driving</Text>
          <Text style={HousingQ_styles.question3}>your roommates?</Text>
          <TouchableOpacity style={[this.state56, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeThreeColor(this.state56, this.state57, this.state58)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state57, HousingQ_styles.buttonContainerNo3]}
          onPress={()=>this.changeThreeColor(this.state57, this.state56, this.state58)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state58, HousingQ_styles.buttonContainerYes3, {marginTop: 43}, {marginBottom: -30}]}
          onPress={()=>this.changeThreeColor(this.state58, this.state57, this.state56)}>
            <Text style = {HousingQ_styles.buttonText}>Don't have car</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>Do you tend to keep</Text>
          <Text style={HousingQ_styles.question3}>to yourself or interact</Text>
          <Text style={HousingQ_styles.question3}>with your roommates?</Text>
          <TouchableOpacity style={[this.state59, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeColor(this.state59, this.state60)}>
            <Text style = {HousingQ_styles.buttonText}>Keep to myself</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state60, HousingQ_styles.buttonContainerNo3, {bottom: 1}]}
          onPress={()=>this.changeColor(this.state60, this.state59)}>
            <Text style = {HousingQ_styles.buttonText}>Interact</Text>
          </TouchableOpacity>

          <Text style={HousingQ_styles.question3}>If something is bothering you,</Text>
          <Text style={HousingQ_styles.question3}>will you tell your roommate</Text>
          <Text style={HousingQ_styles.question3}>right away?</Text>  
          <TouchableOpacity style={[this.state54, HousingQ_styles.buttonContainerYes3]}
          onPress={()=>this.changeColor(this.state54, this.state55)}>
            <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.state55, HousingQ_styles.buttonContainerNo3, {marginBottom: 110}]}
          onPress={()=>this.changeColor(this.state55, this.state54)}>
            <Text style = {HousingQ_styles.buttonText}>No</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HousingQ_styles.nextButton}
          onPress={()=>{
            this.createHousingInfo();
            this.props.navigation.navigate('HasHousingQ');
          }}>
            <Text style = {[HousingQ_styles.buttonText, {color:'#FFF'}]}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
     
  );
  }
}


// MAP DISPATCH
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: (func) => dispatch(func)
  }
};


// STYLES
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



