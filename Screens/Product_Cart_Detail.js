import React, { Component, useEffect, useState } from 'react';
import {Text,View,Animated,Image,StyleSheet,FlatList, Dimensions, ImageBackground} from 'react-native';
import { AntDesign,Entypo,Foundation } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { basepath,Imagebasepath } from "../BasePath/Basepath";
//Redux
import {connect} from 'react-redux'
import { useDispatch, useSelector } from "react-redux";
//Component
import CartSubCatagories from '../Component/CartSubCatagories'
import LikeorunLikeResturant from '../Component/LikeorunLikeResturant'
//Action
import {addFood,deleteFood} from '../actions/Food';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-tiny-toast'
import { render } from 'react-dom';

  var totalquantity=[]

 class ProcutCartDetail extends Component {
  // var count = useSelector(state => state.foods.foodList)
    // console.log('count',count)
    // const [itemcount,setitemcount]=useState(count)
    // alert(itemcount)
    // var totalprice = 0
  //  function TotalPriceofFood(){
    
     
  //   for (let index = 0; index < count.length; index++) {
  //     totalprice =totalprice+ count[index].price;
  //   }
  
  //   return( 
      
  //     <Text style={styles.text}>{totalprice==0?totalprice:totalprice}</Text>
  //   )
  //  }
  //  useEffect(()=>{
    
  //   // return()=>alert('called')
    
   
  //  })

  
  constructor(props){
    super(props);
    this.state={
      totalprice:0,
      totalValue:0,
      itemquantity:[],
      customerid:''
    }
  }

  componentDidMount(){
    console.log('................................start...................................')
    console.log(this.props.route.params.item.meals);
    console.log('.................................end..................................')

    const unsubscribe = this.props.navigation.addListener('focus', () => {
  
      this.props.cartitem.forEach(element => {
        totalquantity.push(this.props.cartitem)
      });
    //  this.callThis()
    this.GetUserdata()
    });
    // console.log(totalquantity)
  }
    GetUserdata=async ()=>{
     
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    console.log('//////////////////////////')
    console.log(customerid)
    console.log('//////////////////////////')

    this.setState({customerid:customerid.id})

  }
   render(){
   
    Like_or_Unlike_Resturant=(id)=>{
       const formData = new FormData()
      formData.append('customer_id', this.state.customerid);
      formData.append('resturant_id', id);
      //const loading=Toast.showLoading
      try{
        fetch(`${basepath}like_unlike_resturant`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
         
       // Toast.hide(loading)
          if(!responseJson.error == true){
          // navigation.navigate('Dashboard')
          // alert(responseJson.error)
          }else{
            //  alert(responseJson.error)
          }
        })
        .catch((error) =>{});
      }catch(e){}
    }

     TotalPriceofFood=()=>{
    
     var totalprice=0;
        for (let index = 0; index < this.props.cartitem.length; index++) {
          totalprice =totalprice+ this.props.cartitem[index].price;
        }
      // this.setState({totalprice:totalprice})
        
          
          // <Text style={styles.text}>{totalprice==0?totalprice:this.state.totalprice}</Text>
         this.setState({totalprice:totalprice})
       }
    return (
      <>
      <View style={styles.container}>
        <View style={{flex:1,backgroundColor:'#fff',elevation:3}}>
         
            <ImageBackground source={{uri:Imagebasepath+this.props.route.params.item.logo}} style={{}} imageStyle={{width:'100%',height:Dimensions.get('window').height/4}} >
              <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={styles.closebutton}>
                <Image source={require('../assets/cancel.png')} style={{width:10,height:10}}/>
              </TouchableOpacity>
            </ImageBackground>
        
          <View style={{marginTop:90,padding:20,backgroundColor:'#fff',borderTopLeftRadius:20,borderTopRightRadius:20,borderColor:'#dddddd',flex:1,}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.headingtext}>{this.props.route.params.item.name}</Text>
             <LikeorunLikeResturant onPress={
                  (id)=>{
                    const formData = new FormData()
                  formData.append('customer_id', this.state.customerid);
                  formData.append('resturant_id', id);
                  // const loading=Toast.showLoading()
                  try{
                    fetch(`${basepath}like_unlike_resturant`, {
                      method: 'POST',
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                      }, 
                      body:formData
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      // Toast.hide(loading)
                      console.log( responseJson)
                      if(responseJson.error == true){
                      // navigation.navigate('Dashboard')
                       Toast.show(responseJson.error_msg,{position:Toast.position.TOP})

                      // alert('no error'+responseJson.error)
                      }else{
                        //  alert('error'+responseJson.error)
                        Toast.show(responseJson.success_msg,{position:Toast.position.TOP})
                      }
                    })
                    .catch((error) =>{});
                  }catch(e){}
                  }

             } value={this.props.route.params.item} />
            </View>
            {/* Flat List should be added */}
            <View style={{ backgroundColor: 'white',flexDirection:'row' }}>
            <FlatList
                  style={{marginVertical:5}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.props.route.params.item.meals}
                  // keyExtractor={this.props.route.params.item.meals.id}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index, separators }) => (
                  
                  <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                    <Entypo name="dot-single" style={{top:3}} size={20} color="#5c5c5c" />
                    <Text style={styles.description}>
                      {item.food_type.name}
                      </Text>
                  </View>
                    
                  )}
              />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:5,marginLeft:10}}>
              <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                <Foundation name="star" size={14} color="#CCCC00" />
                <Text style={{...styles.description,marginTop:0}}> {this.props.route.params.item.rating}</Text>
              </View>
              {/* <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                <Image source={require('../assets/meter.png')} style={{width:10,marginRight:4,resizeMode:'contain',height:10}}/>
                <Text style={{...styles.description,marginTop:0}}>15-20 min</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={require('../assets/bike.png')} style={{width:10,marginRight:4,resizeMode:'contain',height:10}}/>
                <Text style={{...styles.description,marginTop:0}}>Free Delivery</Text>
              </View> */}
            </View>
            <View>
              
              
              </View>
                <View style={{flex:1}}>
                <FlatList
                contentContainerStyle={{marginTop:20}}
                  showsVerticalScrollIndicator={false} 
                 data={this.props.route.params.item.meals}
                 keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <CartSubCatagories index={index} itemquantity={this.props.cartitem}  item={item} navigation={this.props.navigation}   />
                  )}
                 
                />
                
                
                </View>
              
          </View>
          <View style={{backgroundColor: '#ffffff00'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCart')} style={{borderRadius:5,bottom:5,flexDirection:'row',width:'80%',padding:10,alignSelf:'center',justifyContent:'space-between',backgroundColor:'#0f76de'}}>
              <Text style={styles.text}>{this.props.cartitem.length}</Text>
            <Text style={styles.text}>View cart</Text>
             <Text style={styles.text}>
             ${this.props.price }
             </Text>
            </TouchableOpacity>
        
    
          </View>
          
        </View>
        
        
        
        
      </View>
        
      </>
    );
  }
  
}
function mapDispatchtoProps(dispatch){
  return{
    Incresscart:()=>dispatch(addFood()),
 //Decresscart:()=>dispatch({type:'REMOVE_FROM_CART'})
  }
}
// var count = useSelector(state => state.foods.foodList)
function mapStatetoProps(state){
  var totalprice=0
  state.foods.foodList.forEach(element => {
    totalprice=totalprice+(element.price-(element.Item_Quantity*element.name.discount_price))
  });
  return{
    cartitem:state.foods.foodList,
    price:totalprice
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps)( ProcutCartDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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
    fontSize:20,
    marginLeft:5
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
   fontFamily:'poppinbold',
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
  position:'absolute',alignSelf:'flex-end',right:10,top:10,
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