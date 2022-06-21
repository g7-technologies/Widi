
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
  FlatList,
  Image
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import RiderOrders from "../Component/Rider_InProgress_Orders";
import  RiderCompletedOrders from "../Component/Rider_Completed_Orders";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basepath } from "../BasePath/Basepath";
import { ActivityIndicator } from 'react-native-paper';
const { width } = Dimensions.get("window");
var uid=1
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: 0,
      xTabOne: 0,
      xTabTwo: 1,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),
      translateY: -1000,
      pending_orders:[],
      completed_orders:[],
      refreshing:false,
      loading:true

    };
  }
  ChangePosition=()=>{
    this.refs.scroll.scrollTo({x:Dimensions.get('window').width})
    this.setState({xTabOne:1,xTabTwo:0})
    Animated.spring(this.state.translateX,{
      toValue:1,
      duration: 100,
      
      useNativeDriver:true
    }).start()
  }
  OrignalPosition=()=>{
    this.refs.scroll.scrollTo({x:0})
    this.setState({xTabOne:0,xTabTwo:1})
    Animated.spring(this.state.translateX,{
      toValue:0,
      duration: 100,
      
      useNativeDriver:true
    }).start()
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
       this.GetDeliveryboyinfo()
      //alert('works')
    });
  
  }
  GetDeliveryboyinfo=async()=>{
    // console.log('workss')
   var id=await AsyncStorage.getItem('USER_DATA')
   var user=JSON.parse(id)
    uid=user.id
   this.Pending_Orders(uid)

  }
  Pending_Orders=(id)=>{
    const formData = new FormData()
    
    formData.append('customer_id', id);
   
    try{
      fetch(`${basepath}customer_orders`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
     
        if(!responseJson.error == true){

        this.setState({pending_orders:responseJson.orders,completed_orders:responseJson.completed_orders,loading:false,refreshing:false})
    // alert(p)
    console.log('//////////////////////pending start///////////////////')
    console.log( responseJson.orders)
    console.log('//////////////////////pending end///////////////////') 
    console.log('//////////////////////completed start///////////////////')
    console.log( responseJson.completed_orders)
    console.log('//////////////////////completed end///////////////////')
    
        }else{
           
           alert('Some Error Occure')
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }
  RenderCompletedOrdersList=(item)=>{
    if(item.status==4){
      return(
        <RiderCompletedOrders item={item} navigation={this.props.navigation}/>
      )
    }
  }
  RenderInProgressOrdersList=(item)=>{
    if(item.status!=4){
      return(
        <RiderOrders item={item} navigation={this.props.navigation}/>
      )
    }

  }

  _handleRefresh=()=>{

    this.setState({
      refreshing:true
    })
    this.Pending_Orders(uid)
  }

  render(){
  const ChangeColorPosition=this.state.translateX.interpolate({
    inputRange:[0,1],
    outputRange:[0,Dimensions.get('window').width/2-22]
  })
  const textcolor=this.state.translateX.interpolate({
    inputRange:[0,1],
    outputRange:['#fff','#000000']
  })
  const bactoOrignal=this.state.translateX.interpolate({
    inputRange:[0,1],
    outputRange:[0,Dimensions.get('window').width]
  })
     return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',margin:5,marginLeft:20,top:10}}>
              {Platform.OS=='ios'?
                  <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                  :
                  <Ionicons name="md-arrow-back" size={24} color="#FFF" />
              }
              <Text style={styles.textcolor}>History</Text>

          </TouchableOpacity>
        </View>
        
          <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',borderColor:'#007aff',borderWidth:1,borderRadius:4,width:Dimensions.get('window').width-20,alignSelf:'center',justifyContent:'space-between',marginTop:40,}}>
              
                <TouchableOpacity onPress={()=>this.OrignalPosition()} style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width/2,height:35}}>
                  <Animated.View style={{borderRadius:2,width:Dimensions.get('window').width/2,position:'absolute',top:0,left:0,bottom:0,right:0,padding:10,transform:[{
                      translateX:ChangeColorPosition
                    }],backgroundColor:'#007aff'}}/>
                  <Animated.Text style={{textAlign:'center',fontWeight:'bold',color:this.state.xTabOne==0?'#fff':'black'}}>In-Progress</Animated.Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.ChangePosition()} style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width/2,height:35}}>
                  <Animated.View style={{width:Dimensions.get('window').width,position:'absolute',top:0,left:0,bottom:0,right:0,padding:10,transform:[{
                     translateX:bactoOrignal
                    }]}}/>
                  <Text style={{textAlign:'center',fontWeight:'bold',marginRight:20,color:this.state.xTabTwo==1?'black':'white'}}>Completed</Text>
                </TouchableOpacity>
                
            
            </View>
            {this.state.loading?
            <View style={{height:300,justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
             <Text>Getting data........</Text>
             <ActivityIndicator size='small' color={'#0f76de'}/>
             </View>
             </View>
            :
          
            <ScrollView
              showsHorizontalScrollIndicator={false}
             onScroll={({nativeEvent})=>{
              var position=nativeEvent.contentOffset.x;
              var width=Dimensions.get('window').width;
              var currentindex=position/width;
              if(currentindex==1){
                this.ChangePosition()
              }else if(currentindex==0){
                this.OrignalPosition()
              }
          }}
            ref={'scroll'} horizontal  pagingEnabled style={{flex:1,marginTop:10}}>
             
             
                <View style={{width:Dimensions.get('window').width}}>
                <FlatList
                  ListEmptyComponent={()=>{
                    return(
                      <View style={{height:300,justifyContent:'center',alignItems:'center'}}>
                       <Image style={{width:200,height:200,alignSelf:'center'}} source={require('../assets/emptyorder.png')}/>
                       <Text>No pending orders</Text>
                       </View>
                    )
                  }}
                  refreshing={false}
                  onRefresh={()=>this._handleRefresh()}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.pending_orders}
                  renderItem={({ item, index, separators }) => (
                    this.RenderInProgressOrdersList(item)
                   
                  )}
                />
                
                </View>
             

             {/* Screen 2//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <View style={{width:Dimensions.get('window').width}}>
              <FlatList
                  ListEmptyComponent={()=>{
                    return(
                    <View style={{height:300,justifyContent:'center',alignItems:'center'}}>
                      <Image style={{width:200,height:200,alignSelf:'center'}} source={require('../assets/emptyorder.png')}/>
                      <Text style={{alignSelf:'center',}}>No completed orders</Text>
                      {/* <ActivityIndicator size='small' color={'#0f76de'}/> */}
                      </View>
                    )
                  }}
                  refreshing={false}
                  onRefresh={()=>this._handleRefresh()}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.completed_orders}
                  renderItem={({ item, index, separators }) => (
                    // <Text>dadasd</Text>
                      
                   // <RiderCompletedOrders/>
                    this.RenderCompletedOrdersList(item)
                  )}
                />
                
              </View>
            </ScrollView>
            }
          </View>
      </> 
    );
  }
};

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#0f76de',
    height:60,
    justifyContent:'center' 
  },
  textcolor:{
    fontWeight:'bold',
    color:'#fff',
    top:4,
    marginLeft:30
  },
  Body:{
    flex:1,
    
    justifyContent:'center',
    alignItems:'center'
  },
    Container:{
        margin:10,
      justifyContent:'space-between',
      paddingVertical:5,
      paddingHorizontal:5,
      backgroundColor:'#fff',
      shadowOffset:{width:1,height:1},
      shadowOpacity:0.3,
      paddingVertical:15,
      paddingHorizontal:10,
      borderRadius:5
    },
    graytext:{
        color:'#5c5c5c',
    },
    textstyle:{
        fontWeight:'600'
    },
    minicontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:4
    },
    borderLine:{
        width:'100%',
        borderColor:'#dddddd',
        marginTop:10,
        borderBottomWidth:0.5,
        alignSelf:'center'
    },
});
 