
import React, { useState ,useEffect, useRef } from 'react';
import { ScrollView,Alert,StyleSheet,Image, Text, TextInput, TouchableOpacity, View, Platform, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Facebook from 'expo-facebook';
import * as FileSystem from 'expo-file-system';
import * as Google from 'expo-google-app-auth';
//Base Path
import {basepath } from "../BasePath/Basepath";
import Constants from 'expo-constants';
import Toast from "react-native-tiny-toast";
export const isAndroid = () => Platform.OS === 'android';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App({navigation}) {
  const [securetext,notsecure]=useState(true)
  const [showindicator,indicatorcondition]=useState(true)
  const [email,setemail]=React.useState('')
  const [password,setpassword]=React.useState('')
  const [deviceid,device_id]=React.useState('')
  const [error_message,showerror]=React.useState('')
  const [facebook,facebookdata]=React.useState('')
  const [facebookindicator,setfacebookindicator]=React.useState(false)
  const [gmailindicator,setgmailindicator]=React.useState(false)
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef(); 
  const [pointer,enablepointer]=useState('auto')

    async function setLogin(user){
   navigation.replace('Dashboard')
   await AsyncStorage.setItem('userLogedin','true')
   indicatorcondition(true)
   enablepointer('auto')
   AsyncStorage.setItem('userLoginid',user.id.toString())
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
 


  async function  login_request (){


   indicatorcondition(false)
   enablepointer('none')
    const formData = new FormData()
    console.log('new one',expoPushToken)
    formData.append('email', email);
    formData.append('password', password);
    formData.append('device_id', expoPushToken);
    try{
      fetch(`${basepath}login_customer`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
       // console.log( responseJson)
        if(!responseJson.error == true){
          setLogin(responseJson.user)
    // alert(p)
    
        }else{
           indicatorcondition(true)
           enablepointer('auto')
           Toast.show(responseJson.error_msg,{position:Toast.position.TOP})
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }

 
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //  console.log("aaaaaaaaaaaaaaaaaa")
        //  console.log(notification);
        //  console.log("zzzzzzzzzzzzzzzzzz")

        setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //  console.log("----------------start----------------------")

    //     console.log('notification pressed');
    //     console.log("----------------end----------------------")

      
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  },
  
  );


  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


 


  // async function registerForNotification() {
    
  //   const {status:existingstatus}=await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   let finalStatus=existingstatus;
  //   if(existingstatus!=='granted'){
  //     const {status}=await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus=status
  //   }
  //   if(finalStatus!=='granted'){
  //     return;
  //   }
  //  let token =await Notifications.getExpoPushTokenAsync();
  //  setExpoPushToken(token.data)
  //  console.log(token.data)
  // }
  // React.useEffect(() => {
  //   registerForNotification()
  // }, []);

  function ValidateEmail(email)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
      
        return (false)
  }

 

  function form_validation ()  {
    if(email === '' || password === ''  ){
      showerror('All Fields are required')
    }else if(!ValidateEmail((email).trim())){
      showerror('Invalid Email')
    }else if((password).length<6){
      showerror( 'Password length must be at least 6 digit')
    }else{
      
    //  alert('works')
      login_request()
    }
  }
  async function FacebookLogin() {
    try {
      await Facebook.initializeAsync({
        appId: '407516703819878',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,gender,name,picture.type(large)`);
        const userinfo=await response.json()
        //  console.log(userinfo)
         Redirect_to_Login(userinfo.email,userinfo.name,)
         setfacebookindicator(true)
         enablepointer('none')
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  function  Redirect_to_Login(social_email,social_name){
  
    const formData = new FormData()
    formData.append('email', social_email);
    formData.append('name', social_name);
    formData.append('device_id',expoPushToken);
  
    try{
      fetch(`${basepath}customer_social_login`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        //console.log( responseJson)
        if(!responseJson.error == true){
        // navigation.navigate('Dashboard')
        setfacebookindicator(false)
        // enablepointer('auto')
        setgmailindicator(false)
          setLogin(responseJson.user)
        }else{
           alert('Some  error ouccure server side'+responseJson.erro+' '+ JSON.stringify( responseJson))
        }
      })
      .catch((error) =>{
        alert('error is '+error)
      });
    }catch(e){
      alert('error is '+e)
    }
  }

  async function signInWithGoogleAsync () {
   
    try {
        const result = await Google.logInAsync({
          
         // behavior:'web',
          androidStandaloneAppClientId:"216160133063-fpslcuekrpklpcvgm1mg9oeg0dkkl1tt.apps.googleusercontent.com",
          iosStandaloneAppClientId:"216160133063-ht0ol9rnsigk3ts5ne0a0s640dnac85g.apps.googleusercontent.com",
          androidClientId: "216160133063-fpslcuekrpklpcvgm1mg9oeg0dkkl1tt.apps.googleusercontent.com",
          iosClientId: "216160133063-ht0ol9rnsigk3ts5ne0a0s640dnac85g.apps.googleusercontent.com",
          
        
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            //console.log(result.user)
            setgmailindicator(true)
            enablepointer('none')
            Redirect_to_Login(result.user.email,result.user.name)
       //this.apiSocialLogin(result.user.givenName, result.user.familyName, result.user.email)
            return result.accessToken;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        alert('Error is '+e)
    }
  }

  const [loaded, error] = Font.useFonts({ 
    poppin:require('../assets/Poppins/Poppins-Regular.ttf'),
    poppinbold:require('../assets/Poppins/Poppins-SemiBold.ttf')
   });
   if(!loaded){
    return <View style={{justifyContent:'center',alignItems:'center',flex:1}}><Text>Loading App Please wait.....</Text></View>;
  }
  return (
    <>
    
      <ScrollView pointerEvents={pointer} showsVerticalScrollIndicator={false} style={styles.container}>
      <Image source={require('../assets/newSplash_30.png')} style={{alignSelf:'center',width:150,height:150}}/>
        {/* <View style={{height:90}}/>  */}
        <Text style={styles.heading_text}>Hey Welcome Back</Text>
        <TextInput placeholder='Email'  placeholderTextColor={'#8c8c8c'} onChangeText={(email)=>setemail(email)} style={styles.input}/>
        <View style={{flexDirection:'row',borderColor:'#8c8c8c',borderWidth:1,alignItems:'center',margin:10,padding:2,borderRadius:5}}>
          <View style={{width:'90%'}}>
              <TextInput placeholder='Password' secureTextEntry={securetext} placeholderTextColor={'#8c8c8c'} onChangeText={(password)=>setpassword(password)} style={{...styles.input,padding:0,borderWidth:0}}/>
          </View>
          <TouchableOpacity onPress={()=>notsecure(!securetext)} style={{width:50}}>
            {!securetext ?
              <Image style={{width:20,height:20}} source={require('../assets/eye.png')}/>
              :
              <Feather name="eye" size={20} color="#8c8c8c" />
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>navigation.navigate('forgotpassword')}>
        <Text  style={styles.forgotpasswordtext} >Forgot your <Text style={{fontFamily:'poppinbold'}}> password?</Text></Text>
        </TouchableOpacity>
        {/* onPress={()=>navigation.navigate('Dashboard')} */}
        <Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{error_message}</Text>
       {showindicator? 
        <TouchableOpacity onPress={ ()=> form_validation()}  style={styles.LoginButton}>
          <Text style={styles.text}>LOGIN</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity  style={styles.LoginButton}>
          <ActivityIndicator color={'#fff'}/>
        </TouchableOpacity>
        }
        {!facebookindicator?
        <TouchableOpacity onPress={()=>FacebookLogin()}  style={{...styles.LoginButton,backgroundColor:'#3b66c2',alignItems:'center',justifyContent:'center',flexDirection:'row',top:20}}>
            <Image source={require('../assets/fb.png')} style={{width:20,height:20,resizeMode:'contain'}}/>
            <Text style={{...styles.text,fontWeight:'500'}}> Continue with Facebook</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity   style={{...styles.LoginButton,backgroundColor:'#3b66c2',alignItems:'center',justifyContent:'center',flexDirection:'row',top:20}}>
          <ActivityIndicator color='#fff'/>
        </TouchableOpacity>
        }
        {!gmailindicator?
        <TouchableOpacity onPress={()=>signInWithGoogleAsync()}  style={{...styles.LoginButton,backgroundColor:'#cf4332',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
            <Image source={require('../assets/gmail.png')} style={{width:20,height:20,resizeMode:'contain'}}/>
            <Text style={{...styles.text,fontWeight:'500'}}> Continue with Google</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>signInWithGoogleAsync()}  style={{...styles.LoginButton,backgroundColor:'#cf4332',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
            <Image source={require('../assets/gmail.png')} style={{width:20,height:20,resizeMode:'contain'}}/>
            <Text style={{...styles.text,fontWeight:'500'}}> Continue with Google</Text>
        </TouchableOpacity>
        }
        <Text style={{...styles.text,fontFamily:'poppinbold',marginVertical:40,color:'#333333'}}>Don't have an account? <Text onPress={()=>navigation.navigate('phone')} style={{color:'#3badfb'}}>Signup</Text></Text>
        <Text style={{...styles.text,fontWeight:'100',textAlign:'center',marginVertical:40,color:'#333333'}}>By logging you are agree to Widi <Text style={{color:'#333333',fontFamily:'poppinbold'}}>Terms and Services and Privacy Policy</Text> </Text>
      </ScrollView>
    </>
  );
}
//colors on focus #97c6f4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    padding:10,
    
   
  },
  heading_text:{
    color:'#5d5d5d',
    fontSize:20,
    
    padding:10,
    fontFamily:'poppinbold'
  },
    input:{
      borderWidth:1,
      padding:12,
      margin:10,
      borderRadius:5,
      fontWeight:'bold',
      
      borderColor:'#8c8c8c'
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:10,
        margin:20,
        borderRadius:15
    },
    text:{
        fontWeight:'600',
        fontSize:15,
        textAlign:'center',
        letterSpacing:1,
        color:'#fff'
    },
    forgotpasswordtext:{
      color:'#5c5c5c',
      fontFamily:'poppin',
      fontSize:12,
      textAlign:'right',
    }
});
