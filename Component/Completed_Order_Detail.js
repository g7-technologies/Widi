import React from 'react';
import { StyleSheet,Image,TouchableOpacity,FlatList,Text, View, Dimensions } from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import  {basepath,Imagebasepath} from "../BasePath/Basepath";

function  Completed_Order_Status  ({navigation,route}) {
    //console.log(route)
    const [data,getorderdetail]=useState(route.params.order.order_detail)
    const [order,getorder]=useState(route.params.order)
    useEffect(()=>{
        console.log('*******************')
        console.log(route.params.order)
        console.log('*******************')

    })
    return(
    <View style={{flex:1,backgroundColor:'#fff'}}>
         
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Order Detail</Text>

        </TouchableOpacity>
        </View>
       
        <Text style={{fontSize:12,color:'#5c5c5c',marginLeft:10}}>Total items ({data.length})</Text>
        <FlatList
            
            keyExtractor={()=>Math.random().toString()}
            contentContainerStyle={{ marginHorizontal: 10 }}
            data={data}
            renderItem={({ item, index }) => (
            <View style={{marginVertical:4,flexDirection:'row',elevation:3,shadowOpacity:0.2,borderRadius:5,shadowOffset:{width: 0.5,height:0.5,},backgroundColor:'#fff'}}>
                <View>
                    <View style={{width:340}}>
                    <Image source={{uri:`${Imagebasepath}`+item.meals.image}} style={{height:100,borderRadius:4}}/>
                   </View>
                    <View style={{margin:4}} >
                    <Text style={{marginVertical:5,fontFamily:'poppinbold'}}>{item.meals.name}</Text>
                    <View style={styles.borderLine}/>
                    <View style={{paddingVertical:10}}>
                    <Text style={{fontFamily:'poppin'}}>Description</Text>
                    <Text style={{fontSize:12,color:'#5c5c5c'}}>{item.meals.description}</Text>
                    </View>
                    <View style={styles.borderLine}/>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{marginVertical:5,fontSize:12,color:'#5c5c5c',fontFamily:'poppin'}}>Quantity : {item.quantity} </Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{marginVertical:5,fontSize:12,color:'#5c5c5c',fontFamily:'poppin'}}>Price : </Text>
                            <Text style={{color:'#0f76de',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>$ {item.price}</Text>
                            <Text style={{color:'#0f76de'}}> $ {item.price-item.discount}</Text>
                        </View>
                    </View>
                   
                    
                    </View>
                </View>  
                
                 
                
               
               
            </View>
            )}
        />
     
        
        <View style={{marginVertical:4,elevation:3,margin:10,padding:5,shadowOpacity:0.2,borderRadius:5,shadowOffset:{width: 0.5,height:0.5,},backgroundColor:'#fff'}}>
         
            <View style={{marginVertical:5}}>
            <Text style={{fontFamily:'poppinbold',color:'#0f76de'}}>Delivery Address</Text>
            <Text style={{fontSize:12,color:'#5c5c5c'}}>
            {order.customer_address}
            </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontFamily:'poppinbold'}}>Total</Text>
            <Text style={{color:'#0f76de',fontWeight:'bold'}}>{order.amount-order.discount}</Text>
            </View>
        </View>
    </View>
    )
}

export default Completed_Order_Status;

const styles = StyleSheet.create({
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
    borderLine:{
        width:'100%',
        borderColor:'#dddddd',
       
        borderBottomWidth:0.8
      },
})