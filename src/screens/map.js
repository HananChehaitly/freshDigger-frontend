import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions,  ScrollView,TouchableOpacity, Button, ActivityIndicator, Pressable, TextInput, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Title } from 'react-native-paper';
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'react-native-axios';
import { colors} from '../constants/palette';
import MyButton from '../components/ButtonCustom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pin from 'react-native-vector-icons/AntDesign';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import RNModal from 'react-native-modal';

export default function App({navigation}){
  const[location, setLocation] = useState(null)
  const[pins,setPin]= useState(null)
  const [token, setToken] =useState( null );
  const[time,setTime] =useState(null);
  const[showroad, setRoad]=useState(false);
  const[coordinates, setCoordinates]=useState(null);
  const [name, setName] = useState(null);
  const [rnmodaVisible, setRnmodaVisible] = useState(false);
  const [amount, setAmount] = useState(null);

  const getLocationAsync = async () => {
      try{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
     return ('Permission to access location was denied');
    }
    const currentlocation = await Location.getCurrentPositionAsync({});
     
      setLocation( await currentlocation );

    const response = await  axios.get(`${BASE_API_URL}/api/remaining-allowances`, 
      {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }} 
    );
      setPin( await response);  
  } 
    catch(e){
    console.log(e);
}
}
  const search = async() => {
    console.log(name);
    try{
    const response = await  axios.post(`${BASE_API_URL}/api/search-businesses`, 
    {
      "name": name
    },
    {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }} 
    );
      setPin( await response);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=> {
    getLocationAsync();
  },[])

  if(!location){
   return (
     <View
     style = {{
       flex:1,
       alignItems: 'center',
       justifyContent: 'center',
     }}>
      <ActivityIndicator size='large' color={colors.primary_light}/>
     </View>
   ) ;
  }
  const checkProfile = (id, time) =>{
    {navigation.navigate('Profile', { userId: id , duration: time})}
  }
     
  const checkRate = () =>{
    {navigation.navigate('Rate')}
  }

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAa7Ld1wuUthv8BSZZ8rpg00D6s8bXDjaw';
  
  const viewDirections = (lat, long) =>{
   setCoordinates({
    latitude: lat,
    longitude: long,
  })
  setRoad(true)
  }
  
  const filter = async() => {
    
      const response = await  axios.post(`${BASE_API_URL}/api/filter`, 
      {
        "amount": amount
      }, 
      {headers:{
          Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
        }} 
      );
        setPin( await response);
        setRnmodaVisible(false); 
      
  }

  return (  
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
    <View style={styles.container}> 
    {location && 
      <MapView
        showsUserLocation
        showroad
        style ={styles.map}
        region={{ latitude: location.coords.latitude , longitude: location.coords.longitude , latitudeDelta: 0.022, longitudeDelta: 0.0421 }}
        >        
    {pins &&
            pins.data.map((item) => {
              return (
                <Marker
                  // pinColor={colors.primary_light}
                  key={item.id}
                  coordinate={{
                    latitude: Number(item.latitude),
                    longitude: Number(item.longitude),
                   }}
                   onPress={() => viewDirections(Number(item.latitude), Number(item.longitude))}
                   > 
                  <Callout onPress={() => {checkProfile(item.id,{time}); }}
                    style={styles.callout}>
                      <View style={{flexDirection:'row', alignItems: "center",marginBottom:10, marginLeft:3}}>
                          <Text style={styles.title}>{item.name}</Text>
                          <Pin name="caretright" color={colors.primary_light} size={15}/>
                      </View> 
                      <Text style={{fontSize:12}}>Buying Allowance: {item.allowance}$</Text>                    
                  </Callout>
                </Marker>  
              ); 
            })}
            {showroad && <MapViewDirections     
                          origin={{latitude: location.coords.latitude , longitude: location.coords.longitude}}
                          destination={coordinates}
                          apikey={GOOGLE_MAPS_APIKEY}
                          strokeWidth={4}
                          strokeColor={colors.primary_light}
                          onReady= {result=>{
                            setTime(result.duration)
                            console.log(time)
            }}
            />
            }
    </MapView>
    }
    <View style={styles.searchBox}>
          <TextInput 
          placeholder="Search here"
          placeholderTextColor="#808080"
          autoCapitalize="none" 
          style={{flex:1,padding:0}}
          onChangeText={(name) => setName(name)}
          />
        <TouchableOpacity onPress={() => search()}> 
              <Ionicons name="ios-search" size={20}  color={colors.primary_light}/> 
        </TouchableOpacity>
    </View>
    
    <View
        style={{ 
            position: 'absolute',//use absolute position to show button on top of the map
            bottom: 20, //for center align
            width: '55%' //for align to right
        }} 
    >
    
    <MyButton text="Check Current Rate"  onPressFunction = {() => checkRate()}/>
    </View>
    <View style={{position: 'absolute', top: 120, right:10}}>
    <TouchableOpacity onPress={()=>{setRnmodaVisible(true)}}  style={styles.btnClickContain}>
      <View style={styles.btnContainer}>
        <Filter name="filter-plus" size={35} color="white"/> 
      </View> 
    </TouchableOpacity>
    </View>

    <RNModal
          isVisible={rnmodaVisible}
          animationIn= 'zoomIn'
          animationOut= 'zoomOut'
          onBackdropPress={() => setRnmodaVisible(false)}
          ><View>
          <View style= {[styles.input,{fontSize:18, fontWeight: '700'}]}>
          <TextInput
          placeholder="Enter the amount in $"
          onChangeText={(amount) => setAmount(amount)}
          />
          </View> 
          <View style={{marginTop:20, marginHorizontal:80}}>
            <MyButton style={{marginHorizontal:40}} text="Send" onPressFunction = {() =>  filter()}/>
          </View>
        </View> 
    </RNModal>

    </View>
    </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
 map:{ 
     width: Dimensions.get('window').width,
 height: Dimensions.get('window').height,
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
 
 callout: {
  //flexDirection:'row',
  backgroundColor: "white",
  borderRadius: 4,
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
},
 title: {
    color: "black",
    fontSize: 14,
    lineHeight: 18,
    //textDecorationLine: 'underline'
    //flex: 1,
    //fontFamily: 
 },
   searchBox: {
  position:'absolute', 
  flexDirection:"row",
  top:10,
  backgroundColor: '#fff',
  width: '90%',
  alignSelf:'center',
  borderRadius: 5,
  padding: 10,
  shadowColor: '#ccc',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
},
input: {
        position:'absolute', 
        flexDirection:"row",        
        bottom:107,
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        },

btnClickContain: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  backgroundColor: colors.primary,
  borderRadius: 5,
  padding: 2,
  marginTop: 5,
  marginBottom: 5,
},
btnContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  //borderRadius: 0, 
}

});
