import React, { Component } from 'react';
import { StyleSheet,ScrollView,TouchableOpacity,Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { Ionicons,AntDesign } from '@expo/vector-icons';
export default class TrackOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            changePic:true
        }
    }
    componentDidMount() {
        // this.animation.play();
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 150);
       
        // this.animatison.play(30, 150)

       
        this.ChangePicture()
      }
      ChangePicture=()=>{
        this.resturant.play(30, 150)
          setTimeout(() => {
            //  this.setState({changePic:false})
            //  this.pickorder.play(30, 150)
            //  this.deliverorder.play(30, 150)
          }, 5000);
      }
    render(){
    return(
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
                    {Platform.OS=='ios'?
                        <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                        :
                        <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
                    }
                    <Text style={styles.textcolor}>Order Status</Text>

                </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                <View>
                   
                    <LottieView
                        ref={resturant => {
                            this.resturant = resturant;
                        }}
                        style={{
                        
                            height: 200,
                            
                            backgroundColor: '#fff',
                        }}
                        source={require('../assets/waiting_for_order.json')}
                    />
                    
                    {/* <LottieView
                        ref={pickorder=>{this.pickorder=pickorder}}
                        style={{
                            height: 200,
                            backgroundColor: '#fff',
                        }}
                        source={require('../assets/pickorder.json')}
                    />
                     <LottieView
                        ref={deliverorder=>{this.deliverorder=deliverorder}}

                        style={{
                        
                            height: 200,
                            
                            backgroundColor: '#fff',
                        }}
                        source={require('../assets/delivering_order.json')}
                    /> */}
                
                </View>
                <View style={{alignSelf:'center'}}>
                    <Text style={{textAlign:'center',fontFamily:'poppinbold'}}>Picking Order</Text>
                    <Text style={{marginVertical:5,textAlign:'center'}}>40-45 Mins</Text>
                    <Text style={{fontFamily:'poppinbold'}}> Remaining Time</Text>
                    
                </View>
                
                <TouchableOpacity  style={styles.LoginButton}>
                    <Text style={styles.text}>Go Back</Text>
                </TouchableOpacity>
                
            </ScrollView>
        
        </>
    )
    }
}




const styles = StyleSheet.create({
    header:{
      backgroundColor:'#0f76de',
      height:60,
      justifyContent:'center',
    //   marginTop:Platform.OS=='android'?25:0 
    },
    textcolor:{
        fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:10,
        margin:20,
        borderRadius:5
    },
    text:{
        fontWeight:'600',
        fontSize:15,
        textAlign:'center',
        letterSpacing:1,
        color:'#fff'
    },
})