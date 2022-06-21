import React, { useState,useEffect } from 'react';
import { ScrollView,Platform, StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({navigation}) {

    const [cardnumber,creditcardNumber]=useState(null)
    const [holdername,cardholder]=useState('')
    const [userid,getid]=useState(null)
      useEffect(()=>{
        GetUserdata()
      })
      async function GetUserdata(){
        var userdata=await AsyncStorage.getItem('USER_DATA')
        var customerid=JSON.parse(userdata)
        getid(customerid.id)
      }
    function cc_format  (value) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        for (var i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            var vv =  parts.join(' ')
           
            creditcardNumber(vv)
    
            return vv
        } else {
            var vv = value
           
            creditcardNumber(vv)
            return vv
        }
    }
    function StoreCard(){
        const formData = new FormData();
        formData.append("customer_id", "2");
        formData.append("card_number", cardnumber);
        // formData.append("name",holdername );
        try {
          fetch(`${basepath}card_details`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('##################')
               
                console.log( responseJson)
               console.log('##################')
              if (!responseJson.error == true) {
               alert('success')
              } else {
                alert("Some error " + responseJson.error_msg);
              }
            })
            .catch((error) => {});
        } catch (e) {}
    }
    return (
    <ScrollView style={styles.container}>
        
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Add card</Text>

        </TouchableOpacity>
        </View>
        <View style={{padding:10}}>
            <Text style={{color:'#5d5d5d',fontFamily:'poppin'}}>Enter card number</Text>
            <TextInput keyboardType='decimal-pad' value={cardnumber} onChangeText={(card)=>cc_format(card)} style={{paddingVertical:10,fontFamily:'poppin'}} placeholder='2342 3434 5544 2233'/>
            <View style={styles.borderLine}/>
        </View>
        
        {/* <View style={{padding:10}}>
            <Text style={{color:'#5d5d5d',fontFamily:'poppin'}}>Card holder name</Text>
            <TextInput value={holdername} onChangeText={(name)=>cardholder(name)} style={{paddingVertical:10,fontFamily:'poppin'}} placeholder='card holder name'/>
            <View style={styles.borderLine}/>
        </View> */}
        <TouchableOpacity onPress={()=>StoreCard()} style={styles.LoginButton}>
          <Text style={styles.text}>Add Card</Text>
      </TouchableOpacity>
    
      <View style={{bottom:-80}}>
          <View style={{alignSelf:'center',flexDirection:'row',alignItems:'center'}}>
      <MaterialIcons name="lock" size={20} color="#dddddd" />
        <Text style={{color:'#dddddd',fontFamily:'poppin',textAlign:'center'}}> All your information is secure and safe</Text>
        </View>
      </View>
    </ScrollView>
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
        justifyContent:'center',
        // marginTop:Platform.OS=='android'?25:0 
    },
    textcolor:{
       fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
    CardContainer:{
        width:'80%',
        height:300,
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        shadowOffset:{width:0.5,height:0.5}
    },
    subContainer:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:20
    },
    borderLine:{
        width:'100%',
        borderColor:'#dddddd',
        marginTop:10,
        borderBottomWidth:1.5
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:12,
        margin:20,
        borderRadius:5
    },
    text:{
        fontFamily:'poppin',
        fontSize:15,
        textAlign:'center',
        color:'#fff'
    }
});
