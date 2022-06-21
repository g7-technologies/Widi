import * as React from 'react';
import { Button, StyleSheet,Image, Text, TouchableOpacity,View } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { Ionicons,MaterialCommunityIcons,AntDesign,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

import { connect } from "react-redux";
import Toast from 'react-native-tiny-toast';
 class Applepay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirectData: null,
      latitude:[],
      customerid:'',
      longitude:[],
      // customer_id:null,
       meals:[],
      address:''
    };
  }

  componentDidMount(){
    // const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.GetUserdata()
    // });
  }


  GetUserdata= async() =>{
    console.log('called  1')
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customer_id=JSON.parse(userdata)
    var personlat=await AsyncStorage.getItem('personlatitude')
    var personlng=await AsyncStorage.getItem('personlongitude')
    var customeraddress=await AsyncStorage.getItem('UserPlaceName')
    // personlatitude(personlat)
    // personlongtitude(personlng)
    // getid(customerid.id)
    // getcustomeraddress(customeraddress)
    // var m=
    this.setState({
      latitude:personlat,
      longitude:personlng,
      customerid:customer_id.id,
      address:customeraddress,
      meals:JSON.stringify(this.props.cartitem)

      // meals:((JSON.stringify(this.props.cartitem)).split(' ').join('%20'))
    })
   // this.customerdetail()
  }
  // customerdetail=()=>{
  //   alert(this.state.address+ " , "+this.state.latitude+" , "+this.state.longitude+" , "+this.state.customerid)
  // }
  

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
              {Platform.OS=='ios'?
                  <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                  :
                  <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
              }
              <Text style={styles.textcolor}>Payment</Text>

          </TouchableOpacity>
        </View>
        <View style={{alignSelf:'center',marginVertical:10}}>
              <Image source={require('../assets/credit-cards-icon.png')}/>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily:'poppinbold'}}>Pay by</Text>
            <TouchableOpacity  style={styles.button}>
            <FontAwesome5 name="stripe" size={24} color="#fff" />
                <Text style={styles.paytext}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button}>
            <AntDesign name="apple1" size={24} color="#fff" />
                <Text style={styles.paytext}>Apple Pay</Text>
            </TouchableOpacity>
        </View>
       

        <Button
          onPress={this._openBrowserAsync}
          title="Tap here to try it out with openBrowserAsync"
        />

        {/* <Button
          onPress={this._openAuthSessionAsync}
          title="Tap here to try it out with openAuthSessionAsync"
        /> */}

       

      </View>
    );
  }

  _handleRedirect = event => {
    alert('dasdhaksldhaskldja')
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      this._removeLinkingListener();
    }

    let data = Linking.parse(event.url);
    console.log('======================')
  //  xconsole.log(event)
  
  //  var d=JSON.parse('{"' + decodeURI(data.data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  //   console.log(d)
    var d=JSON.parse( data.queryParams.data)

    if(d.error==false){
      this.props.emptycart()
      const popAction = StackActions.pop(4);
      this.props.navigation.dispatch(popAction)
      Toast.show('Payment Done',{position:Toast.position.TOP})
    }
    console.log('======================')
    this.setState({ redirectData: data });
  };
   
  
  // const formData = new FormData()
  //       formData.append('customer_id',userid);
  //       formData.append('meals', JSON.stringify( meals));
  //       formData.append('token',id );
  //       formData.append('latitude',latitude)
  //       formData.append('longitude',longitude)
  //       formData.append('customer_address',address)


  
  _openBrowserAsync = async () => {
 
   console.log(this.state.meals)

    try {
      this._addLinkingListener();
      
      let result = await WebBrowser.openBrowserAsync(     
          // `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL("/?")}`
    

      `https://www.g7technologies.com/widi/test?customer_id=${this.state.customerid}&meals=${encodeURIComponent(this.state.meals)}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&customer_address=${encodeURIComponent(this.state.address)}`,
      // 'https://www.g7technologies.com/widi/test?customer_id=2&meals=[{\%22key\%22:3,\%22name\%22:{\%22id\%22:3,\%22name\%22:\%22Chicken%20Supreme\%22,\%22description\%22:\%22Chicken%20with%20mushrooms%20sprinkled\%22,\%22discount\%22:0,\%22discount_price\%22:null,\%22price\%22:\%22300.0\%22,\%22image\%22:\%22supreme.jpg\%22,\%22food_type_id\%22:1,\%22status\%22:1,\%22is_deleted\%22:0,\%22resturant_id\%22:2,\%22created_at\%22:\%222021-01-19%2000:50:16\%22,\%22updated_at\%22:\%222021-01-19%2000:50:16\%22,\%22food_type\%22:{\%22id\%22:3,\%22name\%22:\%22Fish\%22,\%22is_deleted\%22:0,\%22created_at\%22:\%222021-01-18%2022:41:12\%22,\%22updated_at\%22:\%222021-01-18%2022:41:12\%22}},\%22Item_Quantity\%22:1,\%22price\%22:300}]&latitude=37.7858214&longitude=-122.4064015&customer_address=870%20Market%20St%20#1277,%20San%20Francisco,%20CA%2094102,%20USA',
        {
          controlsColor:'#f6f6f6',
          showTitle:'',
          toolbarColor:'#fefefe',
          enableDefaultShare:false,
          dismissButtonStyle:'close',
          
          
        }
      );

      if (Constants.platform.ios) {
        this._removeLinkingListener();
      }
      //console.log(result)
      if(result.type=='cancel'){
        this.GetUserdata()
        WebBrowser.dismissBrowser();
      }
      // console.log('close retun',( result))
      this.setState({ result });
    } catch (error) {
      console.log(error);
    }
  };

  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };

  
}


function mapStatetoProps(state) {
  return { cartitem: state.foods.foodList };
}
function dispatchStatetoProps(dispatch) {
  return { 
    emptycart: ()=>dispatch({type:'Empty_Cart'}),
 };
}
export default connect(mapStatetoProps,dispatchStatetoProps)(Applepay);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
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
  button:{
    backgroundColor:'#000000',
    marginTop:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:'90%',
    padding:10,
    borderRadius:5
  },
  paytext:{
    marginLeft:10,
    color:'#fff',
    fontFamily:'poppinbold',
  }
});