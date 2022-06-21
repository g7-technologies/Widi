import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,

  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import {basepath } from "../BasePath/Basepath";

import StarRating from 'react-native-star-rating';
const Rider_CompletedOrders=({navigation,item})=>{
  const [star,starCount]=useState(item.rating)
  const [feedback,isfeedbackgiven]=useState(false)
  function onStarRatingPress(rating) {
    starCount(rating)
    const formData = new FormData()
    
    formData.append('order_id',item.id );
    formData.append('rating',rating );

  
    try{
      fetch(`${basepath}customer_review`, {
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
    
        }else{
           alert('Sever  Error ')
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }
    return(
        <View style={styles.Container}>
        <Text style={{fontWeight:'600',marginVertical:10}}>Order Number</Text>
        <View style={styles.minicontainer}>
            <Text style={{fontWeight:'700',color:'#007aff'}}>{item.order_id}</Text>
            
                <Text style={{fontWeight:'bold',color:'#007aff'}}>Completed</Text>
               
            
        </View>
        <View style={styles.minicontainer}>
            
            <Text style={styles.graytext}>{item.created_at}</Text>
            <Text style={{fontWeight:'600',color:'#007aff'}}>Total : $ {item.amount-item.discount}</Text>
        </View>
        <TouchableOpacity  onPress={()=>navigation.navigate('CompletedOrder',{'order':item})} style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
          <Text  style={{fontWeight:'bold',color:'#007aff'}}>See Detail</Text>
        </TouchableOpacity>
        <Text></Text>
        {item.rating==null?
        <View>
        {!feedback?
        <TouchableOpacity onPress={()=>isfeedbackgiven(!feedback)}>
          <Text>Give Feed Back</Text>
        </TouchableOpacity>
        :
        <StarRating
          containerStyle={{justifyContent:'space-evenly',paddingHorizontal:50}}
          disabled={false}
          maxStars={5}
          disabled={false}
          rating={star}
          starSize={20}
          fullStarColor={'gold'}
          selectedStar={(rating) => onStarRatingPress(rating)}
        />
        }  
        </View>
        :
          <StarRating
          containerStyle={{justifyContent:'space-evenly',paddingHorizontal:50}}
          disabled={true}
          maxStars={5}
          rating={star}
          starSize={20}
          fullStarColor={'gold'}
          //selectedStar={(rating) => onStarRatingPress(rating)}
        />
        }
    </View>
    )
}

const styles = StyleSheet.create({
    header:{
      backgroundColor:'#0f76de',
      height:60,
      justifyContent:'center' 
    },
    textcolor:{
      fontWeight:'bold',
      color:'#fff',
      top:4,
      marginLeft:30
    },
    Body:{
      flex:1,
      
      justifyContent:'center',
      alignItems:'center'
    },
      Container:{
          margin:10,
        justifyContent:'space-between',
        paddingVertical:5,
        paddingHorizontal:5,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.3,
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:5,
        elevation:3
      },
      graytext:{
          color:'#5c5c5c',
      },
      textstyle:{
          fontWeight:'600'
      },
      minicontainer:{
          flexDirection:'row',
          justifyContent:'space-between',
          marginVertical:4
      },
      borderLine:{
          width:'100%',
          borderColor:'#dddddd',
          marginTop:10,
          borderBottomWidth:0.5,
          alignSelf:'center'
      },

      
  });
  export default Rider_CompletedOrders
   