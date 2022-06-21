import React from 'react';
import { StyleSheet,Text, View,TouchableOpacity } from 'react-native';
import { Ionicons,AntDesign,FontAwesome5 } from '@expo/vector-icons';

const Rewards = ({
    navigation,
}) => (
    <View style={{flex:1,backgroundColor:'#fff'}}>
         <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
                {Platform.OS=='ios'?
                    <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                    :
                    <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
                }
                <Text style={styles.textcolor}>Coupon Code</Text>

            </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
           
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',elevation:3,marginVertical:4,margin:10,padding:5,shadowOpacity:0.2,borderRadius:5,shadowOffset:{width: 0.5,height:0.5,},backgroundColor:'#fff'}}>

                <View>
                    <Text style={{color:'#0f76de',fontFamily:'poppinbold'}}>Hotel Name</Text>
                    <Text style={{fontSize:12}}>DIS2020 </Text>
                </View>
                <View>
                <FontAwesome5 name="qrcode" size={24} color="#0f76de" />
                </View>
            </View>
        </View>
    </View>
);

export default Rewards;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header:{
      backgroundColor:'#0f76de',
      height:60,
      justifyContent:'center',
      //marginTop:Platform.OS=='android'?25:0 
    },
    textcolor:{
       fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
    
  //

  
});
