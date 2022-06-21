import React, { useEffect, useState } from 'react';
import { ScrollView,ActivityIndicator, Platform,StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons,Feather } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-tiny-toast';

export default function App({navigation}) {
  const [email,setemail]=React.useState('')
  const [error_message,showerror]=React.useState('')
  const [showindicator,indicatorcondition]=useState(true)
  const [userid,getid]=useState(null)
  useEffect(()=>{
    GetUserdata()
  })
  async function GetUserdata(){
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    getid(customerid.id)
  }
  function UpdateEmail(){
    showerror('')
    indicatorcondition(false)
      const formData = new FormData()
      formData.append('customer_id', userid);
      formData.append('email', email);
  
      
      try{
        fetch(`${basepath}customer_change_email`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
          indicatorcondition(true)
          if(responseJson.error){
         Toast.show(responseJson.error_msg)
          }
          else{
          navigation.goBack()
         // console.log(responseJson.success_msg)
          Toast.show(responseJson.success_msg)
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
    if(email === '' ){
      showerror('Email is required')
    }else if(!ValidateEmail((email).trim())){
      showerror('Invalid Email')
    }else{
      
   
      
      UpdateEmail()
    }
  }



    return (
    <ScrollView style={styles.container}>
       <View style={styles.header}>
    <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}> Email</Text>

        </TouchableOpacity>
    </View>
     
        
        <Image  source={require('../assets/undraw_cooking_lyxy.png')} style={{width:100,height:100,alignSelf:'center',resizeMode:'contain',marginBottom:40}}/>
      <Text style={styles.heading_text}>Change Your Email</Text>
      
      
      <TextInput onChangeText={(email)=>setemail(email)} placeholder='Email'  placeholderTextColor={'#8c8c8c'} style={{...styles.input, borderColor:'#8c8c8c'}}/>
      <Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{error_message}</Text>
      {showindicator?
      <TouchableOpacity onPress={()=>form_validation()} style={styles.LoginButton}>
          <Text style={styles.text}>Update</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity  style={styles.LoginButton}>
          <ActivityIndicator color={'#fff'}/>
      </TouchableOpacity>
      }

   
    </ScrollView>
  );
}
//colors on focus #97c6f4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   
  },
  header:{
    backgroundColor:'#0f76de',
    height:60,
    justifyContent:'center',
   // marginTop:Platform.OS=='android'?25:0 
},
  heading_text:{
    color:'#5d5d5d',
    fontSize:20,
    fontFamily:'poppinbold',
    padding:10
  },
  textcolor:{
    fontFamily:'poppinbold',
     color:'#fff',
     top:4,
     marginLeft:30
 },
    input:{
      borderWidth:1,
      padding:8,
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
