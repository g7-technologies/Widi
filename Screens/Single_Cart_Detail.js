import React, { Component } from 'react';
import {Text,View,Animated,Image,StyleSheet,AppState, Dimensions, ImageBackground} from 'react-native';
import { Ionicons,AntDesign,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
//Component
import { Imagebasepath } from "../BasePath/Basepath";
import {connect} from 'react-redux'
import { useDispatch, useSelector } from "react-redux";
import { addFood,deleteFood } from "../actions/Food";
 function SingleCartItem ({navigation,route}) {
  //onsole.log(route)
  const [totalquantity,quantity]=React.useState(route.params.totalquantity)
  const [Data,Item_Data]=React.useState(route.params.data)
  const cartitems=useSelector(state=>state.foods.foodList)
  
  
  const dispatch = useDispatch();

 
    
    
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <ImageBackground source={{uri:Imagebasepath+Data.image}}  style={{}} imageStyle={{width:'100%',height:Dimensions.get('window').height/3}} >
            <TouchableOpacity onPress={()=>navigation.goBack(null)} style={styles.closebutton}>
              <Image source={require('../assets/cancel.png')} style={{width:10,height:10}}/>
            </TouchableOpacity>
          </ImageBackground>
          <Animated.View style={styles.menucontainer}>
            <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
              <View>
                <Text style={styles.headingtext}>{Data.name}</Text>
                <Text style={styles.description}>{Data.description}</Text>
                <View style={styles.borderLine}/>
              </View>
              <View style={{marginTop:20,marginRight:10}}>
                <View style={{flexDirection:'row',margin:10,justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'400'}}>Quantity</Text>
                  <View style={styles.Addbuttons}>
                      <TouchableOpacity  style={styles.button}>
                        <Image  style={{width:10,marginLeft:2,height:10}} source={require('../assets/minus.png')}/>
                      </TouchableOpacity>
                      <Text>{totalquantity}</Text>
                      
                      <TouchableOpacity 
                      // onPress={() =>console.log(Data)} 
                      style={styles.button}
                      onPress={() =>{quantity(totalquantity+1) }}  style={styles.button}
                      >
                        <Image  style={{width:10,height:10}} source={require('../assets/plus.png')}/>
                      </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.borderLine}/>
              </View>
              <View style={{height:120}}/>
                <TouchableOpacity  onPress={()=>dispatch(addFood(Data,totalquantity,parseFloat(Data.price)))} style={styles.LoginButton}>
                  <Text style={styles.text} >{cartitems.length}</Text>
                  <Text style={styles.text}>Add to cart</Text>
                  <Text></Text>
                </TouchableOpacity>
            </ScrollView>
              
           </View>
          </Animated.View>
        </View>
        {/*  */}
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderLine:{
    width:'90%',
    borderColor:'#dddddd',
    marginTop:20,
    borderBottomWidth:0.5,
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
    top:Dimensions.get('window').height/4,
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
    marginTop:10,
    color:'#5c5c5c'
  },
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:12,
    margin:20,
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
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
    alignItems:'center'}
});


function mapDispatchtoProps(dispatch){
  return{
    Incresscart:()=>dispatch({type:'ADD_TO_CART'}),
    Decresscart:()=>dispatch({type:'REMOVE_FROM_CART'})
  }
}
function mapStatetoProps(state){
  return{cartitem:state.cartitem}
}

export default connect(mapStatetoProps,mapDispatchtoProps)( SingleCartItem)
