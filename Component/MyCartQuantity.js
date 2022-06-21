import React, { useState } from 'react';
import { ScrollView, FlatList,Platform,StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons,MaterialIcons,AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { Imagebasepath } from "../BasePath/Basepath";
import { addFood,deleteFood ,deleteFoodfrom} from "../actions/Food";
import Animated from 'react-native-reanimated';

function  CartQuantity({item,index}){
//   console.log(item)
  const [DATA,Get_DATA]=useState(item)
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  console.log(DATA)
  console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')

  const dispatch = useDispatch();
  const count = useSelector(state => state.foods.foodList[index].Item_Quantity)

    return(
    <View style={styles.CardContainer}>
        <View style={styles.CardContainerRight}>
            <View style={{flexDirection:'row'}}>
                <Image style={{width:50,height:50,borderRadius:4}} source={{uri:Imagebasepath+DATA.name.image}}/>
                <View style={{marginLeft:10}}>
                    <Text style={{fontFamily:'poppinbold',marginTop:2}}>{DATA.name.name}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text  style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',marginTop:5,fontFamily:'poppinbold'}}  >${DATA.name.price}</Text>
                        <Text style={{marginTop:5,marginLeft:10,fontFamily:'poppinbold'}}>${DATA.name.price-DATA.name.discount_price}</Text>
                    </View>
                </View>
             
            </View>
            <View style={styles.CardContainerLeft}>
            
                <TouchableOpacity 

    //onPress={()=>alert(DATA.key)}
               onPress={() =>{
                if(count<2){

                }else   
                dispatch(deleteFood(DATA.name,count-1,parseFloat(DATA.name.price),DATA.key))}} style={{borderWidth:1,alignContent:'center',borderColor:'#dddddd',borderRadius:20,padding:3}}
                >
                    <AntDesign name="minus" size={15} color="#0f76de" />
                </TouchableOpacity>
                <View style={{marginHorizontal:8,fontFamily:'poppin',borderWidth:1,alignItems:'center',justifyContent:'center',borderColor:'#dddddd',borderRadius:4,width:25,height:25,textAlign:'center'}}>
                {/* DATA.Item_Quantity */}
                <Text >{count}</Text> 
                </View>
                <TouchableOpacity  
                onPress={() =>{ dispatch(addFood(DATA.name,count+1,parseFloat(DATA.name.price)))}} 
                //  onPress={() =>console.log(DATA.name,1,DATA.name.price)}
                style={{borderWidth:1,borderColor:'#dddddd',borderRadius:20,padding:3}}>
                    <AntDesign name="plus" size={15} color="#0f76de" />
                </TouchableOpacity> 
            </View>   
        </View>
        <TouchableOpacity onPress={()=>dispatch(deleteFoodfrom(item.key))} style={{padding:10,borderBottomLeftRadius:10,borderBottomRightRadius:10,backgroundColor:'#0f76de',}}>
        <Text style={{textAlign:'center',color:'#fff'}}>Remove</Text>
        </TouchableOpacity>
    </View>
    )
}

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
          marginTop:Platform.OS=='android'?25:0
      },
      textcolor:{
         fontFamily:'poppinbold',
          color:'#fff',
          top:4,
          marginLeft:20
      },
      CardContainer:{
          width:'90%',
          marginVertical:Platform.OS=='ios'?5: 14,
          height:Platform.OS=='ios'?110:120,
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
          padding:12,
          margin:20,
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
  

  export default CartQuantity