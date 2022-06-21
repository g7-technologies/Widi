import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity,SectionList,Image, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

import Constants from "expo-constants";
const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];
function Item({title}) {
  const [checked,ischecked]=React.useState(false)
  return(
    <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={()=>ischecked(!checked)}>
       {!checked? 
       <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#5c5c5c" />
       :
       <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="#0f76de" />    
       }
    </TouchableOpacity>  
  </View>
  )
  
} 
// Item = ({ title }) => (
  
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );
export default function App() {
  
  
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  item: {
   
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
    
  },
  header: {
    fontSize: 16,
    marginVertical:10,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 10
  }
});