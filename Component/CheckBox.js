import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

export default function Checkbox ({notification,onPress}){
//alert(notification)
  const [checked,ischecked]=React.useState(parseInt( notification))
    return (

    <>
    <TouchableOpacity onPress={()=>{
    if(checked==0){
      ischecked(1)
      onPress(1)
    }else{
      ischecked(0)
      onPress(0)
    }
    }}>
       {checked==1? 
              <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="#0f76de" /> 
       :

       <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#5c5c5c" />   
       }
    </TouchableOpacity>  
    </>
    );
  
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  header:{
    backgroundColor:'#0f76de',
    height:60,
    justifyContent:'center',
    marginTop:Platform.OS=='android'?25:0 
  },
  textcolor:{
   fontFamily:'poppinbold',
    color:'#fff',
    top:4,
    marginLeft:30
  },
});