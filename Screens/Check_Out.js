import React, { useState } from 'react';
import { ScrollView,BackHandler,FlatList,Platform, StyleSheet,Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Emptycart } from "../actions/Food";
import Toast from 'react-native-tiny-toast'
import { StackActions } from '@react-navigation/native';
import * as WebBrower from "expo-web-browser";

export default function App({navigation}) {
    var meals=useSelector(state => state.foods.foodList)
    const dispatch = useDispatch();
    const [cardnumber,creditcardNumber]=useState('4242424242424242')
    const [cardexpiry,expirydate]=useState('11/22')
    const [cvc,cardcvc]=useState('1234')
    const [showindicator,indicatorcondition]=useState(true)
    const [holdername,cardholder]=useState('m')
    const [userid,getid]=useState(null)
    const [data,cardlist]=useState([])
    const [latitude,personlatitude]=useState([])
    const [longitude,personlongtitude]=useState([])
    const [address,getcustomeraddress]=useState('')
    React.useEffect(()=>{
      GetUserdata()
    })
    async function GetUserdata(){
      var userdata=await AsyncStorage.getItem('USER_DATA')
      var customerid=JSON.parse(userdata)
      var personlat=await AsyncStorage.getItem('personlatitude')
      var personlng=await AsyncStorage.getItem('personlongitude')
      var customeraddress=await AsyncStorage.getItem('UserPlaceName')
      personlatitude(personlat)
      personlongtitude(personlng)
      getid(customerid.id)
      getcustomeraddress(customeraddress)
      //GetCreditCardList(customerid.id)
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
    function cc_format_date  (value)  {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        for (var i=0, len=match.length; i<len; i+=2) {
            parts.push(match.substring(i, i+2))
        }
        if (parts.length) {
          var vv =  parts.join('/')
          expirydate(vv)
          return vv
        } else {
          var vv = value
          expirydate(vv)
          return vv
        }
    }
    function cc_format_cvc  (value) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        for (var i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            var vv =  parts.join(' ')
           
            cardcvc(vv)
    
            return vv
        } else {
            var vv = value
           
            cardcvc(vv)
            return vv
        }
    }
    function Stripe(params) {
        
        if(cardnumber=='' || cardexpiry=='' ||  cvc=='' || holdername==''){
            alert('Please Provide All detail')
        }else{
            var cardNum = cardnumber
        cardNum=cardNum.replace(/ +/g, "");
       var cardDates = cardexpiry
        cardDates = cardDates.split('/')
        var month = cardDates[0]
        var year = cardDates[1]
        // alert(cardNum+" "+month+'         '+year)
        var stripe_url = 'https://api.stripe.com/v1/tokens?card[number]='+cardNum+'&card[exp_month]='+month+'&card[exp_year]='+year+'&card[cvc]='+cvc+'&card[name]='+holdername;
        //alert(stripe_url)
        Payment(stripe_url)
       
        }
    }
    async  function Payment (url) {
    indicatorcondition(false)
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer "+'pk_test_JyWtTF6wpanWMgOGw5YGwJPE00fqEH7FE4'
          }
        });
        let responseJson = await response.json();
        //alert(JSON.stringify(responseJson))
            if (responseJson.error){
        //   this.setState({isLoading: false, show_error: true, error_message: responseJson.error.message})
        alert('Invalid Credential')
        indicatorcondition(true)
        }else{
        // console.log(responseJson.id)
        //this.setState({error_message:''})
        charge_request(responseJson.id)
         
        // alert('Payment Successfull')
        }
    }
    function charge_request  (id) {  

        const formData = new FormData()
        formData.append('customer_id',userid);
        formData.append('meals', JSON.stringify( meals));
        formData.append('token',id );
        formData.append('latitude',latitude)
        formData.append('longitude',longitude)
        formData.append('customer_address',address)

        
         
        try{
          fetch(`${basepath}place_order`, {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body:formData
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('enter3')
            // this.setState({isLoading: false})
            indicatorcondition(true)
           Emptymycart()
            //alert('Payment Done')
            Toast.show('Payment Done',{position:Toast.position.TOP})
            //navigation.navigate('Dashboard')
            // if(responseJson.error == true){ 
            // alert('success')
           
            // }else{
                     
              
             
            // }
          })
          .catch((error) =>{
            console.log('e2 '+error)
              
          });
        }catch(e){
            console.log('e1 '+e)
        }
      
      }
      function Emptymycart() {
        dispatch(Emptycart())
        const popAction = StackActions.pop(4);
        navigation.dispatch(popAction)
      }
      function OpenBrowser(params) {
        WebBrower.openBrowserAsync('https://docs.expo.io')
      }
      // React.useEffect(() => {
      //   const backAction = () => {
      //    if(true){
      //      navigation.replace('Dashboard')
      //    }else{
      //      navigation.goBack(null)
      //    }
      //     return true;
      //   };
      
      //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
      //   return () => backHandler.remove();
      // }, []);

    
    
    return (
        <ScrollView style={styles.container}>
        
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Payment</Text>

        </TouchableOpacity>
        </View>
        <View style={{padding:10}}>
            <Text style={{color:'#5d5d5d',fontFamily:'poppin'}}>Enter card number</Text>
            <TextInput value={cardnumber}  onChangeText={(e)=>cc_format(e)} style={{paddingVertical:10,fontFamily:'poppin'}} placeholder='2342 3434 5544 2233'/>
            <View style={styles.borderLine}/>
        </View>
        <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <Text style={{color:'#5d5d5d',fontFamily:'poppin'}}>Expiry Date</Text>
                <TextInput value={cardexpiry} maxLength={5} onChangeText={(e)=>cc_format_date(e)} style={{paddingVertical:10,fontFamily:'poppin'}} placeholder='12/11/20'/>
                <View style={{...styles.borderLine,width:100}}/>
            </View>
            <View>
                <Text style={{color:'#5d5d5d',fontFamily:'poppin'}}>CVC</Text>
                <TextInput value={cvc} onChangeText={(e)=>cc_format_cvc(e)} maxLength={4}  style={{paddingVertical:10,fontFamily:'poppin'}} placeholder='2233'/>
                <View style={{...styles.borderLine,width:100}}/>
            </View>
        </View>
        <View style={{padding:10}}>
            <Text style={{color:'#5d5d5d',fontFamily:'poppin'}}>Card holder name</Text>
            <TextInput onChangeText={(e)=>cardholder(e)} style={{paddingVertical:10,fontFamily:'poppin'}} placeholder='card holder name'/>
            <View style={styles.borderLine}/>
        </View>
        {showindicator?
        <View>
          {Platform.OS=='android'?
        <TouchableOpacity onPress={()=>{
          if(meals.length>0){
           Stripe()
          }else{
            Toast.show('Cart is Empty',{position:Toast.position.TOP})
           
          }
        }} style={styles.LoginButton}>
          <Text style={styles.text}>Pay</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>{
          if(meals.length>0){
           OpenBrowser()
          }else{
            Toast.show('Cart is Empty',{position:Toast.position.TOP})
           
          }
        }} style={styles.LoginButton}>
          <Text style={styles.text}>Pay</Text>
        </TouchableOpacity>
        }
        </View>
        :
        <TouchableOpacity  style={styles.LoginButton}>
          <ActivityIndicator color={'#fff'}/>
        </TouchableOpacity>
        }
        
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
