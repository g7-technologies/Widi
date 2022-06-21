import React, { isValidElement, useState } from 'react';
import {FlatList,Animated, Platform,StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground } from 'react-native';

import { Ionicons,MaterialIcons,AntDesign,Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FoodCatagory from '../Component/FoodCatagory'
import  SeeAllResturants  from "../Component/SeeAllResturants";

export default function SearchedFood({ navigation,route }) {
  console.log(route)
    const [Focus,setFocus]=useState(false)
    const [foodSearched,foodsearch]=useState('')
    const [Data,Get_Data]=useState(route.params.data)
    const [Duplicate_Data,Get_Duplicate_Data]=useState(route.params.data)
    
   function  FilterFood(param){
     
      var Food=Data
      var ara=[];
       for(var i=0;i<Food.length;i++){
         var x = Food[i].name.toUpperCase()
         if(x.match(param.toUpperCase())){
          ara.push( Food[i])
         }
       }
       if(param.length == 0){
        Get_Duplicate_Data(Data)
       }
       else{
        Get_Duplicate_Data(ara)
       }
     }
     React.useEffect(()=>{
      console.log('sdasaasfdssc ')
     })
    return (
      <>
      
      {/* Header--//////////////////////////////////////////////////////////////////////// */}
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Search Resturant</Text>

        </TouchableOpacity>
        </View>
        <View style={styles.searchbarsection}>
            <View style={styles.searchbar}>
                <Image source={require('../assets/search.png')} style={{width:15,height:15}}/>
                <View style={{width:'100%',}}>
                <TextInput onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}  onChangeText={(foodSearched)=>{foodsearch(foodSearched),FilterFood(foodSearched)}} placeholderTextColor='#5c5c5c' placeholder='Find resturant you like' style={{paddingHorizontal:10}}/>
                </View>
            </View>
        
        </View>
       
      
  
        {/* Search bar-..////////////////////////////////////////////////////////////////// */}
      
      {/* Buttons ---////////////////////////////////////////////////////////////////////////////////////// */}
      
      <Animated.View style={{flex:1,backgroundColor:'#fff'}}>
        
     
        
      <FlatList
     ListEmptyComponent={()=>{
      return(
      <View style={{alignSelf:'center'}}>
        <Image style={{width:150,height:150}} source={require('../assets/food_Monochromatic.png')}/>
        <Text style={{fontSize:10,color:'#5c5c5c',textAlign:'center'}}>Sorry! No Result Found</Text>
      </View>)
    }}
     contentContainerStyle={{marginLeft:20,margin:10}}
     data={Duplicate_Data}
     keyExtractor={(item, index) => index.toString()}

     renderItem={({ item, index }) => (
       <SeeAllResturants navigation={navigation} item={item} />
     )}
   />

     </Animated.View>
     
      
     
      {/* <View style={{backgroundColor:'#fff'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}  style={styles.LoginButton}>
          <Text style={styles.text}>View cart</Text>
      </TouchableOpacity>
      </View> */}
  
      </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    borderLine:{
        width:'100%',
        borderColor:'#dddddd',
        marginTop:10,
        borderBottomWidth:0.8
    },
    header:{
      backgroundColor:'#0f76de',
      padding:10,
      justifyContent:'center',
      
    },
    textcolor:{
        fontFamily:'poppin',
        color:'#fff',
        top:4,
        marginLeft:30
    },
  ListButtons:{
    backgroundColor:'#fcfcfc',
    borderWidth:0.3,
    borderColor:'#dddddd',
    padding:5,
    borderRadius:20,
    paddingHorizontal:10 
  },
  searchbarsection:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    backgroundColor:'#fff'
  },
  searchbar:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#dddddd',
    borderWidth:0.3,borderRadius:4,
    padding:10,
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
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:12,
    margin:20,
    borderRadius:5
},
text:{
    fontFamily:'poppinbold',
    fontSize:15,
    textAlign:'center',
    letterSpacing:1,
    color:'#fff'
},
mainCard:{
    width:'95%',
    marginTop:10,

    alignSelf:'center',
    
    paddingBottom:5,
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
  