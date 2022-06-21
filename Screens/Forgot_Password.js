import React, { useState } from 'react';
import { ScrollView, Platform,StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-tiny-toast';

export default function App({navigation}) {
  const [email,setemail]=React.useState('')
  const [error_message,showerror]=React.useState('')
  function  login_request (){
   
    const formData = new FormData()
   
    formData.append('email', email);
    
    try{
      fetch(`http://www.g7technologies.com/widi/api/customer_forgot_password`, {
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
        
       // alert(JSON.stringify( responseJson))
        if(responseJson.error == true){
          alert(responseJson.error_msg)

        }else{
          Toast.show(responseJson.success_msg)
          // navigation.navigate('Dashboard')
          navigation.goBack(null)
        } 
      })
      .catch((error) =>{});
    }catch(e){}
  }
  function ValidateEmail(email)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
      
        return (false)
  }
  function form_validation ()  {
    console.log('xxxxxxxxxxx',email)
    if(email === '' ){
      showerror('Email is required')
    }else if(!ValidateEmail((email).trim())){
      showerror('Invalid Email')
    }else{
      
    //  alert('works')
      login_request()
    }
  }



    return (
    <ScrollView style={styles.container}>
        <View style={{height:90}}/>
     
        
        <Image  source={require('../assets/undraw_cooking_lyxy.png')} style={{width:100,height:100,alignSelf:'center',resizeMode:'contain',marginBottom:40}}/>
      <Text style={styles.heading_text}>Forgot Your Password</Text>
      
      
      <TextInput  placeholder='Email'  placeholderTextColor={'#8c8c8c'} style={{...styles.input, borderColor:'#8c8c8c'}} onChangeText={(text)=>setemail(text)}/>
      <Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{error_message}</Text>
      <TouchableOpacity onPress={()=>form_validation()} style={styles.LoginButton}>
          <Text style={styles.text}>Forgot Password</Text>
      </TouchableOpacity>
      <Text  style={{textAlign:'center',fontFamily:'poppin',}}>Go Back to <Text onPress={()=>navigation.goBack(null)} style={{color:'#0f76de',fontFamily:'poppinbold'}}> Login</Text></Text>
   
    </ScrollView>
  );
}
//colors on focus #97c6f4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   
  },
  heading_text:{
    color:'#5d5d5d',
    fontSize:20,
    fontFamily:'poppinbold',
    padding:10
  },
    input:{
      borderWidth:1,
      padding:12,
      margin:10,
      borderRadius:5,
      fontWeight:'bold',
     
    },
    LoginButton:{
      backgroundColor:'#0f76de',
      padding:12,
      margin:20,
      borderRadius:5
  },
    text:{
       fontFamily:'poppin',
        fontSize:15,
        textAlign:'center',
        letterSpacing:1,
        color:'#fff'
    }
});
