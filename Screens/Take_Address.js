import React, { useState, useRef } from "react";
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
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import * as Location from "expo-location";
import { Ionicons,MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { basepath } from "../BasePath/Basepath";
import Tooltip from "rn-tooltip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast  from "react-native-tiny-toast";

const dataArray = [
  { title: "Home", key: "Home" },
  { title: "Work", key: "Work" },
  { title: "Other", key: "Other" },
];
export default function Address({ navigation }) {
  const [defaultcolor, bluecolor] = React.useState(false);
  const [selectedlabel, selectlabel] = React.useState("Home");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchedlocation, searchlocation] = useState('');
  const [searcheduserlocation, searchuserlocation] = useState('');

  const [suggestion, showSuggeestion] = useState(false);
  const [prediction, showPrediction] = useState([]);
  const save_location_menu = React.useRef(new Animated.Value(0)).current;
  const [userlocationmenu, showorhideuserlocation] = useState(false);
  const [autocompletedataarray,setautocompletedataarray]=useState([])
  const [personlatitude,placelatitude]=useState(null)
  const [personlongtitude,placelongtitude]=useState(null)
  const [userid,getid]=useState(null)
  const map = React.useRef();
  
  React.useEffect(() => {
    Get_User_Current_Location();
  }, []);
  async function Get_User_Current_Location() {
    let { status } = await Location.requestPermissionsAsync();
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    getid(customerid.id)
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    // placelatitude(location.coords.latitude)
    // placelongtitude(location.coords.latitude)
    Geo_Code(location.coords.latitude,location.coords.longitude)
  }

  async function Geo_Code(latitude,longitude) {
   let resp=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=yourkey`)
   let respJson = await resp.json();
   searchuserlocation(respJson.results[0].formatted_address)
  //  placelatitude(respJson.results[0].geometry.location.lat)
  //  placelongtitude(respJson.results[0].geometry.location.lng)
   centerMap(respJson.results[0].geometry.location.lat,respJson.results[0].geometry.location.lng)
  }
  function centerMap(lat,lng){
    let latitude=lat
    let longitude=lng
    let latitudeDelta=0.045
    let longitudeDelta=0.045
    placelatitude(lat)
    placelongtitude(lng)
    // console.log('center map',map)
    map.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  async function autocompleteplaces  (places) {
    if (searchedlocation == "") {
      return;
    }
    // this.setState({ onautocompleteplacescoming: true });
    // Restricted to specific Area e.g 500 meter radius
    // https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&strictbounds&key=YOUR_API_KEY
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${places}&key=AIzaSyC_LWPOTamnTLKR0IVa5pX_w2Zxo9hE0Sw`
    );
    let respJson = await resp.json();
    // console.log('predictions',respJson)
    if (respJson.status == "ZERO_RESULTS") {
      // Toast.show("No Such Place Found");
    }
    // autocompletedataarray: 
    setautocompletedataarray(respJson.predictions);
  };

