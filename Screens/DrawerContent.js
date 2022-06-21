import React, { useEffect } from 'react';
import { StyleSheet,Image,Platform, View } from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


export  function DrawerContent({props,navigation}) {
    const [name,username]=React.useState('');
    const [img,setimage]=React.useState('');
    const [email,setEmail]=React.useState('');


   async  function LoginScreen(){
        navigation.replace('Login')
       await AsyncStorage.setItem('userLogedin','false')
       await AsyncStorage.setItem('USER_DATA','')
       
    }
    useEffect(()=>{
      GetUserInfo() 
    })
    async function GetUserInfo() {
        var user_data=await AsyncStorage.getItem('USER_DATA')
      
        var user_name=JSON.parse(user_data)
        setimage(user_name.image)
        username(user_name.name)
        setEmail(user_name.email)
    //   }, 2000);  
        
    }

  return (
   <View style={{flex:1}}>
       
        <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
            <View style={styles.ImageContainer}>
            <Image style={{width:80,alignSelf:'center',height:80,borderRadius:100}} source={require('../assets/newSplash_30.png')}/>
                <View style={{flexDirection:'row'}}>
                {img=="" || img==null?
                 <Image style={{width:50,height:50,top:10,borderRadius:100,borderWidth:1,borderColor:"#fff"}} source={{ uri:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'}}/>:
                 <Image style={{width:50,height:50,top:10,borderRadius:100}} source={{ uri:'http://www.g7technologies.com/widi/public/user_profile_pic/'+img}}/>
                
                }
                <View>
                <Text style={styles.textcolor}>{name}</Text>
                <Text style={{   color:'#fff', marginLeft:20,marginTop:5,marginBottom:3,fontSize:11}}>{email}</Text>
                </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/home.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/user.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Profile</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Wallet')} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/wallet.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Wallet</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.closeDrawer(),navigation.navigate('History')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/cheese-burger.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>My Orders</Text>
                </View>
            </TouchableOpacity>
            {/* onPress={()=>navigation.navigate('HistoryScreen')} */}
            {/* <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('Reward')}}  style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/gift.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Reward</Text>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('Address')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/pin.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Address</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('FAQ')}}  style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/information.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Help Center</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('Settings')}}  style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/settings.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Settings</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('Terms')}} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/accept.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Terms and Conditions</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>LoginScreen()} style={styles.ButtonConatiner}>
                <Image style={styles.Icon_image_style} source={require('../assets/logout.png')}/>
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Sign out</Text>
                </View>
            </TouchableOpacity>

           
            
        </DrawerContentScrollView>
        
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
    ImageContainer:{
        backgroundColor:'#0f76de',
        height:160,
        paddingHorizontal:10,
        justifyContent:'flex-end',
       bottom:Platform.OS=='android'?4: 30
    },
    textcolor:{
        color:'#fff',
        fontWeight:'bold',
        marginTop:20,
        marginLeft:20,top:5
    },
    ButtonConatiner:{
        flexDirection:'row',
        padding:10,
        

    },
    Icon_image_style:{
        width:15,
        height:15,
        resizeMode:'contain',
        top:12
    },
    buttonSubContainer:{
        marginLeft:10,
        borderBottomWidth:0.4,
        width:'100%',
        borderColor:'#dddddd',
        padding:10
    },
    buton_text_color:{
        color:'#3c3c3c',
        fontFamily:'poppin'
    }

  
  
});
