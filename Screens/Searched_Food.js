import React, { Component, isValidElement, useState } from 'react';
import {FlatList,Animated,Platform, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground } from 'react-native';

import { Ionicons,MaterialIcons,AntDesign,Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FoodCatagory from '../Component/FoodCatagory'
import CartSubCatagories from "../Component/CartSubCatagories";
//Component
import {connect} from 'react-redux'

 class SearchedFood extends Component {
  constructor(props){
    super(props);
    this.state={
      Focus:false
    }
  }
    // const [Focus,setFocus]=useState(false)
    // const [carttotal,incarttotal]=React.useState(0)
    render(){
    
    return (
      <>
      
      {/* Header--//////////////////////////////////////////////////////////////////////// */}
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Search Food</Text>

        </TouchableOpacity>
        </View>
        <View style={styles.searchbarsection}>
            <View style={styles.searchbar}>
                <Image source={require('../assets/search.png')} style={{width:15,height:15}}/>
                <View style={{width:'100%',}}>
                <TextInput onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} onSubmitEditing={()=>navigation.navigate('SearchedFood')} placeholderTextColor='#5c5c5c' placeholder='Find something you like' style={{paddingHorizontal:10}}/>
                </View>
            </View>
        </View>
        <View style={{backgroundColor:'#fff'}}>
        <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal:10,}}
        horizontal
        data={[{ title: 'Pizza', key: 'pizza' },{ title: 'Fast Food', key: 'fast food' },
        { title: 'Home Made', key: 'Homemade' },{ title: 'Sea Food', key: 'Sea Food' },{ title: 'Burger', key: 'Burger' }
        ,{ title: 'Chicken Grill', key: 'Chicken Grill' },{ title: 'Fish', key: 'Fish' }]}
        renderItem={({ item, index, separators }) => (
          <FoodCatagory item={item.title} />
        )}
      />
      </View>
      
      <View style={styles.container}>
        {/* Search bar-..////////////////////////////////////////////////////////////////// */}
      
      {/* Buttons ---////////////////////////////////////////////////////////////////////////////////////// */}
      
      <Animated.View style={{flex:1}}  pointerEvents={this.state.Focus?'none':'auto'} style={{opacity:this.state.Focus?0.1: 1}}>
        
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginHorizontal:10,marginTop:20}}
          nestedScrollEnabled={true}
          data={[{ title: 'Pizza', key: 'pizza' },{ title: 'Fast Food', key: 'fast food' },
          { title: 'Home Made', key: 'Homemade' },{ title: 'Sea Food', key: 'Sea Food' },{ title: 'Burger', key: 'Burger' }
          ,{ title: 'Chicken Grill', key: 'Chicken Grill' },{ title: 'Fish', key: 'Fish' }]}
          renderItem={({ item, index, separators }) => (
            <CartSubCatagories usepressbutton={this.props}  navigation={this.props.navigation} />
          )}
        />
      </Animated.View>
     
      
      </View>
      <View style={{backgroundColor: '#ffffff00'}}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCart')} style={{width:'80%',padding:10,alignSelf:'center',backgroundColor:'#0f76de'}}>
      <Text style={styles.text}>View cart</Text>
      </TouchableOpacity>
        
      {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCart')}  style={styles.LoginButton}>
          <Text style={{fontWeight:'400',color:'#fff',}}>{this.props.cartitem}</Text>
          <Text style={styles.text}>View cart</Text>
          <Text>{ }</Text>
      </TouchableOpacity> */}
      </View>
  
      </>
    );
    }
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    borderLine:{
        width:'100%',
        borderColor:'#dddddd',
        marginTop:10,
        height:50,
        borderBottomWidth:0.8
    },
    header:{
      backgroundColor:'#0f76de',
      padding:10,
      justifyContent:'center' ,
      
    },
    textcolor:{
        fontWeight:'bold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
  ListButtons:{
    backgroundColor:'#fcfcfc',
    borderWidth:0.3,
    borderColor:'#dddddd',
    padding:5,
    borderRadius:20,
    paddingHorizontal:10 
  },
  searchbarsection:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    backgroundColor:'#fff'
  },
  searchbar:{
    width:'100%',
    flexDirection:'row',
    borderColor:'#dddddd',
    borderWidth:0.3,borderRadius:4,
    padding:10,
    alignItems:'center',
    backgroundColor:'#fcfcfc'
  },
  filterbutton:{
    width:'10%',
    borderColor:'#dddddd',
    borderWidth:0.3,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:5,
    backgroundColor:'#fcfcfc'
  },
  likedbutton:{
    width:'10%',
    borderColor:'#dddddd',
    borderWidth:0.3,
    borderRadius:4,
    backgroundColor:'#fcfcfc',
    justifyContent:'center',
    alignItems:'center'
  },
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:12,
    margin:20,
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between'
},
text:{
    fontFamily:'poppinbold',
    fontSize:15,
    textAlign:'center',
    letterSpacing:1,
    color:'#fff'
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
  
  export default connect(mapStatetoProps,mapDispatchtoProps)( SearchedFood)
  