// get Place lat and long

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY
  async function Place_Latitude_Longtitue(params) {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${params}&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyC_LWPOTamnTLKR0IVa5pX_w2Zxo9hE0Sw`
    );
    let respJson = await resp.json();
    placelatitude(respJson.candidates[0].geometry.location.lat)
    placelongtitude(respJson.candidates[0].geometry.location.lng)
    Geo_Code(respJson.candidates[0].geometry.location.lat,respJson.candidates[0].geometry.location.lng)
  }
  function Save_Address() {
    const formData = new FormData();
    formData.append("customer_id", userid);
    formData.append("title", selectedlabel);
    formData.append("latitude", personlatitude);
    formData.append("longitude", personlongtitude);
    formData.append("address", searcheduserlocation);
    const loading= Toast.showLoading()
    try {
      fetch(`${basepath}customer_add_address`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          Toast.hide(loading)
          if (!responseJson.error == true) {
            // navigation.navigate('Dashboard')
          } else {
            alert(responseJson.error);
          }
        })
        .catch((error) => {});
    } catch (e) {}
  }
  
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 300,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "poppinbold" }}>Your Address</Text>
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
        <View
          style={{ flexDirection: "row", marginLeft: 10, alignItems: "center" }}
        >
          <FontAwesome5 name="map-marker-alt" size={18} color="#0f76de" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontFamily: "poppinbold",flexWrap:'wrap' }}>{searcheduserlocation}</Text>
            <Text style={{ color: "#5c5c5c", fontSize: 12 }}>
              {selectedlabel}
            </Text>
          </View>
        </View>
      </View>
      <Text style={{ fontFamily: "poppinbold", marginTop: 10 }}>Label as</Text>
      <View>
        <FlatList
          data={dataArray}
          horizontal
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 7 }}>
              <TouchableOpacity
                // onPress={()=>selectlabel(item.key)}
                onPress={() => selectlabel(item.key)}
                // onPress={()=>alert(item.key)}
                style={{ flexDirection: "row", marginHorizontal: 2 }}
              >
                <View
                  style={{
                    ...styles.ListButtons,
                    backgroundColor:
                      item.key == selectedlabel ? "#0f76de" : "#fcfcfc",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "poppin",
                      color: item.key == selectedlabel ? "#fcfcfc" : "#000000",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        {/* onPress={()=>Save_Address()} */}
        <TouchableOpacity
          onPress={() => Save_Address()}
          style={styles.LoginButton}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const sheetRef = React.useRef(null);

  const menuheight = save_location_menu.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 300],
  });
  if (location == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting Location Please wait</Text>
      </View>
    );
  } else if (Platform.OS == "android") {
    return (
      <View style={styles.container}>
        <MapView
        ref={map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onMarkerDragEnd={(e) =>{Geo_Code(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude) ,setLocation(e.nativeEvent.coordinate)}}
          onPress={(e) =>{Geo_Code(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude) ,setLocation(e.nativeEvent.coordinate)}}
          
          mapType="standard"
          style={{ flex: 1 }}
        >
          {/* image={ require('../assets/Marker.png' )} */}
          <Marker
            draggable={true}
            
            coordinate={{
              latitude: personlatitude==null?location.latitude:personlatitude,
              longitude:personlongtitude==null?location.longitude:personlongtitude,
            }}
          >
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
            <View style={{ marginTop: 10,flexDirection:'row', marginRight: 10 }}>
            <MaterialIcons onPress={()=>Get_User_Current_Location()} name="gps-fixed" style={{marginRight:10}} size={24} color="#fff" />
              <Tooltip
                pointerColor={"#fff"}
                width={250}
                containerStyle={{ backgroundColor: "#fff", borderRadius: 2 }}
                popover={<Text>Click on map to pick Location</Text>}
              >
                <Ionicons
                  name="ios-information-circle-outline"
                  size={24}
                  color="#fff"
                />
              </Tooltip>
            </View>
          </View>

          <View
              style={{
                flexDirection: "row",
                padding: 5,
                marginTop: 10,
                marginHorizontal: 10,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                elevation: 3,
                backgroundColor: "#fff",
              }}
            >
              <TextInput
                onBlur={() => showSuggeestion(false)}
                value={searchedlocation}
                onChangeText={(searchedlocation) => {
                  autocompleteplaces(searchedlocation),
                  searchlocation(searchedlocation), 
                  showSuggeestion(true);
                }}
                placeholder="Search Place"
                onSubmitEditing={() => showSuggeestion(false)}
                style={{ width: "90%", paddingHorizontal: 10 }}
              />
              <TouchableOpacity onPress={() => alert("fhjg")}>
                <FontAwesome5 name="map-marked-alt" size={24} color="#0f76de" />
              </TouchableOpacity>
            </View>
            {searchedlocation.length > 0 ? (
              suggestion ? (
                <View
                  style={{
                    height: 200,
                    padding: 5,
                    marginHorizontal: 10,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.4,
                    elevation: 3,
                    backgroundColor: "#fff",
                  }}
                >
                  <FlatList
                    keyExtractor={(item) => item.place_id}
                    data={autocompletedataarray}
                    renderItem={({ item, index, separators }) => (
                      <TouchableWithoutFeedback
                        key={item.key}
                        onPress={() => {
                          searchuserlocation(item.description);
                          Place_Latitude_Longtitue(item.description)

                        }}
                      >
                        <View style={{ backgroundColor: "white",borderBottomWidth:0.4 }}>
                          <Text style={{padding:4}}>{item.description}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  />
                </View>
              ) : null
            ) : null}
          <View style={{ position: "absolute", bottom: 0 }}>
            <Animated.View
              style={{
                padding: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: menuheight,
                backgroundColor: "#fff",
                width: Dimensions.get("window").width,
              }}
            >
              <Text style={{ fontFamily: "poppinbold" }}>Your Address is</Text>
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
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="map-marker-alt"
                    size={18}
                    color="#0f76de"
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontFamily: "poppinbold" }}>
                      {searcheduserlocation}
                    </Text>
                    <Text style={{ color: "#5c5c5c", fontSize: 12 }}>
                      {selectedlabel}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{ fontFamily: "poppinbold", marginTop: 10 }}>
                Label as
              </Text>
              <View>
                <FlatList
                  data={dataArray}
                  horizontal
                  renderItem={({ item, index }) => (
                    <View style={{ marginTop: 7 }}>
                      <TouchableOpacity
                        // onPress={()=>selectlabel(item.key)}
                        onPress={() => selectlabel(item.key)}
                        // onPress={()=>alert(item.key)}
                        style={{ flexDirection: "row", marginHorizontal: 2 }}
                      >
                        <View
                          style={{
                            ...styles.ListButtons,
                            backgroundColor:
                              item.key == selectedlabel ? "#0f76de" : "#fcfcfc",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "poppin",
                              color:
                                item.key == selectedlabel
                                  ? "#fcfcfc"
                                  : "#000000",
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                {/* onPress={()=>Save_Address()} */}
                <TouchableOpacity
                  onPress={() => Save_Address()}
                  style={styles.LoginButton}
                >
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            <TouchableOpacity
              style={styles.LoginButtonandroid}
              onPress={() => {
                if (!userlocationmenu) {
                  Animated.timing(save_location_menu, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                } else {
                  Animated.timing(save_location_menu, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                }

                showorhideuserlocation(!userlocationmenu);
              }}
            >
              <Text style={styles.text}>Save As</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else
    return (
      <>
        <View style={styles.container}>
          <MapView
            ref={map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onMarkerDragEnd={(e) =>{Geo_Code(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude) ,setLocation(e.nativeEvent.coordinate)}}
            onPress={(e) =>{Geo_Code(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude) ,setLocation(e.nativeEvent.coordinate)}}
            
            mapType="standard"
            style={{ flex: 1 }}
          >
            {/* image={ require('../assets/Marker.png' )} */}
            <Marker
            draggable={true}
           
            coordinate={{
              latitude: personlatitude==null?location.latitude:personlatitude,
              longitude:personlongtitude==null?location.longitude:personlongtitude,
            }}
          >
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
              <View style={{ marginTop: 10,flexDirection:'row', marginRight: 10 }}>
              <MaterialIcons onPress={()=>Get_User_Current_Location()} name="gps-fixed" style={{marginRight:10}} size={24} color="#fff" />
                <Tooltip
                  pointerColor={"#fff"}
                  width={250}
                  containerStyle={{ backgroundColor: "#fff", borderRadius: 2 }}
                  popover={<Text>Click on map to pick Location</Text>}
                >
                  <Ionicons
                    name="ios-information-circle-outline"
                    size={24}
                    color="#fff"
                  />
                </Tooltip>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                marginTop: 10,
                marginHorizontal: 10,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                elevation: 3,
                backgroundColor: "#fff",
              }}
            >
              <TextInput
                onBlur={() => showSuggeestion(false)}
                value={searchedlocation}
                onChangeText={(searchedlocation) => {
                  autocompleteplaces(searchedlocation),
                  searchlocation(searchedlocation), 
                  showSuggeestion(true);
                }}
                placeholder="Search Place"
                onSubmitEditing={() => showSuggeestion(false)}
                style={{ width: "90%", paddingHorizontal: 10 }}
              />
              <TouchableOpacity onPress={() => alert("fhjg")}>
                <FontAwesome5 name="map-marked-alt" size={24} color="#0f76de" />
              </TouchableOpacity>
            </View>
            {searchedlocation.length > 0 ? (
              suggestion ? (
                <View
                  style={{
                    height: 200,
                    padding: 5,
                    marginHorizontal: 10,
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.4,
                    elevation: 3,
                    backgroundColor: "#fff",
                  }}
                >
                  <FlatList
                    keyExtractor={(item) => item.place_id}
                    data={autocompletedataarray}
                    renderItem={({ item, index, separators }) => (
                      <TouchableWithoutFeedback
                        key={item.key}
                        onPress={() => {
                          searchuserlocation(item.description);
                          Place_Latitude_Longtitue(item.description)
                        }}
                      >
                        <View style={{ backgroundColor: "white",borderBottomWidth:0.4 }}>
                          <Text style={{padding:4}}>{item.description}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  />
                </View>
              ) : null
            ) : null}
            <BottomSheet
              ref={sheetRef}
              snapPoints={[300, 100]}
              borderRadius={10}
              renderContent={renderContent}
              enabledGestureInteraction={true}
            />
          </View>
        </View>
      </>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
    width: "90%",
    padding: 6,
    margin: 20,
    borderRadius: 5,
  },
  LoginButtonandroid: {
    backgroundColor: "#0f76de",
    width: Dimensions.get("window").width,
    padding: 6,
    // margin: 20,
    borderRadius: 1,
  },
  text: {
    fontFamily: "poppinbold",
    fontSize: 15,
    textAlign: "center",

    color: "#fff",
  },
  ListButtons: {
    borderWidth: 0.3,
    borderColor: "#dddddd",
    padding: 5,
    marginRight: 4,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
