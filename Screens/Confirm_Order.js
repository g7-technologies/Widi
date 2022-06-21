
import React, { useState } from 'react';
import { ScrollView,FlatList, Platform,StyleSheet,Image, Text, Modal, TouchableOpacity, View } from 'react-native';
import { Ionicons,MaterialCommunityIcons,AntDesign,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
  
  var MyOrder=useSelector(state => state.foods.foodList.length)
  const [cartItems,cartitem]=useState(MyOrder)
    const [modalVisible, setModalVisible] = useState(false);
    const [AddressmodalVisible, setAddressModalVisible] = useState(false);
  
    const [checked,ischecked]=React.useState(false)
    const [selected,isselected]=React.useState(null)
    const [Address, UserAddress] = useState([])
    const [email,getemail]=useState('')
    const [place,getplacetitle]=useState('Current')
    const [placename,getplaceaddress]=useState('Current')
    const [getplace,placetitle]=useState('Current')
    const [getplacename,placeaddress]=useState('')
    const [total,totalprice]=useState(null)
    // const [personlng,personlongitude]=useState(null)
    // const [deliveryaddress,getdeliveryaddress]=useState(null)

    //Redux Value
    var count=useSelector(state => state.foods.foodList)

    function TotalPriceofFood(){
        var totalprice = 0
         //console.log('1',count)
        for (let index = 0; index < count.length; index++) {
          // totalprice =totalprice+ count[index].price;
          totalprice =totalprice+ (count[index].price-(count[index].Item_Quantity*count[index].name.discount_price));

        }
     
        
        return( 
          <Text style={{...styles.text,color:'#0f76de'}}>${totalprice==0?'':totalprice}</Text>
        )
    }
    async function GetUserEmail() {
      
     //alert(cartItems)
    
     
      var data= await AsyncStorage.getItem('USER_DATA')
      var personlat=await AsyncStorage.getItem('personlatitude')
      var personlng=await AsyncStorage.getItem('personlongitude')
      var place=await AsyncStorage.getItem('UserPlaceName')
      var person=JSON. parse(data);
      //   getemail(email.email)
      console.log( 'user data start....................................................... ')
      console.log(count)
      console.log( 'user data end....................................................... ')

      // console.log( 'count ......... ',count)

      getemail(person.email)
      // personlatitude(personlat)
      // personlongitude(personlng)
      getplaceaddress(place)
    }
    React.useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        if(MyOrder==0){
          navigation.goBack()
        }
        GetUserEmail()
        TotalPriceofFood()
      });
        
       // Get_Address()
       // Geo_Code()

    },[])
    

    
    async function Get_Address() {
        const formData = new FormData();
    
        formData.append("customer_id", "2");
        try {
          fetch(`${basepath}customer_get_address`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          })
            .then((response) => response.json())
            .then((responseJson) => {
              //  console.log( responseJson)
              if (!responseJson.error == true) {
                UserAddress(responseJson.address);
              } else {
                alert("Some error " + responseJson.error_msg);
              }
            })
            .catch((error) => {});
        } catch (e) {}
      }
     
    
    return (
    <>
   
    <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
            {Platform.OS=='ios'?
                <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                :
                <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
            }
            <Text style={styles.textcolor}>Confirm Order</Text>

        </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          
        <View style={styles.CardContainer}>
            <View style={{...styles.miniContainer,marginTop:15}}>
                <Text style={{fontFamily:'poppin'}}>Subtotal</Text>
                <TotalPriceofFood/>
            </View>
            {/* <View style={styles.miniContainer}>
                <Text style={{fontFamily:'poppin'}}>Delivery fee</Text>
                <Text style={{fontFamily:'poppin'}}>$ 90</Text>
            </View>
           
            <View style={styles.miniContainer}>
                <Text style={{fontFamily:'poppin'}}>GST</Text>
                <Text style={{fontFamily:'poppin'}}>$ 10</Text>
            </View> */}
            {/* <View style={styles.miniContainer}>
                <Text style={{fontFamily:'poppinbold'}}>Do You have a voucher</Text>    
            </View> */}
            <View style={styles.borderLine}/>
            <View style={{...styles.miniContainer,top:10}}>
                <Text style={styles.colortext}>Total</Text>
                <TotalPriceofFood/>
            </View>
        </View>
        <View style={styles.ContactCardContainer}>
            <View style={{marginTop:15}}>
                <Text style={styles.colortext}>Contact info</Text>
                <Text style={{fontFamily:'poppin'}}>{email}</Text>
            </View>
            <View style={styles.borderLine}/>
            <Text></Text>
            <View style={{...styles.miniContainer,marginVertical:10}}>
                <View>
                  <Text style={styles.colortext}>Delivery detail: {getplace}</Text>
                  <Text>{placename}</Text>
                </View>
                {/* <TouchableOpacity onPress={()=>setAddressModalVisible(true)} style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontFamily:'poppin'}}>Change</Text>
                    <AntDesign name="right" size={16}  />
                </TouchableOpacity> */}
               
            </View>
           <Text style={{marginLeft:10,fontSize:12,fontFamily:'poppin'}}>{getplacename}</Text>
           {/* <View style={{marginVertical:5}}/>
           <View style={styles.borderLine}/> */}
           {/* <View style={{...styles.miniContainer,marginTop:20}}>
                <Text style={styles.colortext}>Delivery time</Text>
                <Text style={{fontFamily:'poppin'}}>45 mins</Text>
            </View> */}
            
        </View>
        {/* <View style={styles.PayentCardContainer}>
            <View style={styles.miniContainer}>
                <Text style={styles.colortext}>Payment method</Text>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontFamily:'poppin'}}>Change</Text>
                    <AntDesign name="right" size={16}  />
                </TouchableOpacity>
            </View>
            <View style={styles.miniContainer}>
                
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../assets/money.png')} style={{marginHorizontal:5,resizeMode:'contain',width:15,height:15}}/>
                    <Text style={styles.colortext}>Cash</Text>
                </TouchableOpacity>
                <Text style={{marginRight:5,fontFamily:'poppin'}}>PKR 1100</Text>
            </View>
        </View> */}
      {Platform.OS=='android'?
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Check_Out')}
        style={styles.LoginButton}>
          <Text style={styles.text}>Confirm Order</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Applepay')}
        style={styles.LoginButton}>
          <Text style={styles.text}>Confirm Order</Text>
      </TouchableOpacity>

      }
      <View style={{height:90}}/>
      <View style={{alignSelf:'center',marginHorizontal:20}}>
        <Text style={{...styles.text,textAlign:'center',marginVertical:40,color:'#8c8c8c'}}>By completing this order,I agree to all  <Text style={{color:'#3c3c3c',fontFamily:'poppinbold',}}>Terms and Services and Privacy Policy</Text> </Text>
        <Text style={{...styles.text,textAlign:'center',marginVertical:40,color:'#8c8c8c'}}>Have a trouble in order? <Text style={{color:'#3c3c3c',fontFamily:'poppinbold',}}>Contact Us</Text> </Text>
      </View>
      
      <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            }}>
            <TouchableOpacity onPress={() => {
            setModalVisible(false);
            }} activeOpacity={1} style={styles.centeredView}>
            
            <View style={styles.modalView}>
                <View style={{alignSelf:'flex-end',padding:5}}>
                    <MaterialIcons name="close" size={24} color="#0f76de" />
                </View>
                <Image source={require('../assets/confirmorder.png')} style={{width:100,height:100}}/>
                <Text style={{marginTop:40,fontSize:30,fontFamily:'poppin'}}>Thank you!</Text>
                <TouchableOpacity onPress={()=>{setModalVisible(false),navigation.navigate('History')}} style={{...styles.LoginButton,width:150}}>
                    <Text style={styles.text}>Track Order</Text>
                    
                </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                        <MaterialIcons name="share" size={24} color="black" />
                        <Text style={{marginLeft:10,fontFamily:'poppin',}}>Share Details</Text>
                    </TouchableOpacity>
            </View>
            </TouchableOpacity>
        </Modal>

      
    </View>
    <View style={styles.AddresscenteredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={AddressmodalVisible}
            onRequestClose={() => {
                setAddressModalVisible(false);
                }}>
            <View activeOpacity={1} style={styles.AddresscenteredView}>
            
            <View style={styles.modalView}>
                <View style={{width:'100%',padding:4}}>
                <View style={{alignSelf:'flex-end',padding:5}}>
                    <MaterialIcons  onPress={() => {
                        setAddressModalVisible(false);
                        }} name="close" size={24} color="#0f76de" />
                </View>
                <View style={{alignSelf:'center',bottom:5}}>
                <FontAwesome5 name="map-marked-alt" size={28} color="#0f76de" />
                </View>
                    <ScrollView style={{height:'64%'}}>
                    <View style={{flex:1}}>
               <FlatList
        style={{ flex:1,backgroundColor: "#fff" }}
    
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={require("../assets/undraw_Destination_re_sr74.png")}
              />
             
            </View>
          );
        }}
        contentContainerStyle={{ marginHorizontal: 10 }}
        data={Address}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#dddddd",
              borderRadius: 5,
              backgroundColor: "#fff",
              elevation: 3,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.4,
              marginTop: 5,
              padding: 5,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="map-marker-alt" size={18} color="#0f76de" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: "poppinbold" }}>{item.title}</Text>
                <Text style={{ color: "#5c5c5c", fontSize: 12 }}>
                  {item.address}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={()=>{isselected(index),getplacetitle(item.title),getplaceaddress(item.address),ischecked(!checked)}}>
            {selected==index ?
            <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="#0f76de" />    
            
            :
            <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#5c5c5c" />
            }
            </TouchableOpacity>  
          </View>
        )}
      />
            </View>
                    </ScrollView>
                <TouchableOpacity onPress={()=>{setAddressModalVisible(false),placetitle(place),placeaddress(placename)}} style={{...styles.LoginButton,padding:8,width:'90%',alignSelf:'flex-end'}}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                </View> 
            </View>
            </View>
        </Modal>

      
    </View>
   
    </ScrollView>
    </>
  );
}
//colors on focus #97c6f4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
   
  },
  heading_text:{
    color:'#5d5d5d',
    fontSize:20,
    fontWeight:'700',
    padding:10
  },
   
    header:{
        backgroundColor:'#0f76de',
        height:60,
        justifyContent:'center',
        // marginTop:Platform.OS=='android'?25:0 
    },
    textcolor:{
        fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
    CardContainer:{
        width:'95%',
        padding:10,
        paddingVertical:20,
        borderRadius:5,
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        marginTop:20,
        shadowOffset:{width:0.5,height:0.5},
        elevation:3
    },
    ContactCardContainer:{
        width:'95%',
        padding:10,
        paddingVertical:20,
        borderRadius:5,
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        marginTop:10,
        shadowOffset:{width:0.5,height:0.5},
        elevation:3
    },
    PayentCardContainer:{
        width:'95%',
        
        paddingVertical:10,
        borderRadius:5,
       
        alignSelf:'center',
        backgroundColor:'#fff',
        shadowOpacity:0.1,
        marginTop:10,
        shadowOffset:{width:0.5,height:0.5},
        elevation:3
    },
    miniContainer:{
        flexDirection:'row',
        margin:10,
        marginTop:5,
        justifyContent:'space-between'
    },
    borderLine:{
        width:'95%',
        alignSelf:'center',
        borderColor:'#dddddd',
        marginTop:10,
        borderBottomWidth:0.4
    },
    colortext:{
        color:'#0f76de',
        fontFamily:'poppinbold'
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:12,
        margin:20,
        borderRadius:5
    },
    text:{
        fontWeight:'600',
        fontSize:15,
        textAlign:'center',      
        color:'#fff'
    },
    //

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    //    shadowOffset:{width:1,height:1},
    //    backgroundColor:'#000000A9'
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width:'80%',
        height:350,
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
      },

      //Address Modal
      AddresscenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    //    shadowOffset:{width:1,height:1},
    //    backgroundColor:'#000000A9'
      },
      AddressmodalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width:'80%',
        height:350,
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
      AddressopenButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      AddresstextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      AddressmodalText: {
        marginBottom: 15,
        textAlign: 'center',
      },


      
});