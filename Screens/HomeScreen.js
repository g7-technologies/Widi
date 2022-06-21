import React, { Component, isValidElement, useState } from "react";
import {
  FlatList,
  Alert,
  Modal,
  Animated,
  StyleSheet,
  TextInput,
  Image,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
} from "react-native";

import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  Fontisto,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
//
import FoodCatagory from "../Component/FoodCatagory";
import CustomSingleScroll from "../Component/CustomSingleScroll";
import CustomSingleItemScroll from "../Component/CustomSingleItemScroll";
import { connect } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import FilterScreens from "../Screens/Filter_Sub_Screens";
import { basepath } from "../BasePath/Basepath";
import AsyncStorage from "@react-native-async-storage/async-storage";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef();
    this.map = React.createRef();
    this.state = {
      Focus: false,

      Usecurrentlocaitionmap: new Animated.Value(0),
      UsecurrentlocaionStatus: false,
      Usecurrentlocaitionmapsearch: new Animated.Value(0),
      UsecurrentlocaionStatussearch: false,
      CatagoryFilters: new Animated.Value(0),
      isfilterenable: false,
      EnableFilterstatus: false,
      Data_Catagories: [],
      Duplicate_Data_Resturants: [],
      Duplicate_Data_Top_Rated: [],
      Data_Resturants: [],
      Data_Top_Rated: [],
      Filter_Array: [],
      location: null,
      showTopRated: true,
      showchangeLocationalert: null,
      Location_Name: "",
      autocompletedataarray: [],
      place: "",
      suggestion: false,
      personlatitude: null,
      personlongtitude: null,
      searchText:'',
    };
  }

  // GetAsyncValues=async ()=>{
  // console.log('******************************')
  // var x = await AsyncStorage.getItem('USER_DATA')
  // var u=JSON.parse(x)
  // var c=u.id
  // var y = await AsyncStorage.getItem('personlatitude')
  // var z = await AsyncStorage.getItem('personlongitude')

  // var temp=[c,y,z]
  // return temp
  // //console.log('******************************')
  // }

  componentDidMount() {
    // var p=await AsyncStorage.getItem('personlatitude')
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      //alert('sdasa')

      this.GetLatestResult();
      //this.Resturants_Catagories_and_Detail();
    });
    this.Get_User_Current_Position();
  }

  GetLatestResult = async () => {
    var y = await AsyncStorage.getItem("personlatitude");
    var z = await AsyncStorage.getItem("personlongitude");
    // console.log("Async position 1");
    if (y != null || z != null) {
      this.Resturants_Catagories_and_Detail();
    }
    // console.log("Async position 2");
  };
  Get_User_Current_Position = async () => {
    // console.log("current position");

    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: location.coords,
      personlatitude: location.coords.latitude,
      personlongtitude: location.coords.longitude,
    });
    this.Geo_Code(location.coords.latitude, location.coords.longitude);
  };

  Geo_Code = async (latitude, longitude) => {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDMlR4YuYz3KMPmTmOXSwQc7p6IS-a19Bs`
    );
    let respJson = await resp.json();
    // console.log("**********************");
    // console.log(respJson);
    // console.log("**********************");

    this.setState({ Location_Name: respJson.results[0].formatted_address });
    await AsyncStorage.setItem(
      "UserPlaceName",
      respJson.results[0].formatted_address
    );
    this.setState({
      personlatitude: respJson.results[0].geometry.location.lat,
      personlongtitude: respJson.results[0].geometry.location.lng,
    });
    this.centerMap(
      respJson.results[0].geometry.location.lat,
      respJson.results[0].geometry.location.lng
    );
  };
  centerMap = async (lat, lng) => {
    await AsyncStorage.setItem("personlatitude", lat.toString());
    await AsyncStorage.setItem("personlongitude", lng.toString());
    let latitude = lat;
    let longitude = lng;
    let latitudeDelta = 0.045;
    let longitudeDelta = 0.045;
    this.setState({ personlatitude: lat, personlongtitude: lng });

    this.map.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
    this.Resturants_Catagories_and_Detail();
  };

  autocompleteplaces = async (places) => {
    if (places == "") {
      return;
    }
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${places}&key=yourkey`
    );
    let respJson = await resp.json();
    this.setState({ autocompletedataarray: respJson.predictions });
    if (respJson.status == "ZERO_RESULTS") {
    }
  };

  Resturants_Catagories_and_Detail = async () => {
    var u = await AsyncStorage.getItem("userLoginid");
    var y = await AsyncStorage.getItem("personlatitude");
    var z = await AsyncStorage.getItem("personlongitude");
    // console.log(u);
    // console.log(y);
    // console.log(z);

    setTimeout(() => {
      const formData = new FormData();
      formData.append("customer_id", u);
      formData.append("latitude", y);
      formData.append("longitude", z);

      try {
        fetch(`${basepath}customer_home`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // console.log(responseJson);

            if (!responseJson.error == true) {
              this.setState({
                Data_Catagories: responseJson.food_type,
                Data_Resturants: responseJson.resturants,
                Duplicate_Data_Resturants: responseJson.resturants,
                Data_Top_Rated: responseJson.top_rated,

                Duplicate_Data_Top_Rated: responseJson.top_rated,
              });
              var temp = [];

              responseJson.resturants.forEach((element) => {
                temp.push(element);
              });
              this.setState({ Filter_user_Food: temp });
            } else {
              alert("Some error occure" + responseJson.error);
            }
          })
          .catch((error) => {});
      } catch (e) {}
    }, 2000);
  };

  Show_CurrentLocation_With_Map = (Usecurrentlocaitionmap) => {
    if (!this.state.UsecurrentlocaionStatus) {
      Animated.timing(this.state.Usecurrentlocaitionmap, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(this.state.Usecurrentlocaitionmap, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }

    this.setState({
      UsecurrentlocaionStatus: !this.state.UsecurrentlocaionStatus,
    });
  };

  Show_or_Hide_filters = (Usecurrentlocaitionmap) => {
    if (!this.state.EnableFilterstatus) {
      Animated.timing(this.state.CatagoryFilters, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(this.state.CatagoryFilters, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }

    this.setState({
      EnableFilterstatus: !this.state.EnableFilterstatus,
    });
  };

  FilterFood = async(param) => {
   await this.setState({searchText:param});
    console.log(this.state.searchText)
    this.Filter_Categories(-1);
  };
  
  
  
  Filter_Categories = (index) => {
    //initialize empty array
    let temp = [];
    //getting search text
    let param = this.state.searchText;
  
    //if called by typing in search field
    if(index == -1)
    {
      //check if there is any filter activated
      if(this.state.Filter_Array.length != 0)
      {
        this.state.Filter_Array.forEach((element) => {
          this.state.Data_Catagories[element].resturants.forEach((ele) => {
            if(temp.length == 0)
            {
              temp.push(ele);
            }
            else
            {
              let resturant_check = false;
              for(var vv = 0; vv<temp.length; vv++)
              {
                if(temp[vv].id == ele.id)
                {
                  resturant_check = true;
                  break;
                }
              }
              if(!resturant_check)
              {
                temp.push(ele);
              }
            }
          });
        });
      }
      else
      {
        temp = this.state.Data_Resturants;
      }
  
      //filter by search text
      var ara = [];
  
      for (var i = 0; i < temp.length; i++) 
      {
        //checking resturant name
        var x = temp[i].name.toUpperCase();
        
        //push in temp array if resturant name matches
        if (x.match(param.toUpperCase())) 
        {
          ara.push(temp[i]);
        }
        else 
        {
          //checking food name
          var tempArr = temp[i].meals;
  
          //foreach loop to get every food item of resturant
          tempArr.forEach((element) => 
          {
            //push in temp array if food name matches
            if (element.name.toUpperCase().match(param.toUpperCase())) 
            {
              ara.push(temp[i]);
            }
          });
        }
      }
      //for loop ends
  
      // send data to flatlist
      if (param.length == 0 && this.state.Filter_Array.length == 0) 
      {
        this.setState({
          Duplicate_Data_Resturants: this.state.Data_Resturants,
          showTopRated: true,
        });
      } else {
        this.setState({ Duplicate_Data_Resturants: ara, showTopRated: false });
      }
    }
    //if conditions where search text with filter completed
    else
    {
      //flag if index exists or not
      let check = false;
      //for loop to insert filters in array
      for (var i = 0; i < this.state.Filter_Array.length; i++) 
      {
        if (this.state.Filter_Array[i] == index) {
          //index already exists remove filter index from array
          check = true;
          this.state.Filter_Array.splice(i, 1);
        }
      }
      //if index doesnot exists in array insert in filter_array
      if (check == false) {
        this.state.Filter_Array.push(index);
      }

      if(this.state.Filter_Array.length == 0)
      {
        temp = this.state.Data_Resturants;
      }

      //check if there is any filter activated
      this.state.Filter_Array.forEach((element) => {
        this.state.Data_Catagories[element].resturants.forEach((ele) => {
          if(temp.length == 0)
          {
            temp.push(ele);
          }
          else
          {
            let resturant_check = false;
            for(var vv = 0; vv<temp.length; vv++)
            {
              if(temp[vv].id == ele.id)
              {
                resturant_check = true;
                break;
              }
            }
            if(!resturant_check)
            {
              temp.push(ele);
            }
          }
        });
      });
  
      //filter by search text
      var ara = [];
  
      for (var i = 0; i < temp.length; i++) 
      {
        //checking resturant name
        var x = temp[i].name.toUpperCase();
        
        //push in temp array if resturant name matches
        if (x.match(param.toUpperCase())) 
        {
          ara.push(temp[i]);
        }
        else 
        {
          //checking food name
          var tempArr = temp[i].meals;
  
          //foreach loop to get every food item of resturant
          tempArr.forEach((element) => 
          {
            //push in temp array if food name matches
            if (element.name.toUpperCase().match(param.toUpperCase())) 
            {
              ara.push(temp[i]);
            }
          });
        }
      }
      //for loop ends
  
      // send data to flatlist
      if (param.length == 0 && this.state.Filter_Array.length == 0) 
      {
        this.setState({
          Duplicate_Data_Resturants: this.state.Data_Resturants,
          showTopRated: true,
        });
      } else {
        this.setState({ Duplicate_Data_Resturants: ara, showTopRated: false });
      }
    }
  }
  

  Place_Latitude_Longtitue = async (params) => {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${params}&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyC_LWPOTamnTLKR0IVa5pX_w2Zxo9hE0Sw`
    );
    let respJson = await resp.json();
    this.setState({
      personlatitude: respJson.candidates[0].geometry.location.lat,
    });
    this.setState({
      personlongtitude: respJson.candidates[0].geometry.location.lng,
    });

    this.Geo_Code(
      respJson.candidates[0].geometry.location.lat,
      respJson.candidates[0].geometry.location.lng
    );
  };

  render() {
    const LocationMap = this.state.Usecurrentlocaitionmap.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 400],
    });

    const filtersheight = this.state.CatagoryFilters.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });
    // const notificationListener =React.useRef();
    // const responseListener =React.useRef();
    if (this.state.location == null) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Getting Your Location</Text>
        </View>
      );
    } else
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0f76de" }}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Image
                  source={require("../assets/Drawericon.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (!this.state.UsecurrentlocaionStatus) {
                    Alert.alert(
                      "Alert",
                      "By Changing Location everything in your cart will be lost?",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            this.setState({ showchangeLocationalert: 1 }),
                              this.Show_CurrentLocation_With_Map(
                                this.state.Usecurrentlocaitionmap
                              ),
                              this.props.emptycart();
                          },
                        },
                        { text: "Cancel" },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    this.Show_CurrentLocation_With_Map(
                      this.state.Usecurrentlocaitionmap
                    );
                  }
                }}
                style={{ alignSelf: "center", alignItems: "center" }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 10, fontFamily: "poppin" }}
                >
                  Delivering to:{" "}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      fontFamily: "poppinbold",
                    }}
                  >
                    Current Location{" "}
                  </Text>
                  <AntDesign name="right" size={10} color="#fff" />
                </View>
              </TouchableOpacity>

              <View style={{ alignSelf: "center" }}>
                <View style={styles.Cartnumbercontainer}>
                  <Text
                    onPress={() => this.props.navigation.navigate("MyCart")}
                    style={{ color: "#fff", textAlign: "center" }}
                  >
                    {this.props.cartitem.length}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("MyCart")}
                >
                  <Fontisto name="opencart" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Animated.View
            style={{
              position: "relative",
              backgroundColor: "#fff",
              height: LocationMap,
            }}
          >
            <View>
              <TextInput
                onChangeText={(place) =>
                  this.setState({ place: place, suggestion: true }, () =>
                    this.autocompleteplaces(place)
                  )
                }
                placeholder="Enter Place Name"
                autoCorrect={false}
                autoCompleteType="street-address"
                //  onBlur={()=>this.setState({suggestion:false})}
                onSubmitEditing={() => this.setState({ suggestion: false })}
                style={{
                  width: "95%",
                  flexDirection: "row",
                  borderColor: "#dddddd",
                  borderWidth: 0.3,
                  borderRadius: 4,
                  padding: 10,
                  top: 10,
                  alignItems: "center",
                  alignSelf: "center",

                  backgroundColor: "#fcfcfc",
                }}
                //  style={{borderWidth:0.5,borderColor:'#dddddd',borderRadius:2,marginTop:10,paddingHorizontal:5,width:'100%',alignSelf:'center'}}
              />
            </View>

            <View
              style={{
                padding: 5,
                width: "100%",
                top: 10,
                height: 320,
                backgroundColor: "#fff",
              }}
            >
              {this.state.location == null ? (
                <View>
                  <Text>Getting Location...</Text>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <MapView
                    ref={this.map}
                    onMarkerDragEnd={(e) => {
                      this.Geo_Code(
                        e.nativeEvent.coordinate.latitude,
                        e.nativeEvent.coordinate.longitude
                      ),
                        this.setState({ location: e.nativeEvent.coordinate });
                    }}
                    onPress={(e) => {
                      this.Geo_Code(
                        e.nativeEvent.coordinate.latitude,
                        e.nativeEvent.coordinate.longitude
                      ),
                        this.setState({ location: e.nativeEvent.coordinate });
                    }}
                    initialRegion={{
                      latitude: this.state.location.latitude,
                      longitude: this.state.location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    style={{ flex: 1 }}
                  >
                    <Marker
                      draggable={true}
                      coordinate={{
                        latitude:
                          this.state.personlatitude == null
                            ? this.state.location.latitude
                            : this.state.personlatitude,
                        longitude:
                          this.state.personlongtitude == null
                            ? this.state.location.longitude
                            : this.state.personlongtitude,
                      }}
                    >
                      <Callout>
                        <Text>My Current Location</Text>
                      </Callout>
                    </Marker>
                  </MapView>

                  <View style={{ position: "absolute", width: "100%" }}>
                    {this.state.place.length > 0 ? (
                      this.state.suggestion ? (
                        <View
                          style={{
                            width: "100%",
                            height: 150,
                            backgroundColor: "#fff",
                          }}
                        >
                          <FlatList
                            keyExtractor={(item) => item.place_id}
                            data={this.state.autocompletedataarray}
                            contentContainerStyle={{ width: "100%" }}
                            renderItem={({ item, index, separators }) => (
                              <TouchableWithoutFeedback
                                key={item.key}
                                onPress={() => {
                                  this.Place_Latitude_Longtitue(
                                    item.description
                                  ),
                                    this.setState({ suggestion: false });
                                }}
                              >
                                <View
                                  style={{
                                    width: 300,
                                    borderBottomWidth: 0.4,
                                    borderBottomColor: "#dddddd",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <Text style={{ padding: 5 }}>
                                    {item.description}
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            )}
                          />
                        </View>
                      ) : null
                    ) : null}
                  </View>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "poppinbold",
                      color: "#0f76de",
                      marginVertical: 10,
                    }}
                  >
                    Current Location
                  </Text>
                  <Text style={{ fontSize: 10, color: "#5c5c5c" }}>
                    {this.state.Location_Name.length > 40
                      ? this.state.Location_Name.substr(0, 40)
                      : this.state.Location_Name}
                  </Text>
                </View>
                <MaterialIcons
                  onPress={() => this.Get_User_Current_Position()}
                  name="gps-fixed"
                  size={24}
                  style={{ marginRight: 10 }}
                  color={"#0f76de"}
                />
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 4,
                borderColor: "#dddddd",
              }}
            />
          </Animated.View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              alert("get new data");
            }}
            //nestedScrollEnabled={true}
            //onEndReachedThreshold={0.5}
            style={styles.container}
          >
            {/* Search bar-..////////////////////////////////////////////////////////////////// */}
            {/* <View  style={styles.container}> */}
            <View style={styles.searchbarsection}>
              <View style={styles.searchbar}>
                <Image
                  source={require("../assets/search.png")}
                  style={{ width: 15, height: 15 }}
                />
                <View style={{ width: "100%" }}>
                  <TextInput
                    onFocus={() => this.setState({ Focus: true })}
                    onBlur={() => this.setState({ Focus: false })}
                    onChangeText={(food) => this.FilterFood(food)}
                    placeholderTextColor="#5c5c5c"
                    placeholder="Find something you like"
                    style={{ paddingHorizontal: 10, fontFamily: "poppin" }}
                  />
                </View>
              </View>
              <View style={styles.filterbutton}>
                <TouchableOpacity
                  onPress={() =>
                    this.Show_or_Hide_filters(this.state.CatagoryFilters)
                  }
                >
                  <Image
                    source={require("../assets/filter.png")}
                    style={{ width: 15, height: 15 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.likedbutton}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("SavedResturant")
                  }
                >
                  <Image
                    source={require("../assets/liked.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Buttons ---////////////////////////////////////////////////////////////////////////////////////// */}

            <Animated.View style={{ height: filtersheight }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ marginHorizontal: 10 }}
                data={this.state.Data_Catagories}
                renderItem={({ item, index }) => (
                  <FoodCatagory
                    onPress={() => this.Filter_Categories(index, item.name)}
                    index={index}
                    item={item.name}
                  />
                )}
              />
            </Animated.View>
            {this.state.showTopRated == false ||
            this.state.Duplicate_Data_Top_Rated.length == 0 ? null : (
              <View>
                <View
                  style={{
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "poppinbold" }}>Top Rated</Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("SellAllResturant", {
                        data: this.state.Duplicate_Data_Top_Rated,
                      })
                    }
                  >
                    <Text style={{ color: "#0f76de", fontFamily: "poppin" }}>
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
                <SafeAreaView>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ marginHorizontal: 10 }}
                    data={this.state.Duplicate_Data_Top_Rated}
                    renderItem={({ item, index }) => (
                      <CustomSingleScroll
                        navigation={this.props.navigation}
                        item={item}
                      />
                    )}
                  />
                </SafeAreaView>
              </View>
            )}

            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "poppinbold" }}>Near By </Text>
              {/*  */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SellAllResturant", {
                    data: this.state.Duplicate_Data_Resturants,
                  })
                }
              >
                <Text style={{ color: "#0f76de", fontFamily: "poppin" }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {this.state.Duplicate_Data_Resturants == "" ? (
              <View style={{ alignSelf: "center" }}>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={require("../assets/food_Monochromatic.png")}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: "#5c5c5c",
                    textAlign: "center",
                  }}
                >
                  Sorry! No Result Found
                </Text>
              </View>
            ) : (
              this.state.Duplicate_Data_Resturants.map((item) => (
                <CustomSingleItemScroll
                  key={item.name}
                  navigation={this.props.navigation}
                  item={item}
                />
              ))
            )}

            {/* <FlatList
     nestedScrollEnabled={true}
      ListEmptyComponent={() => {
        return (
          <View style={{ alignSelf: "center" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../assets/food_Monochromatic.png")}
            />
            <Text
              style={{
                fontSize: 10,
                color: "#5c5c5c",
                textAlign: "center",
              }}
            >
              Sorry! No Result Found
            </Text>
          </View>
        );
      }}
      keyExtractor={(item) => item.name}
      data={this.state.Duplicate_Data_Resturants}
      renderItem={({ item, index }) => (
        <CustomSingleItemScroll
          navigation={this.props.navigation}
          item={item}
        /> 
      )}
    />*/}
          </ScrollView>
        </SafeAreaView>
      );
  }
}
function mapStatetoProps(state) {
  return { cartitem: state.foods.foodList };
}
function dispatchStatetoProps(dispatch) {
  return { emptycart: () => dispatch({ type: "Empty_Cart" }) };
}

export default connect(mapStatetoProps, dispatchStatetoProps)(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0f76de",
    padding: 10,
    justifyContent: "center",
  },
  ListButtons: {
    borderWidth: 0.3,
    borderColor: "#dddddd",
    padding: 5,
    marginRight: 4,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchbarsection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  searchbar: {
    width: "80%",
    flexDirection: "row",
    borderColor: "#dddddd",
    borderWidth: 0.3,
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fcfcfc",
  },
  filterbutton: {
    width: "10%",
    borderColor: "#dddddd",
    borderWidth: 0.3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#fcfcfc",
  },
  likedbutton: {
    width: "10%",
    borderColor: "#dddddd",
    borderWidth: 0.3,

    borderRadius: 4,
    backgroundColor: "#fcfcfc",
    justifyContent: "center",
    alignItems: "center",
  },
  Cartnumbercontainer: {
    position: "absolute",

    right: 10,
    bottom: 10,
    width: 20,
    height: 20,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    backgroundColor: "#0f76de",
  },
  mainCard: {
    width: "95%",
    marginTop: 10,

    alignSelf: "center",

    height: 200,
    borderWidth: 0.3,
    borderColor: "#dddddd",
    borderRadius: 5,
  },
  DiscountCard: {
    marginLeft: 10,
    alignContent: "center",
    height: 60,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 50,
    backgroundColor: "#0f76de",
  },
  ratingCard: {
    padding: 4,
    justifyContent: "flex-end",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F8F8F8",
    width: 50,
    alignSelf: "flex-end",
    top: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",

    width: "100%",
    height: "100%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginLeft: 10,
    color: "#6c6c6c",
  },
  LoginButton: {
    backgroundColor: "#0f76de",
    padding: 8,
    margin: 20,
    borderRadius: 5,
  },
  text: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 1,
    color: "#fff",
  },
});
