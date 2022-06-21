import React from 'react';
import { StyleSheet,FlatList,Image,TouchableOpacity, Text, View } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { basepath } from "../BasePath/Basepath";
import FAQ from '../Component/FAQ'
 
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            FAQ:[]
        }
    }

    componentDidMount(){
        this.FAQ_DATA()
    }
     FAQ_DATA=()=>{
        
      
          
          try{
            fetch(`${basepath}get_faqs`, {
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
                this.setState({FAQ:responseJson.faqs})
                
              }else{
                  alert('Error')
              }
            // this.setState({FAQ:responseJson.data})
alert(responseJson.json())
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
                <Text style={styles.textcolor}>FAQ</Text>

            </TouchableOpacity>
        </View>
       <View style={{flex:1,backgroundColor:'#fff'}}>
           <Image style={{width:120,alignSelf:'center',marginVertical:5,height:120}} source={require('../assets/Question_Monochromatic.png')}/>
           <Text style={{textAlign:'center',fontFamily:'poppinbold'}}>FAQ</Text>
        <FlatList
            
            contentContainerStyle={{marginHorizontal:10}}
            data={this.state.FAQ}
            renderItem={({ item, index }) => (
                <View>
                <FAQ item={item}/>
                </View>
            )}
        />
        <Text style={{textAlign:'center',marginVertical:10}}>For more info please see <Text onPress={()=>this.props.navigation.navigate('PricavyPolicy')} style={{color:'#0f76de'}}>Privacy Policy</Text></Text>
       </View>
        
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
});