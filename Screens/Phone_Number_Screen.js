
import React, { Component, useEffect} from 'react';
import { StyleSheet, Text,TouchableOpacity, TextInput, View, ScrollView ,Dimensions,Alert,Modal,FlatList,TouchableHighlight,Image} from 'react-native';
import { color } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { fakeServer } from '../Component/CountryCode/Fakeserver';
import {DataProvider,LayoutProvider,RecyclerListView} from 'recyclerlistview';
import Toast from 'react-native-tiny-toast';

const windowwidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'',
      error_message:'',
      countryCode:'+92',
      countryName:'Pakistan',
      modalVisible:false,
      dummy:'',
      //Countrycode states
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }),
      someThingHappen: false,
      fakeData: [],
      loadingMore: false,
      //country states
    };
  }

  layoutProvider = new LayoutProvider(
    index => {
      if (this.state.dataProvider.getDataForIndex(index).type) {
        return this.state.dataProvider.getDataForIndex(index).type;
      } else {
        return 'dufault';
      }
    },
    (type, dim) => {
          dim.width = Dimensions.get('window').width;
          dim.height = 50;
    }
  );

  fetchData = async qty => {
    this.setState({ ...this.state, loadingMore: true });
    const data = await fakeServer(qty);
    if (data === 'done')
      return this.setState({ ...this.state, loadingMore: false });
    this.setState({
      ...this.state,
      dataProvider: this.state.dataProvider.cloneWithRows([
        ...this.state.fakeData,
        ...data,
      ]),
      fakeData: [...this.state.fakeData, ...data],
      loadingMore: false,
    });
  };

  componentDidMount() {
    this.fetchData(20);
  }

  rowRenderer = (type, data, index, extendedState) => {
        if(this.state.countryName==data.name){
          return(
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#0f76de'}}>
    <Text style={{marginVertical:10,marginLeft:20,width:windowwidth/2,color:'white'}}>{data.name}</Text>
    <Text style={{marginVertical:10,marginRight:20,color:'white'}}>{data.number}</Text>
  </View> 
          )
        }
        else{
          return(
          <TouchableOpacity onPress={()=>this.setState({countryCode:data.number,countryName:data.name,modalVisible:false})} style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{marginVertical:10,marginLeft:20,width:windowwidth/2}}>{data.name}</Text>
          <Text style={{marginVertical:10,marginRight:20}}>{data.number}</Text>
        </TouchableOpacity>
          )
        }
  }

  fetchMore = async () => {
    console.log('calling fetchMore');
    await this.fetchData(20);
  };

  ValidatePhoneNumber=()=>{
   console.log(this.state.phone)
    if(this.state.phone==''){
      this.setState({error_message:'Please enter phone number'})
    }else if (isNaN( this.state.phone)) {
      this.setState({error_message:'Number is not Valid'})
        return true;
      }else if (this.state.phone.length<10){
        this.setState({error_message:'Number is not Valid'})
      }else{
        this.setState({error_message:''})
        //api
        var otp = Math.floor(100000 + Math.random() * 900000);
        var number=this.state.countryCode+this.state.phone
        console.log(number)
        console.log(otp);

        const formData = new FormData()
        formData.append('number', number);
        formData.append('otp', otp);
        try{
          fetch('http://www.g7technologies.com/widi/api/customer_send_otp', {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            body:formData
          })
          .then((response) => response.json())
          .then((responseJson) => {
            
          this.props.navigation.navigate('phoneauth',{'phone':this.state.countryCode+this.state.phone,'otp':otp})

            console.log(responseJson)
          
          })
          .catch((error) =>{});
        }catch(e){}

      }
    } 

  render() {
    if (!this.state.dataProvider._data.length) return null;
    return (
 
<View style={styles.container}>
<ScrollView>
  <View style={{height:190}}/>
    <Text style={{marginLeft:10,color:'#000000'}}>Enter your mobile number</Text>
  <View style={{flex:1,flexDirection:'row',}}>
    <TouchableOpacity  onPress={() =>this.setState({modalVisible:true})} style={{marginLeft:20,width:windowwidth/4,marginVertical:10,height:windowheight/15,borderColor:'#8c8c8c',borderRadius:5,borderWidth:1,flexDirection:'row',alignItems:'center'}}>
      <Text numberOfLines={1} style={{marginLeft:3,width:windowwidth/6}}>{this.state.countryName}</Text>
      <MaterialIcons style={{width:windowwidth/15}} name="arrow-drop-down" size={30} color="black" />
    </TouchableOpacity>
    <View style={{ width:windowwidth/1.7,borderWidth:1,height:windowheight/15, margin:10,borderRadius:5,fontWeight:'bold',borderColor:'#8c8c8c',flexDirection:'row',alignItems:'center'}}>
      <Text style={{fontWeight:'bold',marginLeft:5,paddingHorizontal:10}}>{this.state.countryCode}</Text>
      <TextInput style={{paddingHorizontal:5}} keyboardType='decimal-pad' maxLength={10} placeholder='Phone Number' placeholderTextColor={'#8c8c8c'} onChangeText={(phone)=>this.setState({phone:phone})} />
    </View>
  </View>
  
  <Text style={{color:'red',textAlign:'center',fontWeight:'500'}}>{this.state.error_message}</Text>
  <TouchableOpacity onPress={()=>this.ValidatePhoneNumber()}  style={styles.LoginButton}>
        <Text style={styles.text}>Next</Text>
  </TouchableOpacity>
  <Text  style={{...styles.text,textAlign:'center',fontFamily:'poppin',marginVertical:40,color:'#3c3c3c',marginHorizontal:5}}>By tapping continue, in you are agree to Widi <Text style={{color:'#3c3c3c',fontFamily:'poppinbold'}}>Terms and Services and Privacy Policy</Text> </Text>
  <Text style={{...styles.text,fontFamily:'poppinbold',marginVertical:40,color:'#3c3c3c',textAlign:'center'}}> Have an account? <Text onPress={()=>this.props.navigation.navigate('Login')} style={{color:'#3badfb'}}>Login</Text></Text>
 
  <Modal
  animationType='fade'
  transparent={true}
  visible={this.state.modalVisible}
  // onRequestClose={() => {
  //   Alert.alert('Modal has been closed.');
  // }}
  >
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <View style={{height:50,alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:7}}>
        <Text style={styles.modalText}>Select our country</Text>
        <TouchableOpacity onPress={()=>{ this.setState({modalVisible:!this.state.modalVisible});}}>
          <Entypo name="circle-with-cross" size={30} color="black" />
        </TouchableOpacity>
      </View>     
      <View style={{height:windowheight-150}}>
     
          <RecyclerListView
          dataProvider={this.state.dataProvider}
          layoutProvider={this.layoutProvider}
          rowRenderer={this.rowRenderer}
          extendedState={{ someThingHappen: this.state.someThingHappen }}
          onEndReached={this.fetchMore}
          onEndReachedThreshold={0.5}
          renderFooter={() =>
            this.state.loadingMore && (
              <Text
                style={{ padding: 10, fontWeight: 'bold', textAlign: 'center' }}
              >
                Loading
              </Text>
            )
          }
        />
        
      </View>
    </View>
  </View>
</Modal>
</ScrollView>
</View>
    );
  }
}

export default App; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    justifyContent:'center'
    
  },
  text:{
    fontWeight:'600',
    fontSize:15,
    textAlign:'center',
    letterSpacing:1,
    color:'#fff'
  },
  LoginButton:{
    backgroundColor:'#0f76de',
    padding:10,
    margin:20,
    borderRadius:5
  },
  
  input:{
    width:windowwidth/1.3,
    borderWidth:1,
    height:windowheight/15,
    // justifyContent:'center',
    // padding:12,
    margin:10,
    borderRadius:5,
    fontWeight:'bold',
    borderColor:'#8c8c8c'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height:windowheight-100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:windowwidth/1.2,
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
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
fontSize:17,
    
    textAlign: 'center',
  },
});