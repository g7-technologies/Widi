
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer ,createSwitchNavigator} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
//Screens
import Login from './Screens/Login'
import Intro from './Screens/Intro_Screen'
import Phone from './Screens/Phone_Number_Screen'
import PhoneAuth from './Screens/Phon_Number_Authentication_Screen'
import Update_PhoneAuth from './Screens/Update_Phon_Number_Authentication_Screen'

import Signup from './Screens/Signup'
import Forgot from './Screens/Forgot_Password'
import Dashboard from './Screens/Dashboard_Screen'
import Profile from './Screens/Profile'

import ChangePassword from './Screens/Change_Password'
import ChangeEmail from './Screens/Change_Email'
import ChangePhone from './Screens/Change_Phone'
import  Check_Out from "./Screens/Check_Out";
import CreditcardInput from './Screens/Credit_Card_Input_Screen'
import MyCart from './Screens/MyCart'
import Confirmorder from './Screens/Confirm_Order'
import History from './Screens/History'
import SavedResturant from './Screens/Saved_Resturants'
import SearchedFood from './Screens/Searched_Food'
import SellAllResturant from './Screens/See_All_Resturant'
import CartDetail from './Screens/Product_Cart_Detail'
import SingleCartItem from './Screens/Single_Cart_Detail'
import SetPassword from "./Screens/SetPassword";
import store from './Store/Index'
//Change Location on Map 
import ChanegLocation from "./Screens/Change_Location_on_Map";

//Credit card
import  ManageCard from "./Screens/Manage_Credit_Card";
//Address Screens
import Address from "./Screens/Address";
import TakeAddress from "./Screens/Take_Address";
//FAQ
import FAQ from "./Screens/Faq";
//Pricavy Policy //Terms
import PricavyPolicy from "./Screens/Privacy_Policy";
import  Terms from "./Screens/Terms_and_Condition";
//Settings
import  Settings from "./Screens/Setting";
//Reward
import  Reward from "./Screens/Rewards";
//My Orders
import CompletedOrder from "./Component/Completed_Order_Detail";
import TrackOrder from "./Component/Track_Order_Status";
import TrackOrderandroid from "./Component/Track_Order_Status_android";
//Apple Pay Screen
import Applepay from "./Screens/Apple_Pays";
console.disableYellowBox = true;
const Stack = createStackNavigator();
const Stacknot = createStackNavigator();

const Stacklogin = createStackNavigator();

