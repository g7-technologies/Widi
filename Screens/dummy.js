import React, { isValidElement, useState } from 'react';
import {FlatList,RefreshControl,Animated, StyleSheet,TextInput ,Image,Text,ScrollView, View, ImageBackground, Platform } from 'react-native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerContent} from './DrawerContent'
import { Ionicons,MaterialIcons,AntDesign,Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profile from '../Screens/Profile'
import * as Font from 'expo-font';

import Wallet from '../Screens/Add_Credit_Card'

import SavedResturant from '../Screens/Saved_Resturants'
import {connect} from 'react-redux'
import HistoryScreen from '../Screens/History'
import ProductCartDetail from '../Screens/Product_Cart_Detail'
import SingleCart from '../Screens/Single_Cart_Detail'
import cartItem from '../reducers/cartItem';

const dataArray=
  [
    { title: 'Pizza',active:0,backgroundColor:'#0f76de',color:'#fff', key: 'pizza' },
    { title: 'Fast Food',active:1,backgroundColor:'#0f76de',color:'#fff', key: 'fast food' },
    { title: 'Chicken Grill',active:2, key: 'Chicken Grill' },
    { title: 'Fish',active:3, key: 'Fish' }
  ]

  function  mapstatetoprops(state){
    return{  
      cartitem:state.cartItem
    }
  }


export default connect(mapstatetoprops)(HomeScreen)
function HomeScreen({ navigation}) {
  const [Focus,setFocus]=useState(false)
  const [category,selectcategory]=useState([])
  const [loaded, error] = Font.useFonts({ 
    poppin:require('../assets/Poppins/Poppins-Regular.ttf'),
    poppinbold:require('../assets/Poppins/Poppins-SemiBold.ttf')
   });
   if(!loaded){
    return <View style={{justifyContent:'center',alignItems:'center',flex:1}}><Text>Loading App Please wait.....</Text></View>;
  }

  function FoodCatagory(item){
    const [defaultcolor,bluecolor]=React.useState(false)
    return(
      <TouchableOpacity
            // key={item.key}
            onPress={()=>bluecolor(!defaultcolor)}
            style={{flexDirection:'row',marginHorizontal:2}}>
            <View style={{...styles.ListButtons,backgroundColor:defaultcolor?'#0f76de':'#fcfcfc',}}>
              <Text style={{fontFamily:'poppin',color:defaultcolor?'#fcfcfc':'#000000',}}>{item.title}</Text>
            </View>
      </TouchableOpacity>
    )
  }
  
  
  function CustomSingleScroll(item){
   
    return(
      <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled={true}
      contentContainerStyle={{marginHorizontal:10}}
      data={dataArray}
      // onEndReached={()=>{
      //   //alert('get new data')
      // }}
      // onEndReachedThreshold={0.5}
      
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('CartDetail')} style={{width:250,marginLeft:5,borderWidth:0.3,borderColor:'#dddddd',borderRadius:5,marginRight:10}}>
         
        <ImageBackground source={require('../assets/Pizza.jpg')} imageStyle={{borderTopLeftRadius:5,borderTopRightRadius:5}} style={{width:'100%',height:100}}>
       <View style={{flexDirection:'row'}}>
        <View style={{marginLeft:10,alignContent:'center',height:60,borderBottomLeftRadius:4,borderBottomRightRadius:4,width:50,backgroundColor:'#0f76de',}}>
          <Text style={{fontSize:15,marginTop:15,fontFamily:'poppinbold',textAlign:'center',color:'#fff'}}>20 %</Text>
          <Text style={{fontSize:8,fontFamily:'poppinbold',textAlign:'center',color:'#fff'}}>Discount</Text>
        </View>
        <View style={{width:'65%'}}/>
        <View style={{marginTop:10}}>
        <AntDesign name="heart" size={14} color="red" />
        </View>
        </View>
        <View style={{padding:4,justifyContent:'flex-end',borderTopLeftRadius:10,borderBottomLeftRadius:10,flexDirection:'row',alignItems:'flex-end',backgroundColor:'#F8F8F8',width:50,alignSelf:'flex-end',top:25}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialIcons name="star" size={14} color="#868a19" />
            <Text style={{marginLeft:2,fontFamily:'poppin'}}>4.5</Text>
          </View>
        </View>
        </ImageBackground>
        <Text style={{marginVertical:15,fontFamily:'poppinbold',paddingHorizontal:5}}>Al-Cart Homemade</Text>
        <Text style={{color:'#5c5c5c',paddingHorizontal:5,fontFamily:'poppin'}}>Homemade - Tradition -Cafe</Text>
        <View style={{flexDirection:'row',paddingHorizontal:5,marginVertical:5}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/meter.png')} style={{width:10,height:10,resizeMode:'contain'}}/>
            <Text style={{color:'#5c5c5c',marginLeft:5,fontSize:12,fontFamily:'poppin'}}>20-30 Mins </Text>
          </View>
          <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/bike.png')} style={{width:10,height:10,resizeMode:'contain'}}/>
            <Text style={{color:'#5c5c5c',marginLeft:5,fontSize:12,fontFamily:'poppin'}}>80 $ </Text>
          </View>
        </View>
      </TouchableOpacity>
      )}
    />
    
    )
  }
  function CustomSingleItemScroll(item){
   
    return(
      <FlatList
      showsHorizontalScrollIndicator={false}
     // horizontal
      contentContainerStyle={{marginHorizontal:10}}
      data={dataArray}
      nestedScrollEnabled={true}
      // onEndReached={()=>{
      //  // alert('get new data')
      // }}
      // onEndReachedThreshold={0.5}
      
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('SingleCartItem')} style={{width:'95%',marginVertical:5,marginLeft:5,borderWidth:0.3,borderColor:'#dddddd',borderRadius:5,marginRight:10}}>
         
        <ImageBackground source={require('../assets/buger.jpeg')} imageStyle={{borderTopLeftRadius:5,resizeMode:'stretch',borderTopRightRadius:5}} style={{height:100}}>
       <View style={{flexDirection:'row'}}>
        <View style={{marginLeft:10,alignContent:'center',height:60,borderBottomLeftRadius:4,borderBottomRightRadius:4,width:50,backgroundColor:'#0f76de',}}>
          <Text style={{fontSize:15,marginTop:15,fontFamily:'poppinbold',textAlign:'center',color:'#fff'}}>20 %</Text>
          <Text style={{fontSize:8,fontFamily:'poppinbold',textAlign:'center',color:'#fff'}}>Discount</Text>
        </View>
        <View style={{width:'65%'}}/>
        <View style={{marginTop:10}}>
        <AntDesign name="heart" size={14} color="red" />
        </View>
        </View>
        <View style={{padding:4,justifyContent:'flex-end',borderTopLeftRadius:10,borderBottomLeftRadius:10,flexDirection:'row',alignItems:'flex-end',backgroundColor:'#F8F8F8',width:50,alignSelf:'flex-end',top:25}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialIcons name="star" size={14} color="#868a19" />
            <Text style={{marginLeft:2,fontFamily:'poppin'}}>4.5</Text>
          </View>
        </View>
        </ImageBackground>
        <Text style={{marginVertical:15,fontFamily:'poppinbold',paddingHorizontal:5}}>Al-Cart Homemade</Text>
        <Text style={{color:'#5c5c5c',paddingHorizontal:5,fontFamily:'poppin'}}>Homemade - Tradition -Cafe</Text>
        <View style={{flexDirection:'row',paddingHorizontal:5,marginVertical:5}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/meter.png')} style={{width:10,height:10,resizeMode:'contain'}}/>
            <Text style={{color:'#5c5c5c',marginLeft:5,fontSize:12,fontFamily:'poppin'}}>20-30 Mins </Text>
          </View>
          <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/bike.png')} style={{width:10,height:10,resizeMode:'contain'}}/>
            <Text style={{color:'#5c5c5c',marginLeft:5,fontSize:12,fontFamily:'poppin'}}>80 $ </Text>
          </View>
        </View>
      </TouchableOpacity>
      )}
    />
    
    )
  }
  

  return (
    <>
   
    {/* Header--//////////////////////////////////////////////////////////////////////// */}
    <View style={styles.header}>
        <View style={{flexDirection:'row',marginTop:5,alignItems:'center',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
              <Image source={require('../assets/Drawericon.png')} style={{width:20,height:20}} />
            </TouchableOpacity>
           
            <View style={{alignSelf:'center',alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:10,fontFamily:'poppin'}}>Delivering to:  </Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:12,fontFamily:'poppinbold'}}>Current Location </Text>
                <AntDesign name="right" size={10} color="#fff" />
              </View>
            </View>

            <View style={{alignSelf:'center'}}>
              <View style={styles.Cartnumbercontainer}>
              
                  <Text style={{color:'#fff'}}>0</Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
                <Fontisto name="opencart" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

        </View>
    </View>
    
    <ScrollView 
      onEndReached={()=>{
        alert('get new data')
      }}
      nestedScrollEnabled={true}
      onEndReachedThreshold={0.5}
    style={styles.container}>
      {/* Search bar-..////////////////////////////////////////////////////////////////// */}
    <View style={styles.searchbarsection}>
      <View style={styles.searchbar}>
          <Image source={require('../assets/search.png')} style={{width:15,height:15}}/>
          <View style={{width:'100%',}}>
          <TextInput onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} onSubmitEditing={()=>navigation.navigate('SearchedFood')} placeholderTextColor='#5c5c5c' placeholder='Find something you like' style={{paddingHorizontal:10,fontFamily:'poppin'}}/>
          </View>
      </View>
      <View style={styles.filterbutton}>
        <TouchableOpacity onPress={()=>alert('filter')}>
          <Image source={require('../assets/filter.png')} style={{width:15,height:15}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.likedbutton}>
        <TouchableOpacity onPress={()=>navigation.navigate('SavedResturant')}>
          <Image source={require('../assets/liked.png')} style={{width:20,height:20}}/>
        </TouchableOpacity>
      </View>
    </View>
    {/* Buttons ---////////////////////////////////////////////////////////////////////////////////////// */}
      
    <Animated.View  pointerEvents={Focus?'none':'auto'} style={{opacity:Focus?0.1: 1}}>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled={true}
      contentContainerStyle={{marginHorizontal:10}}
      data={dataArray}
      renderItem={({ item, index }) => (
        <FoodCatagory {...item} />
      )}
    />
    <View style={{padding:20,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontFamily:'poppinbold'}}>Special Delicacies</Text>
      {/*  */}
      <TouchableOpacity onPress={()=>navigation.navigate('SellAllResturant')}>
        <Text style={{color:'#0f76de',fontFamily:'poppin'}}>See All</Text>
      </TouchableOpacity>
    </View>
    <CustomSingleScroll/>
    <View style={{padding:20,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontFamily:'poppinbold'}}>Trending Food</Text>
      {/*  */}
      <TouchableOpacity onPress={()=>navigation.navigate('SellAllResturant')}>
        <Text style={{color:'#0f76de',fontFamily:'poppin'}}>See All</Text>
      </TouchableOpacity>
    </View>
    <CustomSingleScroll/>
    {/* <CustomSingleItemScroll/> */}
   </Animated.View>
   <View style={{padding:20,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontFamily:'poppinbold'}}>Popular </Text>
      {/*  */}
      <TouchableOpacity onPress={()=>navigation.navigate('SellAllResturant')}>
        <Text style={{color:'#0f76de',fontFamily:'poppin'}}>See All</Text>
      </TouchableOpacity>
    </View>
    <CustomSingleItemScroll/>
    
   
    </ScrollView>
    

    </>
  );
}




