import React, { Component, useEffect, useState } from 'react';
import { ScrollView, FlatList,Platform,StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons,MaterialIcons,AntDesign } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
// Component
import CartQuantity from "../Component/MyCartQuantity";
    import {connect} from 'react-redux'
//redux
    import { useDispatch, useSelector } from "react-redux";
      import {addFood,deleteFood} from '../actions/Food';
import { ActivityIndicator } from 'react-native-paper';



 function MyCart ({navigation}){
  var count=useSelector(state => state.foods.foodList)
  var counts=useSelector(state => state.foods)
  
  // var count = useSelector(state => state.foods.foodList)
    const [showindicator,indicatorcondition]=useState(true)
   function TotalPriceofFood(){
    var totalprice = 0
   
    for (let index = 0; index < count.length; index++) {
      // totalprice =totalprice+ count[index].price;
     totalprice =totalprice+ (count[index].price-(count[index].Item_Quantity*count[index].name.discount_price));

    }
  
    return( 
      
    <Text style={{...styles.text,color:'#0f76de'}}>${totalprice==0?'':totalprice}</Text>
    )
   }
   
    useEffect(()=>{
      var newArray = [];
    count.forEach(obj => {
     
      if (!newArray.some(o => o.key === obj.key)) {
        newArray.push({ ...obj })
      }
 
    });
   
   
    })
    function ConfirmOrder (){
      indicatorcondition(false)
     const formData = new FormData();
  
      formData.append("hotel_id", count[0].name.resturant_id);
      try {
        fetch(`${basepath}check_delivery_availability`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //  console.log( responseJson)
            if (!responseJson.error == true) {
              indicatorcondition(true)
              navigation.navigate('Confirmorder')
            } else {
              indicatorcondition(true)
              alert(responseJson.error_msg);
            }
          })
          .catch((error) => {});
      } catch (e) {}
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
            <Text style={styles.textcolor}>My cart</Text>

        </TouchableOpacity>
    </View>
    <FlatList
      ListEmptyComponent={()=>{
         return(
            <View style={{flex:1,marginTop:50,alignSelf:'center'}}>
              <Image style={{width:200,height:100,alignSelf:'center'}} source={require('../assets/undraw_street_food_hm5i.png')}/>
              <Text style={{fontFamily:'poppin',marginTop:50,textAlign:'center',fontSize:12,color:'#5c5c5c'}}>No Food Found In Your Cart ! <Text style={{color:'#0f76de'}} onPress={()=>navigation.goBack(null)}>Order Now</Text></Text>
            </View>
         )
      }}
      
     style={{backgroundColor:'#fff'}}
      keyExtractor={(item, index) => item.key.toString()}

      data={count}
      renderItem={({ item, index }) => (
        <CartQuantity index={index} item={item} />
      )}
    />
    {count.length<1?null:
    <View style={{alignSelf:'center',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',padding:10,flexDirection:'row',height:100}}>
      <View style={{width:'100%',backgroundColor:'#fff',shadowOpacity:0.4,padding:10,borderRadius:5,shadowOffset:{width:1,height:1},paddingLeft:20,flexDirection:'row',justifyContent:'space-between',}}>
        <Text style={{fontFamily:'poppinbold',color:'#0f76de'}}>Sub-Total</Text>
        <TotalPriceofFood/>
      </View>
    </View>
    }
    <View style={{backgroundColor:'#fff'}}>
      {count.length<1?null:
        <View>
        {showindicator?
          <TouchableOpacity onPress={()=>ConfirmOrder()} style={styles.LoginButton}>
              <Text style={styles.text}>Checkout</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity  style={styles.LoginButton}>
            <ActivityIndicator color={'#ffff'}/>
          </TouchableOpacity>
        }
        </View>
      }
    </View>
    </>
  );
}
//colors on focus #97c6f4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   
  },
  heading_text:{
    color:'#5d5d5d',
    fontSize:20,
    fontWeight:'700',
    padding:10
  },
   
    header:{
        backgroundColor:'#0f76de',
        height:60,
        justifyContent:'center' ,
       
    },
    textcolor:{
       fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:20
    },
    CardContainer:{
        width:'90%',
        marginTop:10,
        height:80,
        borderRadius:10,
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        shadowOffset:{width:0.5,height:0.5},
        elevation:3
    },
    CardContainerRight:{
        flexDirection:'row',
        padding:10,
        marginTop:5,
        alignItems:'center',
        justifyContent:'space-between'
    },
    CardContainerLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    subContainer:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:20
    },
    borderLine:{
        width:'90%',
        borderColor:'#dddddd',
        marginTop:20,
        borderBottomWidth:0.5,
        alignSelf:'center'
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:8,
        marginHorizontal:10,
        borderRadius:5,
        bottom:10
    },
    text:{
        fontFamily:'poppin',
        fontSize:15,
        textAlign:'center',
        color:'#fff'
    }
});


export default MyCart