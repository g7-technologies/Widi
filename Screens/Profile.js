import React, { Component, useState } from 'react';
import { StyleSheet,TouchableHighlight, TouchableOpacity,ScrollView,Modal,ActivityIndicator,Image,Alert,Platform, Text, View } from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { TextInput,  } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basepath,Imagebasepath } from "../BasePath/Basepath";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';

const Genders =[
    {label:'Male',value:1},
    {label:'Female',value:2},
    {label:'Other',value:3},   
]
export default function  App ({navigation}){

   
   const [user,userdetail]=useState({})  
    
   const [dateis,setdate]=useState(false)
   const [modalVisible, setModalVisible] = useState(false);
   const [name,setname]=useState('')
   const [selected,select]=useState('')
   const [userdate,userselecteddate]=useState(null)
   const [image, setImage] = useState('');
   const [base64imageuri, Imageuri] = useState('');
   const [showindicator,indicatorcondition]=useState(true)

   
    React.useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            GetUserProfileInfo()
          });
        
        return unsubscribe;
    },[])
    
    async function  GetUserProfileInfo(){
        
       indicatorcondition(true)
        try {
            const value = await AsyncStorage.getItem('USER_DATA');
           
           
                // We have data!!
                
             userdetail(JSON.parse(value))
           
            
        } catch (error) {
            // Error retrieving data
        }
    }

 

    function UpdateUserInfo(){
      
        indicatorcondition(false)
        const formData = new FormData()
        formData.append('customer_id', user.id);
        formData.append('name', name);
        formData.append('gender', selected);

        formData.append('dob',userdate==null || userdate==''?'':userdate.toString().substr(0,15) );
        formData.append('image', base64imageuri);
        
    
        
        try{
        fetch(`${basepath}customer_update_profile`, {
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
            if(responseJson.error==false){
                UpdateAsync(responseJson.user)
                
            }
            
        })
        .catch((error) =>{});
        }catch(e){}
    }

    async function UpdateAsync(user){
        
        
        AsyncStorage.setItem('USER_DATA', JSON.stringify(user), (err)=> {
         if(err){
          
            // GetUserProfileInfo()
             throw err;
         }
        // alert('clld')
        indicatorcondition(true)
        
         }).catch((err)=> {
             console.log("error is: " + err);
         });
         navigation.goBack()
        // navigation.openDrawer()
         Toast.show('Profile updated successfully')
    }
    async function pickImage  ()  {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.4,
          base64:true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          console.log()
          Imageuri(`data:image/jpg;base64,${result.base64}`)
        
        }
        //console.log(base64imageuri)
        
    };

  return (
      <>
    
    <View style={{flex:1}}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
                {Platform.OS=='ios'?
                    <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                    :
                    <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
                }
                <Text style={styles.textcolor}>Profile</Text>

            </TouchableOpacity>
        </View>
    
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
            <View style={{alignSelf:'center',marginTop:20}}>
            {image!=''?
                <Image source={{ uri: image }} style={{width:100,height:100,alignSelf:'center',borderRadius:100}} />
                :
                (
                    user.image==null?
                    <Image source={require('../assets/Person.png')} style={{width:100,height:100,alignSelf:'center',borderRadius:100}}/>
                    :
                    <Image  source={{ uri:`${Imagebasepath}`+user.image}} style={{width:100,height:100,alignSelf:'center',borderRadius:100}} />
                )
            }
               <TouchableOpacity onPress={()=>pickImage()}>
                <Text style={{color:`#3badfb`,marginTop:5,fontFamily:'poppin' }}>Choose Picture</Text>
                </TouchableOpacity>
            </View>
            <View style={{padding:15}}>
                <Text style={{fontFamily:'poppin'}}>Name</Text>
                <Text></Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <TextInput defaultValue={user.name}  onChangeText={(name)=>setname(name)} style={{fontFamily:'poppin'}} placeholder={'Person Name'}/>
                </View>
                <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
            </View>
            <View style={{padding:15}}>
                <Text style={{fontFamily:'poppin'}}>Gender</Text>
                <Text></Text>
                <TouchableOpacity  onPress={() => {setModalVisible(true)}} style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'#b7b7b7',fontFamily:'poppin'}}>{selected==null || selected==''?user.gender:selected}</Text>
                    <AntDesign name="right" size={12} color="#b7b7b7" />
                </TouchableOpacity>
                <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(false)}}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Your Gender</Text>
                        <RadioForm
                            radio_props={Genders}
                            initial={null}
                            buttonSize={10}
                            
                            animation={true}
                            onPress={(value) =>select(Genders[value-1].label) }
                        />
                        
                     
                      <View style={{alignSelf:'flex-end',top:40,flexDirection:'row'}}>
                        <TouchableHighlight onPress={() => {setModalVisible(!modalVisible),select(user.gender)}}>
                            <Text style={{color:'#3badfb'}}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {setModalVisible(!modalVisible)}}>
                            <Text style={{color:'#3badfb',marginLeft:20}}>OK</Text>
                        </TouchableHighlight>
                      </View>
                     
                    </View>
                    </View>
                </Modal>
            </View>
            <View style={{padding:15}}>
                <Text style={{fontFamily:'poppin'}}> Date of birth</Text>
                <Text></Text>
                <TouchableOpacity onPress={() => {setdate(true)}} style={{flexDirection:'row',justifyContent:'space-between'}}>
                   
                    <Text style={{color:'#b7b7b7',fontFamily:'poppin'}}>{userdate==null || userdate==''?user.dob: userdate.substr(0,15)}</Text>
                    <AntDesign name="right" size={12} color="#b7b7b7" />
                </TouchableOpacity>
                <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
             
                <DateTimePickerModal
                    isVisible={dateis}
                    mode="date" 
                    onConfirm={(date) => {userselecteddate(date.toString()),setdate(false)}}
                    onCancel={() => {setdate(false)}}
                />
            </View>
  
            <View style={{padding:15}}>
                <TouchableOpacity onPress={()=>navigation.navigate('ChangeEmail')}  style={{flexDirection:'row',justifyContent:'space-between'}}>    
                    <Text style={{fontFamily:'poppin'}}>Change Email</Text>
                    <AntDesign name="right" size={12} color="#b7b7b7" />
                </TouchableOpacity>
                <Text style={{color:'#b7b7b7',fontFamily:'poppin'}}>{user.email}</Text>
                <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
            </View>
            {user.phone==0?
                
                <View style={{padding:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePhone')}  style={{flexDirection:'row',justifyContent:'space-between'}}>    
                        <Text style={{fontFamily:'poppin'}}>Set Phone Number</Text>
                        <AntDesign name="right" size={12} color="#b7b7b7" />
                    </TouchableOpacity>
                    
                    <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
                </View>
                :
                <View style={{padding:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePhone')}  style={{flexDirection:'row',justifyContent:'space-between'}}>    
                        <Text style={{fontFamily:'poppin'}}>Change Phone Number</Text>
                        <AntDesign name="right" size={12} color="#b7b7b7" />
                    </TouchableOpacity>
                    <Text style={{color:'#b7b7b7',fontFamily:'poppin'}}>{user.phone}</Text>

                    <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
                </View>
            }
            {user.password==0?
                <View style={{padding:15}}>
                <TouchableOpacity onPress={()=>navigation.navigate('SetPassword')}  style={{flexDirection:'row',justifyContent:'space-between'}}>    
                    <Text style={{fontFamily:'poppin'}}>Set Password</Text>
                    <AntDesign name="right" size={12} color="#b7b7b7" />
                </TouchableOpacity>
                <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
                </View>
                :
                <View style={{padding:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')}  style={{flexDirection:'row',justifyContent:'space-between'}}>    
                        <Text style={{fontFamily:'poppin'}}>Change Password</Text>
                        <AntDesign name="right" size={12} color="#b7b7b7" />
                    </TouchableOpacity>
                    <View style={{borderBottomWidth:0.4,borderColor:'#dddddd',paddingTop:15}}/>
                </View>
            }
            

        </ScrollView>
        
        {showindicator?  
            <TouchableOpacity onPress={()=>UpdateUserInfo()} style={styles.LoginButton}>
                <Text style={styles.text}>Update</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity  style={styles.LoginButton}>
                <ActivityIndicator color={'#fff'}/>
            </TouchableOpacity>
        }
    </View>
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
      //marginTop:Platform.OS=='android'?25:0 
    },
    textcolor:{
       fontFamily:'poppinbold',
        color:'#fff',
        top:4,
        marginLeft:30
    },
    LoginButton:{
        backgroundColor:'#0f76de',
        padding:8,
        margin:20,
        borderRadius:5
    },
    text:{
       fontFamily:'poppin',
        fontSize:15,
        textAlign:'center',      
        color:'#fff'
    },
  //

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    margin: 10,
    backgroundColor: '#fff',
    
    width:'80%',
    height:240,
  padding:15,
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
   fontFamily:'poppinbold',
   fontSize:20
  },
});
