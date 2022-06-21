import React, { isValidElement, useState } from 'react';
import {FlatList,RefreshControl,Animated, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


function FoodCatagory({item,onPress,index}){
    // alert(JSON.stringify(item))
    const [defaultcolor,bluecolor]=React.useState(false)
   
    return(
      <TouchableOpacity
            // key={item.key}
            onPress={()=>{bluecolor(!defaultcolor),onPress(index,item)}}
            style={{flexDirection:'row',marginHorizontal:2}}>
            <View style={{...styles.ListButtons,backgroundColor:defaultcolor?'#0f76de':'#fcfcfc',}}>
              <Text style={{fontFamily:'poppin',color:defaultcolor?'#fcfcfc':'#000000',}}>{item}</Text>
            </View>
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
  

  export default FoodCatagory