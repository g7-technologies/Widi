
import React, { useEffect, useState } from 'react';
import { ScrollView,FlatList, StyleSheet,Platform,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons,AntDesign,FontAwesome5 ,Entypo} from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App({navigation}) {
 const [data,cardlist]=useState([])
 //const [userid,getid]=useState(null)
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            GetUserdata()
            
        });
        
        return unsubscribe;
    },[])
    async function GetUserdata(){
        var userdata=await AsyncStorage.getItem('USER_DATA')
        var customerid=JSON.parse(userdata)
        
        GetCreditCardList(customerid.id)
    }
    function GetCreditCardList(id){
        const formData = new FormData();
        formData.append("customer_id", id);
       
        // formData.append("name",holdername );
        try {
          fetch(`${basepath}cards_list`, {
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
               
                cardlist( responseJson.customer_card_details)
               console.log('##################')
              if (!responseJson.error == true) {
            //    alert('success')
              } else {
                alert("Some error ");
              }
            })
            .catch((error) => {});
        } catch (e) {}
    }   

    function MaskNumber(n){
        var number = String(n)
        var length = number.length-6
        var middle = '*'.repeat(length)

        // var str=number.substr(0,4)
        return(
                <Text>{number[0]+number[1]+number[2]+number[3]+middle+number[number.length-4]+number[number.length-3]+number[number.length-2]+number[number.length-1]}</Text>
        )
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
            <Text style={styles.textcolor}>Wallet</Text>

        </TouchableOpacity>
    </View>

    {data.length<1?
    <View style={{flex:1,backgroundColor:'#fff',}}>
        <Image style={{width: 150,height:150,alignSelf:'center'}} source={require('../assets/undraw_Credit_card_re_blml.png')}/>
        <Text style={{fontSize:12,color:'#5c5c5c',textAlign:'center'}}>No ! Credit Card Found</Text>
       <View style={{marginTop:50}}>
       <TouchableOpacity onPress={()=>navigation.navigate('CreditcardInput')} style={styles.LoginButton}>
            <Text style={styles.text}>Add new Card</Text>
        </TouchableOpacity>
        </View>
    </View>
    :
    <View style={{flex:1}}>
            {/* <View style={{flexDirection:'row',padding:20,backgroundColor:'#fff',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{marginTop:10}}>
                    <Text style={{fontWeight:'bold',color:'#0f76de',fontFamily:'poppinbold',fontSize:20}}>NGN 3422</Text>
                    <Text style={{color:'#dddddd',fontFamily:'poppin',marginTop:5}}>Available credit </Text>
                </View>
                <View style={{top:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity>
                        <AntDesign name="plussquare" size={24} color="#0f76de" />
                    </TouchableOpacity>
                    <Text style={{marginTop:5,fontFamily:'poppin'}}>Add credit</Text>
                </View>
           
            </View> */}
        {/*  */}
        
    <ScrollView style={styles.container}>
        <View style={styles.PayentCardContainer}>
            <View style={{flexDirection:'row',padding:15,justifyContent:'space-between'}}>
                {/* <Text style={{color:'#5d5d5d',fontFamily:'poppinbold'}}>Cards</Text> */}
                <Text style={{fontWeight:'bold',color:'#0f76de',fontFamily:'poppinbold',fontSize:20}}>Cards</Text>
                <Text onPress={()=>navigation.navigate('ManageCard')} style={{color:'#0f76de',fontFamily:'poppinbold'}}>Manage</Text>
            </View>
            <FlatList
            showsHorizontalScrollIndicator={false}
            // horizontal
            // contentContainerStyle={{ marginHorizontal: 10 }}
            data={data}
            renderItem={({ item, index }) => (
            <View style={styles.subContainer}>
                {/* <Image source={require('../assets/mastercard.png')} style={{width:20,resizeMode:'contain',height:20}}/> */}
                <Entypo name="credit-card" size={24} color='#0f76de' />
                <View style={{width:'90%',marginLeft:10}}>
                    
                    {/* <Text>{item.card_number}</Text> */}
                    {MaskNumber(item.card_number)}
                    {/* <Text>{item.card_number}</Text> */}
                    <View style={styles.borderLine}/>
                </View>
            </View>
            )}
            />
            
          
            
            <View style={{height:40,flexDirection:'row',alignItems:'center',marginTop:40}}>
                <View style={{backgroundColor:'#dddddd',paddingHorizontal:15,paddingVertical:4,marginLeft:10}}>
                    <FontAwesome5 name="plus" size={14} color="black" />
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('CreditcardInput')}>
                    <Text style={{color:'#0f76de',fontFamily:'poppin',marginLeft:10}}>Add new card</Text>
                </TouchableOpacity>
            </View>
        </View>
        
       
        

    </ScrollView>
    </View>
    
    }
    
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
        // marginTop:Platform.OS=='android'?25:0
    },
    textcolor:{
        fontWeight:'bold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
    CardContainer:{
      flex:1
    },
    CardContainers:{
        width:'90%',
        height:Platform.OS=='android'? 500:20,
        borderRadius:5,
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        shadowOffset:{width:0.5,height:0.5}
    },
    
    subContainer:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:20,
        alignItems:'center'
    },
    borderLine:{
        width:'100%',
        borderColor:'#dddddd',
        marginTop:10,
        borderBottomWidth:0.4
    },
    PayentCardContainer:{
        width:'95%',
        
        paddingVertical:10,
        borderRadius:5,
       
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        marginTop:10,
        shadowOffset:{width:0.5,height:0.5}
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:10,
        margin:20,
        borderRadius:5
    },
    text: {
        fontFamily: "poppinbold",
        fontSize: 15,
        textAlign: "center",
    
        color: "#fff",
      },
});
