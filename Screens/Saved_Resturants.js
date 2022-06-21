import React, { Component } from 'react';
import {FlatList,Platform, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground } from 'react-native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerContent} from './DrawerContent'
import { Ionicons,MaterialIcons,AntDesign,Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  CustomSingleItemScroll from "../Component/CustomSingleItemScroll";
import { basepath,Imagebasepath } from "../BasePath/Basepath";
import { useState } from 'react/cjs/react.development';
import AsyncStorage from "@react-native-async-storage/async-storage";

class SavedResturants extends Component {
constructor(props){
  super(props)
  this.state={
    Data_Resturants:[],
    customerid:''
  }
}
  componentDidMount(){
    const unsubscribe = this.props.navigation.addListener('focus', () => {
  
    
    //  this.callThis()
    this.GetUserdata()
    });
   
  }
  GetUserdata=async ()=>{
     
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    this.setState({customerid:customerid.id})
    this.Liked_Resturants()
  }


  Liked_Resturants=()=>{
  
    const formData = new FormData()
    formData.append('customer_id', this.state.customerid);
    
    try{
      fetch(`${basepath}liked_resturant`, {
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
        // navigation.navigate('Dashboard')
        this.setState({
         
          Data_Resturants:responseJson.resturants,
         
         })
        }else{
           alert(responseJson.error)
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }
  render(){
 
    return (
      <>
    
      {/* Header--//////////////////////////////////////////////////////////////////////// */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
              {Platform.OS=='ios'?
                  <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                  :
                  <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
              }
              <Text style={styles.textcolor}>Saved Resturant</Text>

          </TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#fff',flex:1}}>
      <FlatList
        // contentContainerStyle={{ marginLeft: 15 }}
        ListEmptyComponent={()=>{
          return(
          <View style={{height:300,justifyContent:'center',alignItems:'center'}}>
            <Image style={{width:150,height:150}} source={require('../assets/food_Monochromatic.png')}/>
            <Text style={{fontSize:10,color:'#5c5c5c',textAlign:'center'}}>Sorry! No Result Found</Text>
          </View>)
        }}
        data={this.state.Data_Resturants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CustomSingleItemScroll
          navigation={this.props.navigation}
          item={item}
        />
        )}
      />
      </View>

      </>
    );
  }
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
        
    },
    textcolor:{
       fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:30
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
  

export default SavedResturants