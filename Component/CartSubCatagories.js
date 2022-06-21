import React, { Component, useEffect, useState } from 'react';
import {Text,View,Animated,Image,StyleSheet,FlatList, Dimensions, ImageBackground} from 'react-native';
import { AntDesign,Entypo,Foundation } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Imagebasepath } from "../BasePath/Basepath";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { addFood,deleteFood } from "../actions/Food";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartSubCatagories=({itemquantity,index,item,navigation})=>{
  
  // const Item_quantity=useSelector(state=>state.foods.fooList)
  // itemquantity.length<1?0: itemquantity[index].Item_Quantity
  const [totalquantity,quantity]=React.useState(Get_Item_Quantity(item.id))
    const [color,nocolor]=React.useState(false)
    const [totalprice,price]=React.useState(0)
    const dispatch = useDispatch();

    // console.log('quantity',itemquantity[index]==undefined?'value':'none')
      const state=useSelector(state=>state.foods.foodList)
    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        quantity(Get_Item_Quantity(item.id))
      //  Callthis()
      });
    })
  
   function Get_Item_Quantity(key){
     var matched=0;
     
    itemquantity.forEach(element => {
    
     if(element.key==key){
        console.log(element.Item_Quantity)
         matched = element.Item_Quantity;
       }
     });
     
     return matched;
   }
   
   function AddFood(){
     if(state.length<1){
      nocolor(true),
      quantity(totalquantity+1),
      price(item.price),
      dispatch(addFood(item,totalquantity+1,parseFloat(item.price)))

     }
    else if(state[0].name.resturant_id == item.resturant_id){
      nocolor(true),
      quantity(totalquantity+1),
      price(item.price),
      dispatch(addFood(item,totalquantity+1,parseFloat(item.price)))

     }else{
       alert('You can buy from one resturant at time')
     }
   }

    return(
      
      <TouchableOpacity 
      activeOpacity={1} 
      // onLongPress={()=>navigation.navigate('SingleCartItem',{'data':item,'totalquantity':totalquantity})} 
      //onPress={()=>{}}
      onLongPress={()=>navigation.navigate('SingleCartItem',{'data':item,'totalquantity':totalquantity})} 

      
      onPress={() =>{ 
        AddFood()
      }}
     
     >
       
        <View style={{}}>
            {totalquantity==0?
            <View style={color?styles.triangleCorner:{}} />
           :
              <View style={styles.triangleCorner} />
            }
            
            <Text  style={{textAlign:'right',right:4,color:'#fff'}}>{ totalquantity}</Text>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Image source={{uri:Imagebasepath+item.image}} style={{width:60,height:60,borderRadius:10}}/>
                    <View style={{marginLeft:5}}> 
                      <Text style={{fontSize:15,fontFamily:'poppinbold'}}>{item.name}</Text>
                      <Text style={{marginTop:5,fontFamily:'poppin',width:150}}>{item.description}</Text>
                    </View>
                </View>
                <View style={{justifyContent:'flex-end',bottom:7}}>
                <Text style={{fontWeight:'600',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>${item.price}</Text>
                <Text style={{fontWeight:'600'}}>${item.price-item.discount_price}</Text>
                </View>
            </View>
            <View style={styles.borderLine}/>
        </View>

            
      </TouchableOpacity>
    )
  }
  const mapStateToProps = state => ({
    cartitem: state.cartitem
  });
  const mapDispatchToProps = dispatch => ({
    incressCart:()=>dispatch({type:'ADD_TO_CART'})
  });
  export default connect(mapStateToProps,mapDispatchToProps)( CartSubCatagories)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20,
      backgroundColor:'#fff'
    },
    CatagoriesborderLine:{
      width:'90%',
      borderColor:'#0f76de',
      marginTop:5,
      marginLeft:10,
      borderBottomWidth:2,
      alignSelf:'center'
    },
    closebutton:{
      backgroundColor:'#fff',
      marginTop:12,
      marginLeft:15,
      width:25,
      height:25,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20
    },
    menucontainer:{
      top:Dimensions.get('window').height/6,
      backgroundColor:'#fff',
      padding:25,
      borderColor:'#dddddd',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
      shadowOpacity:1,
      shadowOffset:{width:1,height:1},
      borderWidth:0.4,
      elevation:3,
      flex:1
    },
    headingtext:{
      color:'#0f76de',
      fontWeight:'600',
      fontSize:20
    },
    description:{
      fontSize:12,
      marginTop:5,
      color:'#5c5c5c'
    },
    LoginButton:{
      width:'80%',
      alignSelf:'center',
      backgroundColor:'#0f76de',
      padding:10,
      margin:20,
      borderRadius:5,
      justifyContent:'space-between'
    },
    text:{
      fontWeight:'500',
      fontSize:15,
      textAlign:'center',
      letterSpacing:1,
      color:'#fff'
    },
    Addbuttons:{
      flexDirection:'row',
      width:50,
      justifyContent:'space-between',
      alignItems:'center'
    },
    button:{
      width:15,
      height:15,
      borderWidth:1,
      borderRadius:10,
      borderColor:'#0f76de',
      justifyContent:'center',
      alignItems:'center'
    },
    catagories:{
      fontSize:15,
      marginLeft:10
    },
    CardContainer:{
      width:'99%',
      elevation:3,
      marginTop:10,
      height:80,
      borderRadius:10,
      alignSelf:'center',
      backgroundColor:'#fff',
      shadowOpacity:0.1,
      shadowOffset:{width:0.5,height:0.5}
  },
  CardContainerRight:{
      flexDirection:'row',
      padding:4,
      marginTop:10,
      alignItems:'center',
      justifyContent:'space-between'
  },
  CardContainerLeft:{
      flexDirection:'row',
      alignItems:'center'
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 35,
    borderTopWidth: 35,
    borderRightColor: 'transparent',
    borderTopColor: '#0f76de',
    position:'absolute',alignSelf:'flex-end',
    transform: [
        {rotate: '90deg'}
      ]
  },
  borderLine:{
    width:'100%',
    borderColor:'#dddddd',
    marginTop:10,
    borderBottomWidth:0.8
  },
  
  });
