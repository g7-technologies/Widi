import React from 'react';
import { StyleSheet,FlatList,Image,TouchableOpacity, Text, View } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import FAQ from '../Component/FAQ'
import { ScrollView } from 'react-native-gesture-handler';
 
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            privacy_policy:''
        }
    }

    componentDidMount(){
        this.PrivacyPolicy()
    }
    PrivacyPolicy=()=>{
        
      
          
          try{
            fetch(`${basepath}privacy_policy`, {
              method: 'POST',
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            //   body:formData
            })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(1)
              if(!responseJson.error==true){
                this.setState({privacy_policy:responseJson.faqs})
                
              }else{
                  alert('Error')
              }
            // this.setState({FAQ:responseJson.data})
                
            })
            .catch((error) =>{});
          }catch(e){}
        }

  render() {
    return (

    <>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{flexDirection:'row',alignItems:'center',margin:5,marginLeft:20,}}>
                {Platform.OS=='ios'?
                    <Ionicons name="ios-arrow-back" style={{top:4}} size={24} color="#fff" />
                    :
                    <Ionicons name="md-arrow-back" style={{top:4}} size={24} color="#FFF" />
                }
                <Text style={styles.textcolor}>Terms</Text>

            </TouchableOpacity>
        </View>
       <ScrollView style={{flex:1}}>
            <Text style={{margin:10,fontFamily:'poppinbold'}}>Terms and Condition</Text>
            <Text style={{textAlign:'justify',padding:10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel sem quam. Duis nec sapien quis nulla facilisis vestibulum. Proin in aliquet nibh. Maecenas tincidunt mauris et enim accumsan mattis. Fusce nec consequat nunc. Vestibulum molestie arcu sit amet purus interdum dapibus. Sed tempor ipsum non rutrum rutrum. Fusce et mauris enim. Ut sodales libero mi, in dictum sem laoreet vitae. Quisque efficitur massa ac massa ultricies accumsan. Vestibulum a tempus mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</Text>
       </ScrollView>
       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PricavyPolicy')} style={styles.LoginButton}>
         <Text style={styles.text}>Privacy Policy</Text>
       </TouchableOpacity>
        
    </>
    );
  }
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
   
  },
  textcolor:{
   fontFamily:'poppinbold',
    color:'#fff',
    top:4,
    marginLeft:30
  },
  LoginButton: {
    backgroundColor: "#0f76de",
    width: 200,
    padding: 6,
    margin: 20,
    borderRadius: 5,
    alignSelf:'center'
  },
  text: {
    fontFamily: "poppinbold",
    fontSize: 15,
    textAlign: "center",

    color: "#fff",
  },
});