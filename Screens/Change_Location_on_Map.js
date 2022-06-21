import React, { useState } from "react";
import {
  ScrollView,
  Platform,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import MapView,{Marker,Callout} from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import * as Location from 'expo-location';
import {
  Ionicons,
  
  FontAwesome5,
} from "@expo/vector-icons";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { basepath } from "../BasePath/Basepath";
import Tooltip from 'rn-tooltip';
const dataArray=
  [
    { title: 'Home', key: 'Home' },
    { title: 'Work', key: 'Work' },
    { title: 'Other', key: 'Other' },
   
  ]
export default function ChangeLocationonMap({navigation,route}) {
  console.log('route',route)
  const [defaultcolor,bluecolor]=React.useState(false)
  const [selectedlabel,selectlabel]=React.useState('Home')

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchedlocation,searchlocation]=useState('Dummy Place')
  const [suggestion,showSuggeestion]=useState(false)
  const [prediction,showPrediction]=useState([])

  React.useEffect(() => {
    Get_User_Current_Location()
  }, []);
  async function  Get_User_Current_Location(){
    
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      var userdata=await AsyncStorage.getItem('USER_DATA')
      var customerid=JSON.parse(userdata)
      Save_Address(customerid.id)
    
  }

   async function autocompleteplaces (searchplace)  {
    // if (searchplace == "") {
    //   return;
    // }
   
    
return
    // this.setState({ onautocompleteplacescoming: true });
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchplace}&key=yourkey`
    );
    let respJson = await resp.json();
// console.log(respJson)
    if (respJson.status == "ZERO_RESULTS") {
      //Toast.show("No Such Place Found");
      alert('No Such Places')
    }
    showPrediction(respJson.predictions)
    // this.setState({ autocompletedataarray: respJson.predictions });
  };


  function  Save_Address(id){
  
    const formData = new FormData()
    formData.append('customer_id', id);
    formData.append('title', selectedlabel);
    formData.append('latitude', 23342);
    formData.append('longitude', 23342);
    formData.append('address', 'Home Address');
    try{
      fetch(`${basepath}customer_add_address`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log( responseJson)
        if(!responseJson.error == true){
        // navigation.navigate('Dashboard')
        
        }else{
           alert(responseJson.error)
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 300,
      }}
    >
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{fontFamily:'poppinbold'}}>Add New Address</Text>
      {/* <Entypo  name='save' size={18} color={"#0f76de"}/> */}
      </View>
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
              marginTop: 7,
              padding: 5,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row",marginLeft:10, alignItems: "center" }}>
              <FontAwesome5 name="map-marker-alt" size={18} color="#0f76de" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: "poppinbold" }}>{searchedlocation}</Text>
                <Text style={{ color: "#5c5c5c", fontSize: 12 }}>
                  {selectedlabel}
                </Text>
              </View>
            </View>

            
          </View>
          <Text style={{fontFamily:'poppinbold',marginTop:10}}>Label as</Text>
            <FlatList 
            data={dataArray}
            horizontal
            renderItem={({ item, index }) => (
              
                <View style={{marginTop:7}}>
                   <TouchableOpacity
            
                          onPress={()=>selectlabel(item.key)}
                          style={{flexDirection:'row',marginHorizontal:2}}>
                          <View style={{...styles.ListButtons,backgroundColor:item.key==selectedlabel?'#0f76de':'#fcfcfc',}}>
                            <Text style={{fontFamily:'poppin',color:item.key==selectedlabel?'#fcfcfc':'#000000',}}>{item.title}</Text>
                          </View>
                    </TouchableOpacity>
                </View>
              
            )}
            />
            <View style={{alignItems:'center'}}>
        <TouchableOpacity  onPress={()=>Save_Address()}  style={styles.LoginButton}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
  

  const sheetRef = React.useRef(null);

  if(location==null){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Getting Location Please wait</Text>
      </View>
    )
  }else
    return (
      <>
     
          
      <View style={styles.container}>
        <MapView initialRegion={{
          latitude:location.latitude,
          longitude:location.longitude,
          latitudeDelta:0.01,
          longitudeDelta: 0.01
          }}
          onPress={(e)=>
            setLocation(e.nativeEvent.coordinate)
            
            }  
          mapType='standard' style={{flex:1}} >
            {/* image={ require('../assets/Marker.png' )} */}
            <Marker draggable={true} image={require('../assets/icons8-marker-80.png')}   coordinate={{ latitude: location.latitude, longitude:  location.longitude }}>
              <Callout>
                <Text>My Current Location</Text>
              </Callout>
            </Marker>
        </MapView>
       <View style={StyleSheet.absoluteFill}>
       <View style={styles.header}>
        <View>
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 5,
            marginLeft: 20,
          }}
        >
          {Platform.OS == "ios" ? (
            <Ionicons
              name="ios-arrow-back"
              style={{ top: 4 }}
              size={24}
              color="#fff"
            />
          ) : (
            <Ionicons
              name="md-arrow-back"
              style={{ top: 4 }}
              size={24}
              color="#FFF"
            />
          )}
          <Text style={styles.textcolor}>Address</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginTop:10,marginRight:10}}>
        <Tooltip pointerColor={'#fff'}width={250} containerStyle={{backgroundColor:'#fff',borderRadius:2}} popover={<Text>Click on map to pick Location</Text>}>
        <Ionicons name="ios-information-circle-outline" size={24} color="#fff" />
        </Tooltip>
        </View>
      </View>
          <View style={{flexDirection:'row',padding:5,marginTop:10,marginHorizontal:10,shadowOffset:{width:1,height:1},shadowOpacity:0.4,elevation:3,backgroundColor:'#fff'}}>
            <TextInput  onBlur={()=>showSuggeestion(false)} value={searchedlocation} onChangeText={(searchedlocation)=>{searchlocation(searchedlocation),showSuggeestion(true)}} placeholder='Search Place' onSubmitEditing={()=>showSuggeestion(false)} style={{width:'90%',paddingHorizontal:10}} />
            <TouchableOpacity>
              <FontAwesome5 name="map-marked-alt" size={24} color="#0f76de" />
            </TouchableOpacity>
          </View>
          {searchedlocation.length>0?
          suggestion?
          <View style={{height:200,padding:5,marginHorizontal:10,shadowOffset:{width:1,height:1},shadowOpacity:0.4,elevation:3,backgroundColor:'#fff'}}>
            <FlatList
              keyExtractor={(item)=>item.title.toString()}
              data={[
                {'title':'Saheen abad','city':'Gujranwala'},
                {'title':'Lari Adda','city':'Isalmabad'},
                {'title':'Rahwali','city':'Gujranwala'},
                {'title':'modal town','city':'Lahore'},
                {'title':'satellite town','city':'Pindi'}
              ]}
              renderItem={({ item, index, separators }) => (
                <TouchableWithoutFeedback
                  key={item.key}
                  onPress={() =>{searchlocation(item.title)}}
                  >
                  <View style={{ backgroundColor: 'white' }}>
                    <Text>{item.title}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          :null:null
        } 
       
       </View>
       
       <TouchableOpacity  style={styles.LoginButton}>
          <Text style={styles.text}>Save Location</Text>
        </TouchableOpacity>
      </View>
      
      
     
      </>
    );
  
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      heading_text: {
        color: "#3c3c3c",
        fontSize: 20,
        fontFamily: "poppinbold",
        padding: 10,
      },
      header: {
        backgroundColor: "#0f76de",
        height: 60,
        alignItems:'center',
        justifyContent:'space-between',
       flexDirection:'row'
        //marginTop: Platform.OS == "android" ? 25 : 0,
      },
      textcolor: {
        fontFamily: "poppinbold",
        color: "#fff",
        top: 4,
        marginLeft: 30,
      },
      input: {
        borderWidth: 1,
        padding: 12,
        margin: 10,
        borderRadius: 5,
    
        borderColor: "#8c8c8c",
      },
      LoginButton: {
        backgroundColor: "#0f76de",
        width:'100%',
        padding: 8,
        // margin: 20,
      
        borderRadius: 2,
      },
      text: {
        fontFamily: "poppinbold",
        fontSize: 15,
        textAlign: "center",
    
        color: "#fff",
      },
      ListButtons:{
    
        borderWidth:0.3,
        borderColor:'#dddddd',
        padding:5,
        marginRight:4,
        borderRadius:20,
        paddingHorizontal:10 
      },
})
