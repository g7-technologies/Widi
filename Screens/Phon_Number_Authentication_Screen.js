import React, { Component, useState } from 'react';
import { StyleSheet, Text,TouchableOpacity, TextInput, View, ScrollView,Dimensions} from 'react-native';
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
// import Toast from 'react-native-tiny-toast';
import CountDown from 'react-native-countdown-component';
import Toast from 'react-native-tiny-toast';


const windowwidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
// var btnstate=false;
export default class  App extends Component {
  constructor(props){
    super(props);
    this.state={
      pin1:'',
      pin2:'',
      pin3:'',
      pin4:'',
      pin5:'',
      pin6:'',
      otp:this.props.route.params.otp,
      err:false,
      btnstate:false,
      timer:true
    }
  }
  CheckValidtions=()=>{
    if(this.state.pin1=='' || this.state.pin2=='' || this.state.pin3=='' || this.state.pin4=='' || this.state.pin5=='' || this.state.pin6==''   ){
     alert('Please Provide Valid Pin')
    }else{
      var pin = this.state.pin1+this.state.pin2+this.state.pin3+this.state.pin4+this.state.pin5+this.state.pin6;
      console.log('otp',this.state.otp)
      console.log('pin',pin)
      if(pin == this.state.otp){
        console.log(this.props.route.params.phone)
        this.setState({err:false})
        this.props.navigation.navigate('Signup',{'phone':this.props.route.params.phone})
      }
      else{
        this.setState({err:true})
        console.log('ghalt pin entered')
      }
    }
  }

resendCode=()=>{
  var oottpp = Math.floor(100000 + Math.random() * 900000);
  this.setState({btnstate:!this.state.btnstate,timer:true,otp:oottpp,err:''})
  
var number=this.props.route.params.phone

      const formData = new FormData()
        formData.append('number', number);
        formData.append('otp', oottpp);
        try{
          fetch('http://www.g7technologies.com/widi/api/customer_send_otp', {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body:formData
          })
          .then((response) => response.json())
          .then((responseJson) => {
           console.log(responseJson)
            
          })
          .catch((error) =>{});
        }catch(e){}

}



 render(){
  return (
    <View style={styles.container}>
     <ScrollView>
      <View style={{height:150}}/>
    <Text style={styles.text}>Enter your verification code</Text>
    <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly'}}>
    <TextInput 
      keyboardType='decimal-pad'
      ref={'pin1ref'} 
      // placeholder='0'
      onChangeText={(pin1)=>{this.setState({pin1:pin1},()=>{
        if(pin1!=''){
      this.refs.pin2ref.focus()
      }else{
        this.refs.pin1ref.focus()
      }
    }) }}
       autoFocus={true}
       maxLength={1}
      
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    <TextInput 
      ref={'pin2ref'} 
      // placeholder='0'
      onChangeText={(pin2)=>{this.setState({pin2:pin2},()=>{
        if(pin2!=''){
      this.refs.pin3ref.focus()
      }else{
        this.refs.pin1ref.focus()
      }
    }) }}
      
       maxLength={1}
       keyboardType={'number-pad'} 
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    
    <TextInput 
      ref={'pin3ref'} 
      // placeholder='0'
      onChangeText={(pin3)=>{this.setState({pin3:pin3},()=>{if(pin3!=''){
      this.refs.pin4ref.focus()
      }else{
        this.refs.pin2ref.focus()
      }}) }}
       
       maxLength={1}
       keyboardType={'number-pad'} 
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    <TextInput 
      ref={'pin4ref'} 
      // placeholder='0'
      onChangeText={(pin4)=>{this.setState({pin4:pin4},()=>{if(pin4!=''){
      this.refs.pin5ref.focus()
      }else{
        this.refs.pin3ref.focus()
      }
    }) }}
       
       maxLength={1}
       keyboardType={'number-pad'} 
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    <TextInput 
      ref={'pin5ref'} 
      // placeholder='0'
      onChangeText={(pin5)=>{this.setState({pin5:pin5},()=>{if(pin5!=''){
      this.refs.pin6ref.focus()
      }else{
        this.refs.pin4ref.focus()
      }
    }) }}
       
       maxLength={1}
       keyboardType={'number-pad'} 
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    <TextInput 
      ref={'pin6ref'} 
      // placeholder='0'
      onChangeText={(pin6)=>{this.setState({pin6:pin6},
        
        ()=>
        {if(pin6!=''){
       this.CheckValidtions()
        }else{
          this.refs.pin5ref.focus()
        }
        }
        ) }}
    
       maxLength={1}
       keyboardType={'number-pad'} 
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    </View>
    {this.state.err?
    <Text style={{color:'red',alignSelf:'center'}}>Invalid pin entered</Text>
    :
   null
   }

   {this.state.timer?
//     <CountDown
//   until={30}
//   onFinish={()=>this.setState({btnstate:!this.state.btnstate,timer:false,err:false})}
//   onPress={() => alert('hello')}
//   size={20}
// />
   <CountDown
   size={20}
   until={60}
   onFinish={()=>this.setState({btnstate:!this.state.btnstate,timer:false,err:false})}
   digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#0f76de'}}
   digitTxtStyle={{color: '#0f76de'}}
   timeToShow={['S']}
   timeLabels={{m: null, s: null}}
 />
:
null}
   

   {this.state.btnstate?
   <TouchableOpacity onPress={()=>this.resendCode()}  style={styles.LoginButton}>
      <Text style={{...styles.text,textAlign:'center',color:'#fff'}}>Resend Code</Text>
    </TouchableOpacity>
    :
    <View   style={[styles.LoginButton,{backgroundColor:'grey'}]}>
    <Text style={{...styles.text,textAlign:'center',color:'#fff'}}>Resend Code</Text>
  </View>
 }
    
    <TouchableOpacity onPress={()=>this.CheckValidtions()}  style={styles.LoginButton}>
      <Text style={{...styles.text,textAlign:'center',color:'#fff'}}>SUBMIT</Text>
    </TouchableOpacity>
    <Text style={{...styles.text,textAlign:'center',fontWeight:'600',marginVertical:40,color:'#8c8c8c',paddingHorizontal:10}}>By logging in you are agree to Widi <Text style={{color:'#5d5d5d'}}>Terms and Services and Privacy Policy</Text> </Text>
    
    </ScrollView> 
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent:'center'
    
  },
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:10,
    marginHorizontal:20,
    marginVertical:15,
    borderRadius:5
},
  text:{
    fontWeight:'400',
    fontSize:15,
   //paddingLeft:10,
    letterSpacing:1,
    fontFamily:'poppin'
  },
  input:{
    borderWidth:0.5,
    padding:14,
    textAlign:'center',
    fontFamily:'poppin',
    backgroundColor:'#f9f9f9',
    borderRadius:5,
    fontWeight:'bold',
    borderColor:'#8c8c8c',
    
   
  },
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};