const StackScreens=()=>{
  return(
  <Stack.Navigator>      
    <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}} />
    <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
    <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
    <Stack.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
    <Stack.Screen name="phone" component={Phone}  options={{headerShown:false}}/>
    <Stack.Screen name="phoneauth" component={PhoneAuth}  options={{headerShown:false}}/>
    <Stack.Screen name="Update_PhoneAuth" component={Update_PhoneAuth}  options={{headerShown:false}}/>
    <Stack.Screen name="forgotpassword" component={Forgot}  options={{headerShown:false}}/>
    <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
    <Stack.Screen name="MyCart" component={MyCart} options={{headerShown:false}} />
    <Stack.Screen name="CreditcardInput" component={CreditcardInput} options={{headerShown:false}} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
    <Stack.Screen name="ChangeEmail" component={ChangeEmail} options={{headerShown:false}} />
    <Stack.Screen name="ChangePhone" component={ChangePhone} options={{headerShown:false}} />
    <Stack.Screen name="Confirmorder" component={Confirmorder} options={{headerShown:false}} />
    <Stack.Screen name="SavedResturant" component={SavedResturant} options={{headerShown:false}} />
    <Stack.Screen name="History" component={History} options={{headerShown:false}} />
    <Stack.Screen name="SearchedFood" component={SearchedFood} options={{headerShown:false}} />
    <Stack.Screen name="SellAllResturant" component={SellAllResturant} options={{headerShown:false}} />
    <Stack.Screen name="CartDetail" component={CartDetail} options={{headerShown:false}} />
    <Stack.Screen name="SingleCartItem" component={SingleCartItem} options={{headerShown:false}} /> 
    <Stack.Screen name="SetPassword" component={SetPassword} options={{headerShown:false}} />
    <Stack.Screen name="Address" component={Address} options={{headerShown:false}} />  
    <Stack.Screen name="TakeAddress" component={TakeAddress} options={{headerShown:false}} />  
    <Stack.Screen name="FAQ" component={FAQ} options={{headerShown:false}} /> 
    <Stack.Screen name="PricavyPolicy" component={PricavyPolicy} options={{headerShown:false}} /> 
    <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} /> 
    <Stack.Screen name="ManageCard" component={ManageCard} options={{headerShown:false}} /> 
    <Stack.Screen name="Terms" component={Terms} options={{headerShown:false}} /> 
    <Stack.Screen name="Reward" component={Reward} options={{headerShown:false}} /> 
    <Stack.Screen name="TrackOrder" component={TrackOrder} options={{headerShown:false}} />
    <Stack.Screen name="CompletedOrder" component={CompletedOrder} options={{headerShown:false}} /> 
    <Stack.Screen name="ChanegLocation" component={ChanegLocation} options={{headerShown:false}} /> 
    <Stack.Screen name="Check_Out" component={Check_Out} options={{headerShown:false}} /> 
    <Stack.Screen name="TrackOrderandroid" component={TrackOrderandroid} options={{headerShown:false}} />
    <Stack.Screen name="Applepay" component={Applepay} options={{headerShown:false}} />
    
    

  </Stack.Navigator>)
}
const Login_Stack=()=>{
  return(
  <Stacknot.Navigator>      
    {/* <Stacknot.Screen name="Intro" component={Intro} options={{headerShown:false}} /> */}
    <Stacknot.Screen name="Login" component={Login} options={{headerShown:false}} />
    <Stacknot.Screen name="Profile" component={Profile} options={{headerShown:false}} />
    <Stacknot.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
    <Stacknot.Screen name="phone" component={Phone}  options={{headerShown:false}}/>
    <Stacknot.Screen name="phoneauth" component={PhoneAuth}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Update_PhoneAuth" component={Update_PhoneAuth}  options={{headerShown:false}}/>
    <Stacknot.Screen name="forgotpassword" component={Forgot}  options={{headerShown:false}}/>
    <Stacknot.Screen name="Dashboard"  component={Dashboard} options={{headerShown:false}} />
    <Stacknot.Screen name="MyCart" component={MyCart} options={{headerShown:false}} />
    <Stacknot.Screen name="CreditcardInput" component={CreditcardInput} options={{headerShown:false}} />
    <Stacknot.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
    <Stacknot.Screen name="ChangeEmail" component={ChangeEmail} options={{headerShown:false}} />
    <Stacknot.Screen name="ChangePhone" component={ChangePhone} options={{headerShown:false}} />
    <Stacknot.Screen name="Confirmorder" component={Confirmorder} options={{headerShown:false}} />
    <Stacknot.Screen name="SavedResturant" component={SavedResturant} options={{headerShown:false}} />
    <Stacknot.Screen name="History" component={History} options={{headerShown:false}} />
    <Stacknot.Screen name="SearchedFood" component={SearchedFood} options={{headerShown:false}} />
    <Stacknot.Screen name="SellAllResturant" component={SellAllResturant} options={{headerShown:false}} />
    <Stacknot.Screen name="CartDetail" component={CartDetail} options={{headerShown:false}} />
    <Stacknot.Screen name="SingleCartItem" component={SingleCartItem} options={{headerShown:false}} /> 
    <Stacknot.Screen name="SetPassword" component={SetPassword} options={{headerShown:false}} />  
    <Stacknot.Screen name="Address" component={Address} options={{headerShown:false}} /> 
    <Stacknot.Screen name="TakeAddress" component={TakeAddress} options={{headerShown:false}} />  
    <Stacknot.Screen name="FAQ" component={FAQ} options={{headerShown:false}} />  
    <Stacknot.Screen name="PricavyPolicy" component={PricavyPolicy} options={{headerShown:false}} /> 
    <Stacknot.Screen name="Settings" component={Settings} options={{headerShown:false}} /> 
    <Stacknot.Screen name="ManageCard" component={ManageCard} options={{headerShown:false}} /> 
    <Stacknot.Screen name="Terms" component={Terms} options={{headerShown:false}} /> 
    <Stacknot.Screen name="Reward" component={Reward} options={{headerShown:false}} /> 
    <Stacknot.Screen name="TrackOrder" component={TrackOrder} options={{headerShown:false}} />
    <Stacknot.Screen name="CompletedOrder" component={CompletedOrder} options={{headerShown:false}} /> 
    <Stacknot.Screen name="ChanegLocation" component={ChanegLocation} options={{headerShown:false}} /> 
    <Stacknot.Screen name="Check_Out" component={Check_Out} options={{headerShown:false}} /> 
    <Stacknot.Screen name="TrackOrderandroid" component={TrackOrderandroid} options={{headerShown:false}} />
    <Stack.Screen name="Applepay" component={Applepay} options={{headerShown:false}} />
    
    
    
  </Stacknot.Navigator>)
}
const Dashboard_Stack=()=>{
  return(
    <Stacklogin.Navigator>      

    <Stacklogin.Screen name="Dashboard"  component={Dashboard} options={{headerShown:false}} />
    <Stacklogin.Screen name="Login" component={Login} options={{headerShown:false}} />
    <Stacklogin.Screen name="Profile" component={Profile} options={{headerShown:false}} />
    <Stacklogin.Screen name="Signup" component={Signup}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="phone" component={Phone}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="phoneauth" component={PhoneAuth}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="Update_PhoneAuth" component={Update_PhoneAuth}  options={{headerShown:false}}/>
    <Stacklogin.Screen name="forgotpassword" component={Forgot}  options={{headerShown:false}}/>
   
    <Stacklogin.Screen name="MyCart" component={MyCart} options={{headerShown:false}} />
    <Stacklogin.Screen name="CreditcardInput" component={CreditcardInput} options={{headerShown:false}} />
    <Stacklogin.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
    <Stacklogin.Screen name="ChangeEmail" component={ChangeEmail} options={{headerShown:false}} />
    <Stacklogin.Screen name="ChangePhone" component={ChangePhone} options={{headerShown:false}} />
    <Stacklogin.Screen name="Confirmorder" component={Confirmorder} options={{headerShown:false}} />
    <Stacklogin.Screen name="SavedResturant" component={SavedResturant} options={{headerShown:false}} />
    <Stacklogin.Screen name="History" component={History} options={{headerShown:false}} />
    <Stacklogin.Screen name="SearchedFood" component={SearchedFood} options={{headerShown:false}} />
    <Stacklogin.Screen name="SellAllResturant" component={SellAllResturant} options={{headerShown:false}} />
    <Stacklogin.Screen name="CartDetail" component={CartDetail} options={{headerShown:false}} />
    <Stacklogin.Screen name="SingleCartItem" component={SingleCartItem} options={{headerShown:false}} />
    <Stacklogin.Screen name="SetPassword" component={SetPassword} options={{headerShown:false}} />
    <Stacklogin.Screen name="Address" component={Address} options={{headerShown:false}} />   
    <Stacklogin.Screen name="TakeAddress" component={TakeAddress} options={{headerShown:false}} />  
    <Stacklogin.Screen name="FAQ" component={FAQ} options={{headerShown:false}} />  
    <Stacklogin.Screen name="Settings" component={Settings} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="PricavyPolicy" component={PricavyPolicy} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="ManageCard" component={ManageCard} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="Terms" component={Terms} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="Reward" component={Reward} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="TrackOrder" component={TrackOrder} options={{headerShown:false}} />
    <Stacklogin.Screen name="CompletedOrder" component={CompletedOrder} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="ChanegLocation" component={ChanegLocation} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="Check_Out" component={Check_Out} options={{headerShown:false}} /> 
    <Stacklogin.Screen name="TrackOrderandroid" component={TrackOrderandroid} options={{headerShown:false}} />
    <Stack.Screen name="Applepay" component={Applepay} options={{headerShown:false}} />
    

  </Stacklogin.Navigator>)
}



