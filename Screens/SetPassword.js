import React, { useState ,useEffect} from "react";
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
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { basepath } from "../BasePath/Basepath";
import { ActivityIndicator } from "react-native-paper";
export default function App({ navigation }) {
  const [securetext, notsecure] = useState(true);
  const [secureNewtext, notNewsecure] = useState(true);
  const [secureRetypetext, notRetypesecure] = useState(true);

  const [oldpassword, old_password] = React.useState("");
  const [newpassword, new_password] = React.useState("");
  const [retypepassword, retype_password] = React.useState("");
  const [error_message, showerror] = React.useState("");
  const [showindicator,indicatorcondition]=useState(true)
  const [userid,getid]=useState(null)
  useEffect(()=>{
    GetUserdata()
  })
  async function GetUserdata(){
    var userdata=await AsyncStorage.getItem('USER_DATA')
    var customerid=JSON.parse(userdata)
    getid(customerid.id)
  }
  function PasswordValidation(params) {
   if (newpassword.length < 6) {
      showerror("New Password length must be at least 6 digit");
    } else if (newpassword!= retypepassword) {
      showerror("Password and retype password does not match");
    }else{
      UpdatePassword()
    }
  }

  async function setLogin(user){
    
    
    
    AsyncStorage.setItem('USER_DATA', JSON.stringify(user), (err)=> {
     if(err){
         console.log("an error");
         throw err;
     }
         console.log("success");
         indicatorcondition(true)
     }).catch((err)=> {
         console.log("error is: " + err);
     });
   }
 function  UpdatePassword (){
     console.log(1)
     indicatorcondition(false)
      const formData = new FormData()
      formData.append('customer_id', userid);
      formData.append('password', newpassword);
      
      
  
      
      try{
        fetch(`${basepath}customer_set_password`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
          setLogin(responseJson.user)
         
        })
        .catch((error) =>{});
      }catch(e){}
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
          <Text style={styles.textcolor}>Set Password</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{ height: 90 }}></View>

        <Text style={styles.heading_text}>Set Password </Text>
        
        <View
          style={{
            flexDirection: "row",
            borderColor: "#8c8c8c",
            borderWidth: 1,
            alignItems: "center",
            margin: 10,
            padding: 2,
            borderRadius: 5,
          }}
        >
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="New Password"
              onChangeText={(newpassword) => new_password(newpassword)}
              secureTextEntry={secureNewtext}
              placeholderTextColor={"#8c8c8c"}
              style={{ ...styles.input, padding: 0, borderWidth: 0 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => notNewsecure(!secureNewtext)}
            style={{ width: 50 }}
          >
            {!secureNewtext ? (
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/eye.png")}
              />
            ) : (
              <Feather name="eye" size={20} color="#8c8c8c" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#8c8c8c",
            borderWidth: 1,
            alignItems: "center",
            margin: 10,
            padding: 2,
            borderRadius: 5,
          }}
        >
          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="Re-type new Password"
              onChangeText={(retypepassword) => retype_password(retypepassword)}
              secureTextEntry={secureRetypetext}
              placeholderTextColor={"#8c8c8c"}
              style={{ ...styles.input, padding: 0, borderWidth: 0 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => notRetypesecure(!secureRetypetext)}
            style={{ width: 50 }}
          >
            {!secureRetypetext ? (
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/eye.png")}
              />
            ) : (
              <Feather name="eye" size={20} color="#8c8c8c" />
            )}
          </TouchableOpacity>
        </View>
<Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{error_message}</Text>
        {showindicator?
        <TouchableOpacity onPress={()=>PasswordValidation()} style={styles.LoginButton}>
          <Text style={styles.text}>Update</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity  style={styles.LoginButton}>
          <ActivityIndicator color='#fff'/>
        </TouchableOpacity>
        }

        {Platform.OS == "ios" ? <View style={{ height: 250 }} /> : null}
      </ScrollView>
    </>
  );
}
//colors on focus #97c6f4
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
    padding: 12,
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
