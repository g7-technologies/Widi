import React, { Component ,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
 
  Animated,
  Dimensions,
  TouchableOpacity,
  Linking,
  Easing,
  Image,
  Modal,
  Alert,
  TextInput,
  TouchableHighlight,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import Toast from 'react-native-tiny-toast';

function  Rider_InProgress({navigation,item}){
    const [claim,orderclaim]=useState(item.dispute.length)
    const [order,orderstatus]=useState('Claim')
    const [indicator,showindicator]=useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleClaimOrder, setModalVisibleClaimedOrder] = useState(false);
    const [title,texttitle]=useState('')
    const [message,textmessage]=useState('')
    const [sendrequest,orderrequest]=useState(false)
    const [ claimorder,claimorderdata]=useState(item.dispute.length>0?item.dispute[0]:[])
     
    
    console.log(item.dispute)
    // return null
    function dialCall ()  {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
        // phoneNumber = `tel:${item.customer.phone}`;
        }
        else {
        // phoneNumber = `telprompt:${item.customer.phone}`;
        }
        Linking.openURL(phoneNumber);
    };
    function TrackScreen (){
      navigation.navigate('TrackOrderandroid',{'order_id':item.id})
    }

    async function  Create_Dispute (){
        
    
         const formData = new FormData()
         
         formData.append('order_id', item.id);
         formData.append('title', title);
         formData.append('message', message);
        
         showindicator(true)
         try{
           fetch(`${basepath}create_dispute`, {
             method: 'POST',
             headers: {
               Accept: "application/json",
               "Content-Type": "multipart/form-data",
             },
             body:formData
           })
           .then((response) => response.json())
           .then((responseJson) => {
             
             console.log(responseJson)
             if(!responseJson.error ){
              
                orderstatus('Claimed')
                Toast.show(responseJson.success_msg,{position:Toast.position.TOP})
                showindicator(false)
                setModalVisible(!modalVisible);
                orderrequest(true)
             }else{
                showindicator(false)
                
                Toast.show(responseJson.error_msg,{position:Toast.position.TOP})
             }
           })
           .catch((error) =>{});
         }catch(e){}
    }

   function  Validate_request(){
        if(title=='' || message==''){
           
            Toast.show('Please Enter Message and Title',{position:Toast.position.TOP})

        }else{
            Create_Dispute()
        }
    }
    return(
        <View style={styles.Container}>
            <Text style={{fontWeight:'600',marginVertical:10}}>Order Number</Text>
            <View style={styles.minicontainer}>
                <Text style={{fontWeight:'700',color:'#007aff'}}>{item.order_id}</Text>
                <TouchableOpacity onPress={()=>TrackScreen()} style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{...styles.graytext,marginRight:5}}>Track</Text>
                    <AntDesign name="right" size={12} color="#b7b7b7" />
                </TouchableOpacity>
            </View>
            <View style={styles.minicontainer}>
                
                <Text style={styles.graytext}>{item.created_at}</Text>
                <Text style={{fontWeight:'600',color:'#007aff'}}>Total : $ {item.amount-item.discount}</Text>
            </View>
            
            
           

            <View style={styles.minicontainer}>
                <Text style={{fontWeight:'700',color:'#007aff'}}>Status</Text>
                <Text style={{...styles.graytext,marginRight:5}}>{item.status==0?'In queue':(item.status==1?'Cooking':(item.status==2?'Food Ready':'on the way '))}</Text>
                {/* <Text>{item.status}</Text> */}
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity  onPress={()=>navigation.navigate('CompletedOrder',{'order':item})}  style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
             <Text  style={{fontWeight:'bold',color:'#5c5c5c'}}>View Order Detail</Text>
            </TouchableOpacity>
            <View>
                {claim>0?
                <TouchableOpacity onPress={()=>setModalVisibleClaimedOrder(true)}   style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                    <Text  style={{fontWeight:'bold',color:'#007aff'}}>Claimed</Text>
                </TouchableOpacity>
                :
                <View>
                {indicator?
                <ActivityIndicator color="#007aff"/>
                :
                // onPress={()=>Create_Dispute()}
                <TouchableOpacity   onPress={() => {
                    if(sendrequest){
                        alert('Order in Progress Please Wait')
                    }else{
                        setModalVisible(!modalVisible)
                     }

                }}  style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                <Text  style={{fontWeight:'bold',color:'#5c5c5c'}}>{order}</Text>
                </TouchableOpacity>
                }
                </View>
                }
            </View>
            </View>
            {/* Modal for Claim */}

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                        
                    <View style={styles.modalView}>
                    
                        <AntDesign name="closecircleo" onPress={()=> setModalVisible(!modalVisible)} size={24} color="#007aff" />
                        <Text style={styles.modalText}>Claim Order</Text>
                        <Text  style={{marginVertical:5,  fontFamily:'poppinbold',alignSelf:'flex-start'}} >Title</Text>
                        <TextInput onChangeText={(title)=>texttitle(title)} style={{width:200,padding:10,borderWidth:1,borderRadius:4}}/>
                        <Text style={{marginVertical:5,  fontFamily:'poppinbold',alignSelf:'flex-start'}} >Message</Text>
                        <TextInput onChangeText={(message)=>textmessage(message)} style={{width:200,marginBottom:10,height:100,padding:5,borderWidth:1,borderRadius:4}} multiline={true} numberOfLines={5}/>
                        {indicator?
                            
                            <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                           >
                            <ActivityIndicator color="#007aff"/>
                            </TouchableHighlight>
                        : 
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            Validate_request()
                           
                        }}>
                        <Text style={styles.textStyle}>Submit Request</Text>
                        </TouchableHighlight>
                        }
                       
                    </View>

                    </View>
                </Modal>

                
            </View>
            {/* {Modal 2} */}
           {claim.length>0?null:
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleClaimOrder}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                        
                    <View style={styles.modalView}>
                    
                        <AntDesign name="closecircleo" onPress={()=> setModalVisibleClaimedOrder(!modalVisibleClaimOrder)} size={24} color="#007aff" />
                        <Text style={styles.modalText}>Claimed Order</Text>
                        <Text  style={{marginVertical:5,  fontFamily:'poppinbold',alignSelf:'flex-start'}} >Track id</Text>
                        <Text  style={{marginVertical:5,color:'#007aff',  fontFamily:'poppinbold',alignSelf:'flex-start'}} >{claimorder.ticket_id}</Text>

                        
                        <Text  style={{marginVertical:5,  fontFamily:'poppinbold',alignSelf:'flex-start'}} >Title</Text>
                        <Text atyle={{alignSelf:'flex-start'}}>{claimorder.title}</Text>
                        <Text  style={{marginVertical:5,  fontFamily:'poppinbold',alignSelf:'flex-start'}} >Message</Text>
                        <Text>{claimorder.message}</Text>
                        <Text  style={{marginVertical:5,  fontFamily:'poppinbold',alignSelf:'flex-start'}} >Time</Text>
                        <Text>{claimorder.updated_at}</Text>
                       
                        
                       
                    </View>

                    </View>
                </Modal>

                
            </View>
           }


        </View>
    )
}

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
        borderRadius:5,
        elevation:3
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
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily:'poppinbold'
      },
      
  });
  export default Rider_InProgress
   