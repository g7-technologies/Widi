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
  AntDesign
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { basepath } from "../BasePath/Basepath";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export default function ManageCard({ navigation }) {
  const [data, cardlist] = useState([]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //    // Get_Address();
  //   },[Address]);
  

    
  // }, []);
  React.useEffect(()=>{
    GetUserdata()
  },[])
  async function GetUserdata(){
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    
    GetCreditCardList(customerid.id)
}
  function GetCreditCardList(id){
    const formData = new FormData();
    formData.append("customer_id", id);
   
    // formData.append("name",holdername );
    try {
      fetch(`${basepath}cards_list`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('##################')
          //  console.log(responseJson)
            cardlist( responseJson.customer_card_details)
           console.log('##################')
          if (!responseJson.error == true) {
        //    alert('success')
          } else {
            alert("Some error ");
          }
        })
        .catch((error) => {});
    } catch (e) {}
  }   
  async function Delete_Card(id) {
    const formData = new FormData();

    formData.append("customer_id", "2");
    formData.append("card_id", id);
    try {
      fetch(`${basepath}delete_card`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('*********************')
           console.log( responseJson)
          console.log('*********************')

          if (!responseJson.error == true) {
            // console.log(responseJson)
            cardlist(responseJson.customer_card_details);
           // console.log(responseJson);
          } else {
            alert("Some error ");
          }
        })
        .catch((error) => {});
    } catch (e) {}
  }
  function MaskNumber(n){
    var number = String(n)
    var length = number.length-6
    var middle = '*'.repeat(length)

    // var str=number.substr(0,4)
    return(
            <Text>{number[0]+number[1]+number[2]+number[3]+middle+number[number.length-4]+number[number.length-3]+number[number.length-2]+number[number.length-1]}</Text>
    )
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
          <Text style={styles.textcolor}>Manage Card</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ backgroundColor: "#fff" }}
        // keyExtractor={item=>item.id.toString()}
        
        data={data}
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
              width:'90%',
              alignSelf:'center',
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="creditcard" size={18} color="#0f76de" />
              <View style={{ marginLeft: 10,padding:8,flexDirection:'row' }}>
                {/* <Text style={{ fontFamily: "poppinbold" }}>{item.title}</Text> */}
               {MaskNumber(item.card_number)}
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
                      onPress: () => Delete_Card(item.id),
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
    margin: 20,
    borderRadius: 5,
  },
  text: {
    fontFamily: "poppinbold",
    fontSize: 15,
    textAlign: "center",

    color: "#fff",
  },
  
});
