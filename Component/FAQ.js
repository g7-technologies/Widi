import React, { Component } from 'react';
import { StyleSheet,ScrollView,FlatList,Image,TouchableOpacity, Text, View } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import Animated, { Easing } from 'react-native-reanimated';


export default function Accordian({item}){
    const [Open,isOpen]=React.useState(false)
    const Accordians=React.useRef(new Animated.Value(0)).current
    function Show_CurrentLocation_With_Map () {
      if (!Open) {
        Animated.timing(Accordians, {
          toValue: 1,
          duration: 1000,
          easing:Easing.in
          // useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(Accordians, {
          toValue: 0,
          duration: 1000,
          easing:Easing.in
          // useNativeDriver: false,
        }).start();
      }
  
      // this.setState({
      //   UsecurrentlocaionStatus: !this.state.UsecurrentlocaionStatus,
      // });
      isOpen(!Open)
    };
    const Answerheight = Accordians.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    });
    return(
      <>
      <TouchableOpacity onPress={()=>Show_CurrentLocation_With_Map()} style={{
        
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        marginVertical:5,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.5,
        borderRadius:2,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#0f76de',
        flexDirection:'row',
        justifyContent:'space-between'
      }}>
        <Text style={{color:'#fff',fontFamily:'poppinbold'}}>Does Your App Support</Text>
        {/* <Text style={{fontSize:15,color:"#fff"}}>{!Open?'+':'-'}</Text> */}
      </TouchableOpacity>
      <Animated.ScrollView  style={{opacity:Answerheight,height:Answerheight}}>
      <Text>  {item.answer} </Text>
      </Animated.ScrollView>
    </>
    )
}