const Drawer = createDrawerNavigator();

 function App() {
  return (
    
        <Drawer.Navigator   drawerContent={props=><DrawerContent {...props}/>} >
             <Drawer.Screen name="Home" component={HomeScreen} />
             <Drawer.Screen name="Profile" component={Profile} />            
             <Drawer.Screen name="Wallet" component={Wallet} /> 
             <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
             <Drawer.Screen name="ProductCartDetail" component={ProductCartDetail} />
             <Drawer.Screen name="SingleCart" component={SingleCart} />    
        </Drawer.Navigator>
   
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  header:{
    backgroundColor:'#0f76de',
    padding:10,
    justifyContent:'center' ,
    marginTop:Platform.OS=='android'?25:0
},
ListButtons:{
  
  borderWidth:0.3,
  borderColor:'#dddddd',
  padding:5,
  marginRight:4,
  borderRadius:20,
  paddingHorizontal:10 
},
searchbarsection:{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:20
},
searchbar:{
  width:'80%',
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
Cartnumbercontainer:{
  position:'absolute',
  left:10,
  bottom:10,
  width:15,
  height:15,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#e65043'
},
mainCard:{
  width:'95%',
  marginTop:10,

  alignSelf:'center',
  
  height:200,
  borderWidth:0.3,
  borderColor:'#dddddd',
  borderRadius:5,
  
},
DiscountCard:{
    marginLeft:10,
    alignContent:'center',
    height:60,
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    width:50,
    backgroundColor:'#0f76de',
  },
  ratingCard:{
      padding:4,
      justifyContent:'flex-end',
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
      flexDirection:'row',
      alignItems:'flex-end',
      backgroundColor:'#F8F8F8',
      width:50,
      alignSelf:'flex-end',
      top:30
  }
});