export default   function App() {
  // const logged=userstate
  //  alert(skipintro) 
  const [logedinuser,islogedinuser]= React.useState(false)
  const [skipintroscreen,introscreen]=React.useState(false)
   const [loaded,fontloaded]= Font.useFonts({ 
      poppin:require('./assets/Poppins/Poppins-Regular.ttf'),
      poppinbold:require('./assets/Poppins/Poppins-SemiBold.ttf')
    });
  React.useEffect(()=>{
   UserSession();
    
  },[])
  async function UserSession() {
    const introstatus=await AsyncStorage.getItem('toLoginScreen')
   const userloginstatus=await AsyncStorage.getItem('userLogedin')
   //works when async is set to true //Passing its value to skipintroscreen
   introscreen(introstatus)
   //?
   islogedinuser(userloginstatus) 

  //  alert(typeof introstatus)
  // alert(typeof userloginstatus)
  }
   

  if(!loaded){
    return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
      <Text>Loading Your Application</Text>
    </View>
    )
  }
  return (
    <View style={styles.container}>
     
      <StatusBar style="dark" backgroundColor="blue" hidden={true}/>
    <Provider store={store}>
        <NavigationContainer >
         {/*Skip intro is true when receive from async  */}
       
        {callthis(skipintroscreen,logedinuser)}
          
        </NavigationContainer>
    </Provider>
    </View>
  );
}
function callthis(skipintro,logedinstatus) {
// alert(logedinstatus)

if(skipintro=='true'){
    if(logedinstatus=='true'){
      return <Dashboard_Stack/>
      // alert('going to ggg')
    }else if(logedinstatus=='false'){
      return <Login_Stack/>
      // alert('going to Login')
    }else if(logedinstatus==null){
      return <Login_Stack/>
      // alert('going to Login')
    }
    
  }else if(skipintro=='false'){
    return <StackScreens/>
    // alert('going to intro')
  }else if(skipintro==null){
   
    return <StackScreens/>
  }
  // {skipintroscreen=='true'?
  // logedinuser=='true'?
  // (<Dashboard_Stack/>)
  // :(<Login_Stack/>):
  // (<StackScreens/>)}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  
});
