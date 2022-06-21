import React, { isValidElement, useState } from 'react';
import {FlatList,RefreshControl,Animated, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground, Platform } from 'react-native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons,MaterialIcons,AntDesign,Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Imagebasepath } from "../BasePath/Basepath";
function CustomSingleItemScroll({item,navigation}){
    // alert(JSON.stringify(item))
    const [defaultcolor,bluecolor]=React.useState(false)
    return(
    <TouchableOpacity onPress={()=>navigation.navigate('CartDetail',{item})} style={{width:'95%',alignSelf:'center',marginVertical:5,borderWidth:0.3,borderColor:'#dddddd',borderRadius:5,}}>
         
        <ImageBackground source={{uri:Imagebasepath+item.logo}} imageStyle={{borderTopLeftRadius:5,borderTopRightRadius:5}} style={{width:'100%',height:100}}>
       <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:10,alignContent:'center',height:60,borderBottomLeftRadius:4,borderBottomRightRadius:4,width:50}}>
                {/* <Text style={{fontSize:15,marginTop:15,fontFamily:'poppinbold',textAlign:'center',color:'#fff'}}>20 %</Text>
                <Text style={{fontSize:8,fontFamily:'poppinbold',textAlign:'center',color:'#fff'}}>Discount</Text> */}
            </View>
        <View style={{width:'70%'}}/>
        {/* <View style={{marginTop:10}}>
        {item.liked?
          <AntDesign name="heart" size={14} color="red" />
          :
          <AntDesign name="hearto" size={14} color="red" />
        }
        </View> */}
        </View>
        <View style={{padding:4,justifyContent:'flex-end',borderTopLeftRadius:10,borderBottomLeftRadius:10,flexDirection:'row',alignItems:'flex-end',backgroundColor:'#F8F8F8',width:50,alignSelf:'flex-end',top:25}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialIcons name="star" size={14} color="#868a19" />
            <Text style={{marginLeft:2,fontFamily:'poppin'}}>{item.rating}</Text>
          </View>
        </View>
        </ImageBackground>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{marginVertical:15,fontFamily:'poppinbold',paddingHorizontal:5}}>{item.name}</Text>
            <View style={{marginTop:20,marginRight:10}}>
              {item.liked?
                <AntDesign name="heart" size={14} color="red" />
               :
                <AntDesign name="hearto" size={14} color="red" />
              }
        </View>
        </View>
            <Text style={{color:'#5c5c5c',paddingHorizontal:5,fontFamily:'poppin'}}>{item.description}</Text>
            {/* <View style={{flexDirection:'row',paddingHorizontal:5,marginVertical:5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../assets/meter.png')} style={{width:10,height:10,resizeMode:'contain'}}/>
                <Text style={{color:'#5c5c5c',marginLeft:5,fontSize:12,fontFamily:'poppin'}}>20-30 Mins </Text>
            </View>
            <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../assets/bike.png')} style={{width:10,height:10,resizeMode:'contain'}}/>
                <Text style={{color:'#5c5c5c',marginLeft:5,fontSize:12,fontFamily:'poppin'}}>80 PKR </Text>
            </View>
            </View> */}
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
 
  ListButtons:{
    
    borderWidth:0.3,
    borderColor:'#dddddd',
    padding:5,
    marginRight:4,
    borderRadius:20,
    paddingHorizontal:10 
  },
  
  });
  

  export default CustomSingleItemScroll