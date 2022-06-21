import React, { Component } from 'react';
import { StyleSheet,Dimensions,ScrollView,TouchableOpacity,Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import   * as  firebase  from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB-_1l1k5RmgGk_EvghDsYbP1obo51J6Hw",
    authDomain: "widideliveryboy.firebaseapp.com",
    databaseURL: "https://widideliveryboy-default-rtdb.firebaseio.com",
    projectId: "widideliveryboy",
    storageBucket: "widideliveryboy.appspot.com",
    messagingSenderId: "180629219472",
    appId: "1:180629219472:web:56ce6c7af84dd7570a9015",
    measurementId: "G-RQXZYMT0SW",
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default class TrackOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            changePic:true,
            orderid:props.route.params.order_id,
            order_status:0,
            time:true
        }
    }
    componentDidMount() {
       // alert(this.state.status)
      this.GetFirebaseOrdersData(this.state.orderid)
      setTimeout(() => {
          this.setState({time:false})
      }, 500);
    }
     GetFirebaseOrdersData=(order_id) =>
    {
        console.log('sdaalsdjlasd')
        
        var query = firebase.database().ref("order_status/"+order_id);

        query.on("value",  (snapshot) => {
        //   snapshot.forEach( (childSnapshot)=> {
            //var childData = childSnapshot.val();
            console.log('00000000000start0000000000')
            console.log(snapshot)
            console.log('00000000000end0000000000')
           this.setState({order_status:snapshot.val().status}) 
           
          }
          );
         
        // });


    
            // alert('data is load from firebase lat is ' +lat+'      lng is'+lng)
    }
    StatusVideo=()=>{
        var x = this.state.order_status; 

        if(x==0){
            console.log('///////////////////////////////////////////////////////////////////////////','1')
            return(
                <Video
                    style={{width:400,height:400}}
                    source={require( '../assets/queuecart.mp4')} 
                    shouldPlay={true}
                    resizeMode="contain"
                    isLooping
                />
            );
        }
        else if(x==1){
              // in cooking
        console.log('///////////////////////////////////////////////////////////////////////////','2')

            return(
                <Video
                    style={{width:400,height:400}}
                    source={require( '../Video_animations/47164-cooking-with-auberigne.mp4')}
                    shouldPlay={true}
                    resizeMode="contain"
                    isLooping
                />
            );
        }
        else if(x==2){
              // in cooked
              console.log('///////////////////////////////////////////////////////////////////////////','3')

            return(
                <Video
                    style={{width:400,height:400}}
                    source={require( '../Video_animations/21653-delivery-guy-out-for-delivery.mp4')}
                    shouldPlay={true}
                    resizeMode="contain"
                    isLooping
                />
            );
        }
        else if(x==3){
              // delivering
              console.log('///////////////////////////////////////////////////////////////////////////','4')

            return(
                <Video
                    style={{width:400,height:400}}
                    source={require( '../Video_animations/22687-delivery-guy-waiting-at-the-doorstep.mp4')}
                    shouldPlay={true}
                    resizeMode="contain"
                    isLooping
                />
            );
        }
        else{
            console.log('///////////////////////////////////////////////////////////////////////////','else is running')

            return(
                <Video
                    style={{width:400,height:400}}
                    source={require( '../Video_animations/21654-delivery-guy-order-pickup.mp4')}
                    shouldPlay={true}
                    resizeMode="contain"
                    isLooping
                />
            );
        }
    }

    remainingTime=()=>{
        var x = this.state.order_status; 

        if(x==0){
            return 40
        }
        else if(x==1){
            
            return 30
        }
        else if(x==2){
            
            return 20
        }
        else if(x==3){
        
            return 10
        }
        else{

            return 0
        }
    }
      
    render(){
        if(this.state.time){
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
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text>Getting Status</Text>
                    </View>
                </>
            )
        }

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
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:'#fff'}}>
                
              <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center',width:'100%'}}>   
              {this.StatusVideo()}
      </View>  
                
         
    <View style={{alignSelf:'center'}}>

        <Text style={{textAlign:'center',fontFamily:'poppinbold'}}>Picking Order</Text>
        <Text style={{marginVertical:5,textAlign:'center'}}>{this.remainingTime()} Mins</Text>
        <Text style={{fontFamily:'poppinbold'}}> Remaining Time</Text>
        
    </View>
            
    <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)}  style={styles.LoginButton}>
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