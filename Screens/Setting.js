import React, { useState,useEffect } from 'react';
import { StyleSheet,FlatList,Image,TouchableOpacity, Text, View } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import FAQ from '../Component/FAQ'
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox  from "../Component/CheckBox";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Settings({navigation}) {
    const [id,userid]=useState()
    const [user,userdetail]=useState('')  
    const [notification,notificaiton_condition]=useState(0)
    useEffect(()=>{
        Getid()
    },[])
    async function Getid(){
        var u=await AsyncStorage.getItem('userLoginid')
        userid(u)
       // Switch_Notification(u)
       GetUserProfileInfo()
    }
    async function  GetUserProfileInfo(){
        
       // indicatorcondition(true)
         try {
             const value = await AsyncStorage.getItem('USER_DATA');
            
             var d=JSON.parse(value)
            var unid= d.notification
             userdetail(unid)
            //console.log(JSON.parse(value))
             
         } catch (error) {
             // Error retrieving data
         }
     }
 
    function Switch_Notification(u) {
       
        const formData = new FormData()
    
        formData.append('customer_id', id);
        formData.append('notification', u);
        
        try{
          fetch(`${basepath}customer_switch_notifications`, {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body:formData
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson.user)
            setLogin(responseJson.user)
           
        //     if(!responseJson.error == true){
        //     //  setLogin(responseJson.user)
        //     console.log( responseJson)
        // //alert('jfjhgjh')
        
        //     }else{
        //         console.log( 'error')
        //        //indicatorcondition(true)
        //        //Toast.show(responseJson.error_msg,{position:Toast.position.TOP})
        //     }
          })
          .catch((error) =>{});
        }catch(e){} 
    }
    async function setLogin(user){
        // navigation.replace('Dashboard')
        //await AsyncStorage.setItem('userLogedin','true')
       // indicatorcondition(true)
        // AsyncStorage.setItem('userLoginid',user.id.toString())
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
    
 
    return (

    <>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
                {Platform.OS=='ios'?
                    <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                    :
                    <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
                }
                <Text style={styles.textcolor}>Setting</Text>

            </TouchableOpacity>
        </View>
       <ScrollView>
        {/* <View style={{marginTop:10,padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontFamily:'poppinbold'}}>App Language</Text>
            <Text style={{color:'#5c5c5c',fontSize:12}}>English</Text>
        </View> */}
        <View style={{marginTop:20}}>
            <View style={{padding:10,flexDirection:'row',alignItems:'center'}}>
                {user==''?null:
                <CheckBox  onPress={(id)=>Switch_Notification(id)} notification={user}/>}
                <Text style={{fontFamily:'poppin',color:'#5c5c5c'}}>  Receive notification</Text>
            </View>  
            <View style={{borderBottomWidth:1,marginTop:5,width:'90%',alignSelf:'center',borderColor:'#dddddd'}}/>
        </View>
        {/* <View style={{marginVertical:20}}>
            <View style={{padding:10,flexDirection:'row',alignItems:'center'}}>
                <CheckBox/>
                <Text style={{fontFamily:'poppin',color:'#5c5c5c'}}>  Receive Notification By Email</Text>
            </View>  
            <View style={{borderBottomWidth:1,marginTop:5,width:'90%',alignSelf:'center',borderColor:'#dddddd'}}/>
        </View> */}
            <Text style={{alignSelf:'center',fontSize:10,color:'#5c5c5c',top:60}}>App Version 1.2.2</Text>
       </ScrollView>
        
    </>
    );
  
}
 
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
  textcolor:{
   fontFamily:'poppinbold',
    color:'#fff',
    top:4,
    marginLeft:30
  },
});