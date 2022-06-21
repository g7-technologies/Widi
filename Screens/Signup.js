import React,{useState} from 'react';
import { ScrollView,Alert, StyleSheet,Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {basepath } from "../BasePath/Basepath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import Toast from "react-native-tiny-toast";

export default function App({navigation,route}) {
  // console.log('+'+route.params.phone)
  const [securetext,notsecure]=useState(true)
  const [showindicator,indicatorcondition]=useState(true)
  const [confirmpsass,confirmPassword]=useState(true)
  const [name,setname]=React.useState('')
  const [phone,setphone]=React.useState('')
  const [email,setemail]=React.useState('')
  const [password,setpassword]=React.useState('')
  const [confirmuserpasswords,confirmuserpassword]=React.useState('')
  const [deviceid,device_id]=React.useState('')
  const [expoPushToken, setExpoPushToken] = useState('');
  // const [deviceid,confirmPassword]=React.useState('')
  const [error_message,showerror]=React.useState('')
  
  async function setLogin(user){
    navigation.replace('Dashboard')
    AsyncStorage.setItem('userLoginid',user.id.toString())
    await AsyncStorage.setItem('userLogedin','true')
    indicatorcondition(true)
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

  function  login_request (){
  showerror('')
  indicatorcondition(false)
    const formData = new FormData()
    formData.append('name',name);
    formData.append('phone', route.params.phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('device_id', expoPushToken);
    try{
      fetch(`${basepath}register_customer`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log( responseJson)
        if(!responseJson.error == true){
          setLogin(responseJson.user)
        }else{
          indicatorcondition(true)
           alert(responseJson.error_msg)
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }
  async function registerForNotification() {
    
    const {status:existingstatus}=await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus=existingstatus;
    if(existingstatus!=='granted'){
      const {status}=await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus=status
    }
    if(finalStatus!=='granted'){
      return;
    }
   let token =await Notifications.getExpoPushTokenAsync();
   setExpoPushToken(token.data)
  }
  React.useEffect(() => {
    registerForNotification()
    console.log('called')
  }, []);
   
  function ValidateEmail(email)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
      
        return (false)
  }

 

  function form_validation ()  {
    if(email === '' || password === '' || name===''){
      showerror('All Fields are required')
    }else if(!ValidateEmail((email).trim())){
      showerror('Invalid Email')
    }else if((password).length<6){
      showerror( 'Password length must be at least 6 digit')
    }else if(password!=confirmuserpasswords){
      showerror( 'Password conform password not match')
    }else{
      
    //  alert('works')
    
      login_request()
    }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{height:90}}/>
     
      
        <Image  source={require('../assets/undraw_cooking_lyxy.png')} style={{width:100,resizeMode:'contain',height:100,alignSelf:'center',marginBottom:40}}/>
      
      <Text style={styles.heading_text}>Almost there</Text>
      <TextInput placeholder='Name' value={name} onChangeText={(n)=>setname(n)} placeholderTextColor={'#8c8c8c'} style={styles.input}/>
      <TextInput  placeholder='Email' value={email} onChangeText={(e)=>setemail(e)} placeholderTextColor={'#8c8c8c'} style={styles.input}/>
      <View style={{flexDirection:'row',borderColor:'#8c8c8c',borderWidth:1,alignItems:'center',margin:10,padding:2,borderRadius:5}}>
        <View style={{width:'90%'}}>
            <TextInput placeholder='Password' value={password} onChangeText={(p)=>setpassword(p)} secureTextEntry={securetext} placeholderTextColor={'#8c8c8c'} style={{...styles.input,padding:0,borderWidth:0}}/>
        </View>
        <TouchableOpacity onPress={()=>notsecure(!securetext)} style={{width:50}}>
          {!securetext ?
            <Image style={{width:20,height:20}} source={require('../assets/eye.png')}/>
            :
            <Feather name="eye" size={20} color="#8c8c8c" />
          }
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',borderColor:'#8c8c8c',borderWidth:1,alignItems:'center',margin:10,padding:2,borderRadius:5}}>
        <View style={{width:'90%'}}>
            <TextInput placeholder='Conform Password' value={confirmuserpasswords} onChangeText={(cp)=>confirmuserpassword(cp)} secureTextEntry={confirmpsass} placeholderTextColor={'#8c8c8c'} style={{...styles.input,padding:0,borderWidth:0}}/>
        </View>
        <TouchableOpacity onPress={()=>confirmPassword(!confirmpsass)} style={{width:50}}>
          {!confirmpsass ?
            <Image style={{width:20,height:20}} source={require('../assets/eye.png')}/>
            :
            <Feather name="eye" size={20} color="#8c8c8c" />
          }
        </TouchableOpacity>
      </View>
      <Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{error_message}</Text>
      {showindicator?
      <TouchableOpacity onPress={()=>form_validation()} style={styles.LoginButton}>
          <Text style={styles.text}>SIGN UP</Text>
      </TouchableOpacity>
     :
      <TouchableOpacity  style={styles.LoginButton}>
        <ActivityIndicator color={'#fff'}/>
      </TouchableOpacity>
      
      }
      
      <Text style={{...styles.text,marginVertical:40,color:'#3c3c3c'}}>Have an account? <Text onPress={()=>navigation.navigate('Login')} style={{color:'#3badfb'}}>Login</Text></Text>
      <Text style={{...styles.text,textAlign:'center',marginVertical:40,color:'#8c8c8c'}}>By Sign in you are agree to Widi <Text style={{color:'#3C3C3C'}}>Terms and Services and Privacy Policy</Text> </Text>
     {Platform.OS=='ios'&& <View style={{height:300}}/>}
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
      fontFamily:'poppinbold',
      borderColor:'#8c8c8c'
    },
    LoginButton:{
      backgroundColor:'#0f76de',
      padding:10,
      margin:20,
      borderRadius:5
  },
    text:{
       fontFamily:'poppinbold',
        fontSize:15,
        textAlign:'center',
        letterSpacing:1,
        color:'#fff'
    }
});
