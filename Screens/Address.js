import React, { useState } from "react";
import {
  ScrollView,
  Platform,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { basepath } from "../BasePath/Basepath";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-tiny-toast";

const dataArray = [
  {
    title: "Pizza",
    active: 0,
    backgroundColor: "#0f76de",
    color: "#fff",
    key: "pizza",
  },
  // { title: 'Fast Food',active:1,backgroundColor:'#0f76de',color:'#fff', key: 'fast food' },
  // { title: 'Chicken Grill',active:2, key: 'Chicken Grill' },
  // { title: 'Fish',active:3, key: 'Fish' },
  // { title: 'Pizza',active:0,backgroundColor:'#0f76de',color:'#fff', key: 'pizzas' },
  // { title: 'Fast Food',active:1,backgroundColor:'#0f76de',color:'#fff', key: 'fast sfood' },
  // { title: 'Chicken Grill',active:2, key: 'Chickens Grill' },
  // { title: 'Fish',active:3, key: 'Fiash' }
];
export default function Address({ navigation }) {
  const [Address, UserAddress] = useState([]);
  const [customerid, getcustomerid] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //Get_Address();
      GetUserdata()
    });
  
  return unsubscribe;
    
  }, []);

  async function GetUserdata(){
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    var c=customerid.id
    Get_Address(customerid.id)
    getcustomerid(c)
  }
  async function Get_Address(id) {
    const formData = new FormData();

    formData.append("customer_id", id);
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
            console.log(responseJson);
          } else {
            Toast.show(responseJson.error_msg,{position:Toast.position.TOP})
            // alert("Some error " + responseJson.error_msg);
          }
        })
        .catch((error) => {});
    } catch (e) {}
  }
  async function Delete_Address(id) {
    const formData = new FormData();

    formData.append("customer_id", customerid);
    formData.append("address_id", id);
   const loading= Toast.showLoading()
    try {
      fetch(`${basepath}customer_delete_address`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log( responseJson)
           Toast.hide(loading)
          if (!responseJson.error == true) {
            UserAddress(responseJson.address);
            // console.log(responseJson);
          } else {
            Toast.show(responseJson.error_msg,{position:Toast.position.TOP})

            // alert("Some error " + responseJson.error_msg);
          }
        })
        .catch((error) => {});
    } catch (e) {}
  }
  return (
    <>
      <View style={styles.header}>
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
      <FlatList
        style={{ backgroundColor: "#fff" }}
        keyExtractor={item=>item.id.toString()}
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
              <TouchableOpacity
                onPress={() => navigation.navigate("TakeAddress")}
                style={styles.LoginButton}
              >
                <Text style={styles.text}>Add Adress</Text>
              </TouchableOpacity>

              <Text style={{ color: "#dddddd", fontSize: 12 }}>
                All of Your Information will be kept secerate
              </Text>
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
                  {item.address.length>40?item.address.substr(0,40)+'...':item.address}
                </Text>
              </View>
            </View>

            <MaterialCommunityIcons
              onPress={() =>
                Alert.alert(
                  "Alert",
                  "Are you sure you want to delete?",
                  [
                    {
                      text: "Delete",
                      onPress: () => Delete_Address(item.id),
                      style: "destructive",
                    },
                    { text: "Cancel" },
                  ],
                  { cancelable: false }
                )
              }
              name="delete-circle-outline"
              size={20}
              color="#ff0000"
            />
          </View>
        )}
      />
      {Address.length==0?null:
      <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TakeAddress")}
        style={styles.LoginButton}
      >
        <Text style={styles.text}>Add Adress</Text>
      </TouchableOpacity>
      </View>
      }
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    justifyContent: "center",
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
    width: 200,
    padding: 6,
   marginVertical:5,
    borderRadius: 5,
  },
  text: {
    fontFamily: "poppinbold",
    fontSize: 15,
    textAlign: "center",

    color: "#fff",
  },
});
