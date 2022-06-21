import * as React from 'react';
import { Platform, Animated,TouchableOpacity, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('screen');
import image1 from '../assets/undraw_cooking_lyxy.png'
import image2 from '../assets/undraw_order_ride_xjs4.png'
import image3 from '../assets/undraw_heavy_box_agqi.png'
// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#fff', '#fff', '#fff', '#B98EFF'];
const DATA = [
  {
    "key": "0",
    "title": "Order & Eat Food",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum imperdiet urna, sed dapibus lectus iaculis in",
    "image": image1
  },
  {
    "key": "1",
    "title": "Book Ride & Escorts",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum imperdiet urna, sed dapibus lectus iaculis in",
    "image": image2
  },
  {
    "key": "2",
    "title": "Send Logistics",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum imperdiet urna, sed dapibus lectus iaculis in",
    "image": image3
  },
  
]

const Indicator=({scrollX})=>{
  return(
  <View style={{flexDirection:'row',position:'absolute',bottom:200}}>
    
    {DATA.map((_,i)=>{
      const inputRange=[(i-1)*width,i*width,(i+1)*width];
      const scale=scrollX.interpolate({
        inputRange,
        outputRange:[0.8,1.4,0.8],
        extrapolate:'clamp'
      })
      const opacity=scrollX.interpolate({
        inputRange,
        outputRange:[0.6,0.9,0.6],
        extrapolate:'clamp'
      })
      const widthis=scrollX.interpolate({
        inputRange,
        outputRange:[20,30,20],
        //extrapolate:'clamp'
      })
      return(
      <Animated.View key={`indicator-${i}`} 
      
      style={{
        width:widthis,
        margin:10,
        height:10,
        borderRadius:10,
        opacity,
        backgroundColor:'#0072e5',
        transform:[
          {scale}
        ]
      }}/>)
    })}
  </View>
  )
}




export default function App({navigation}) {

  async function LoginScreen(){
  navigation.replace('Login')
    await AsyncStorage.setItem('toLoginScreen','true')
  }
  const scrollX=React.useRef(new Animated.Value(0)).current
  const [loaded, error] = Font.useFonts({ 
    poppin:require('../assets/Poppins/Poppins-Regular.ttf'),
    poppinbold:require('../assets/Poppins/Poppins-SemiBold.ttf')
   });
  const [number,addnumber]=React.useState(0)
  if(!loaded){
    return <View style={{justifyContent:'center',alignItems:'center',flex:1}}><Text>Loading App Please wait.....</Text></View>;
  }
  return (
    <View style={styles.container}>
 
  
      <Animated.FlatList
       data={DATA}
       
       horizontal
        showsHorizontalScrollIndicator={false}
       pagingEnabled
       scrollEventThrottle={16}
        onScroll={Animated.event(
        [ 
          {
            nativeEvent:{
              contentOffset:{
                x:scrollX   
              }
            }
          }
        ],
      {useNativeDriver:false}
      )}
       keyExtractor={item=>item.key}
       renderItem={({item,index})=>{
         return(
          <View style={{width:width,alignItems:'center'}}>
            <View style={{flex:0.5}}>
              <Image 
                source={item.image} 
                style={{
                
                  width:width/3,
                  height:height/2,
                  resizeMode:'contain'
                }}
              />
            </View>
            <View >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
         )
       }}
       
      />
      <Indicator scrollX={scrollX}/>
     
       
    
      
      
      <TouchableOpacity onPress={()=>LoginScreen()}  style={styles.Nextbutton}>
        <Text style={styles.TextColor}>Skip</Text>
      </TouchableOpacity>


      {/* <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.skip}>
        <Text style={{...styles.TextColor,color:'black',fontFamily:'poppin',fontWeight:'100'}}>Skip</Text>
      </TouchableOpacity>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
    justifyContent: 'center',
  },
  title:{
    fontSize:20,
    textAlign:'center',
    fontFamily:'poppinbold', 
       margin:5,
    color:'#0b78e6'
   
  },
  description:{
    fontFamily:'poppin',
    textAlign:'center',
    fontSize:12,
    
    color:'#5c5c5c',
    margin:5,
    padding:10
    
  },
  Nextbutton:{
    backgroundColor:'#0072e5',
    width:150,
    padding:10,
    borderRadius:2,
    position:'absolute',
    bottom:120
  },
  TextColor:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold'
  },
  skip:{
    
    width:150,
    padding:10,
    borderRadius:2,
    position:'absolute',
    bottom:60
  },
});