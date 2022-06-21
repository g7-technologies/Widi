import React, { Component, useState } from 'react';
import {Text,View,Animated,Image,StyleSheet,FlatList, Dimensions, ImageBackground} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign,Entypo,Foundation } from '@expo/vector-icons';

function SaveResturant({value,onPress}){
    const [like,unlike] =useState(value.liked)
    return(
      <TouchableOpacity onPress={()=>{unlike(!like),onPress(value.id)}}>
        {!like?
          <AntDesign name="hearto" size={14} color="red" />
        :
          <AntDesign name="heart" size={14} color="red" />
        }
      </TouchableOpacity>
    )
}

export default SaveResturant