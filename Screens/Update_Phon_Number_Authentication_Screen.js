import React, { Component, useState } from 'react';
import { StyleSheet, Text,TouchableOpacity, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { basepath } from "../BasePath/Basepath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';
import CountDown from 'react-native-countdown-component';


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
      isloading:true,
      customerid:'',
      otp:this.props.route.params.otp,
      btnstate:false,
      timer:true,
     
    }
    console.log(this.props.route.params.phone)
    // console.log(this.props.route.params.phone)
  }
  componentDidMount(){
    this.GetUserdata()
  }
    GetUserdata=async()=>{
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    this.setState({customerid:customerid.id})
    
  }
    UpdatePhoneNumber= ()=>{
 
      this.setState({isloading:false})
    const formData = new FormData()
    formData.append('customer_id',this.state.customerid);
    formData.append('phone',this.props.route.params.phone);

    
    try{
      fetch(`${basepath}customer_change_phone`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
      
          alert(responseJson.error_msg)
          this.setState({isloading:true})
          this.props.navigation.goBack('Change_Phone')

        }
        else{
    

        this.setState({isloading:true})
        this.setLogin(responseJson.user)
        this.props.navigation.replace('Profile')
        Toast.show('Successfully updated')
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }
  setLogin= async (user)=>{
    // navigation.replace('Dashboard')
    
    AsyncStorage.setItem('USER_DATA', JSON.stringify(user), (err)=> {
     if(err){
         console.log("an error");
         throw err;
     }
         console.log("success");
     }).catch((err)=> {
         console.log("error is: " + err);
     });
   }
   CheckValidtions=()=>{
    if(this.state.pin1=='' || this.state.pin2=='' || this.state.pin3=='' || this.state.pin4=='' || this.state.pin5=='' || this.state.pin6==''   ){
     alert('Please Provide Valid Pin')
    }
    // else{
    //   this.UpdatePhoneNumber()
    // }

    else{
      var pin = this.state.pin1+this.state.pin2+this.state.pin3+this.state.pin4+this.state.pin5+this.state.pin6;
      
      if(pin == this.state.otp){
        // this.setState({err:false})
               this.UpdatePhoneNumber()

      }
      else{
        // this.setState({err:true})
        alert('galat pin entered')
        // console.log('ghalt pin entered')
      }
    }

  }


  resendCode=()=>{
    // this.setState({btnstate:false,timer:true})
    var oottpp = Math.floor(100000 + Math.random() * 900000);
    this.setState({btnstate:!this.state.btnstate,timer:true,otp:oottpp})
    
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
            //  console.log(responseJson)
              
            })
            .catch((error) =>{});
          }catch(e){}
  
  }
 render(){
  return (
    <View style={styles.container}>
     <ScrollView>
      <View style={{height:150}}/>
    <Text style={styles.text}>Enter your mobile number</Text>
    <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly'}}>
    <TextInput 
    keyboardType='decimal-pad'
      ref={'pin1ref'} 
      placeholder='0'
      onChangeText={(pin1)=>{this.setState({pin1:pin1},()=>{
        if(pin1!=''){
      this.refs.pin2ref.focus()
      }else{
        this.refs.pin1ref.focus()
      }
    }) }}
       autoFocus={true}
       maxLength={1}
       keyboardType={'number-pad'} 
       placeholderTextColor={'#8c8c8c'} 
       style={styles.input}
    />
    <TextInput 
      ref={'pin2ref'} 
      placeholder='0'
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
      placeholder='0'
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
      placeholder='0'
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
      placeholder='0'
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
      placeholder='0'
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
    {this.state.timer?

    <CountDown
      size={20}
      until={60}
      onFinish={()=>this.setState({btnstate:!this.state.btnstate,timer:false})}
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

  {this.state.isloading?
    <TouchableOpacity onPress={()=>this.CheckValidtions()}  style={styles.LoginButton}>
      <Text style={{...styles.text,textAlign:'center',color:'#fff'}}>SUBMIT</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity  style={styles.LoginButton}>
      <ActivityIndicator color={'#fff'}/>
    </TouchableOpacity>
    }
    
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
    margin:20,
    borderRadius:5
},
  text:{
    fontWeight:'400',
    fontSize:15,
   paddingLeft:10,
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
