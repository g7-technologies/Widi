import React, { isValidElement, useState,useRef,useEffect } from 'react';
import {FlatList,RefreshControl,Animated, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground, Platform } from 'react-native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerContent} from './DrawerContent'
import { Ionicons,MaterialIcons,AntDesign,Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profile from '../Screens/Profile'
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import Wallet from '../Screens/Add_Credit_Card'

import SavedResturant from '../Screens/Saved_Resturants'
import {connect} from 'react-redux'

import {Provider} from 'react-redux'
import HistoryScreen from '../Screens/History'
import ProductCartDetail from '../Screens/Product_Cart_Detail'
import SingleCart from '../Screens/Single_Cart_Detail'
import HomeScreen from '../Screens/HomeScreen'




// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
const Drawer = createDrawerNavigator();

 function App() {

  // const [expoPushToken, setExpoPushToken] = useState('');
  //   const [notification, setNotification] = useState(false);
  //   const notificationListener = useRef();
  //   const responseListener = useRef();



    
  //   useEffect(() => {
  //     console.log('zzzzzzzzzzzzzzzzzzzzzzz')
  //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
  //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //       console.log(notification);
  //       setNotification(notification);
  //     });
  //     console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmm')

  //     console.log(notificationListener)
  //     console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnn')

  //     setTimeout(() => {
  //       // console.log(notification);
  //     }, 300);
  //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //       console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  //       console.log(response);

  //     });
  
  //     return () => {
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //     };
  //   }, []);


  //   async function registerForPushNotificationsAsync() {
  //     let token;
  //     if (Constants.isDevice) {
  //       const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //       let finalStatus = existingStatus;
  //       if (existingStatus !== 'granted') {
  //         const { status } = await Notifications.requestPermissionsAsync();
  //         finalStatus = status;
  //       }
  //       if (finalStatus !== 'granted') {
  //         alert('Failed to get push token for push notification!');
  //         return;
  //       }
  //       token = (await Notifications.getExpoPushTokenAsync()).data;
  //       console.log('next',token);
  //     } else {
  //       alert('Must use physical device for Push Notifications');
  //     }
    
  //     if (Platform.OS === 'android') {
  //       Notifications.setNotificationChannelAsync('default', {
  //         name: 'default',
  //         importance: Notifications.AndroidImportance.MAX,
  //         vibrationPattern: [0, 250, 250, 250],
  //         lightColor: '#FF231F7C',
  //       });
  //     }
    
  //     return token;
  //   }
  return (
   
        <Drawer.Navigator
        drawerStyle={{
          // backgroundColor: '#c6cbef',
          width:'70%',
        
        }}
        drawerContent={props=><DrawerContent {...props}/>} >
             <Drawer.Screen name="Home"  component={HomeScreen} />
             <Drawer.Screen name="Profile" component={Profile} />
             
             <Drawer.Screen name="Wallet" component={Wallet} />
             
             
             
             <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
             <Drawer.Screen name="ProductCartDetail" component={ProductCartDetail} />
             <Drawer.Screen name="SingleCart" component={SingleCart} />
             
        </Drawer.Navigator>
        
  );
}

// var data=mapstatetoprops;
// console.log(data)
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  header:{
    backgroundColor:'#0f76de',
    padding:10,
    justifyContent:'center' ,
    marginTop:Platform.OS=='android'?25:0
},
ListButtons:{
  
  borderWidth:0.3,
  borderColor:'#dddddd',
  padding:5,
  marginRight:4,
  borderRadius:20,
  paddingHorizontal:10 
},
searchbarsection:{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:20
},
searchbar:{
  width:'80%',
  flexDirection:'row',
  borderColor:'#dddddd',
  borderWidth:0.3,borderRadius:4,
  padding:10,
  alignItems:'center',
  backgroundColor:'#fcfcfc'
},
filterbutton:{
  width:'10%',
  borderColor:'#dddddd',
  borderWidth:0.3,
  borderRadius:4,
  justifyContent:'center',
  alignItems:'center',
  marginHorizontal:5,
  backgroundColor:'#fcfcfc'
},
likedbutton:{
  width:'10%',
  borderColor:'#dddddd',
  borderWidth:0.3,
  borderRadius:4,
  backgroundColor:'#fcfcfc',
  justifyContent:'center',
  alignItems:'center'
},
Cartnumbercontainer:{
  position:'absolute',
  left:10,
  bottom:10,
  width:15,
  height:15,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#e65043'
},
mainCard:{
  width:'95%',
  marginTop:10,

  alignSelf:'center',
  
  height:200,
  borderWidth:0.3,
  borderColor:'#dddddd',
  borderRadius:5,
  
},
DiscountCard:{
    marginLeft:10,
    alignContent:'center',
    height:60,
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    width:50,
    backgroundColor:'#0f76de',
  },
  ratingCard:{
      padding:4,
      justifyContent:'flex-end',
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
      flexDirection:'row',
      alignItems:'flex-end',
      backgroundColor:'#F8F8F8',
      width:50,
      alignSelf:'flex-end',
      top:30
  }
});
