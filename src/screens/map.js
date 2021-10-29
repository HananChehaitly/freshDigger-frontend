import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Button, ActivityIndicator, DynamicColorIOS} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Title } from 'react-native-paper';
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'react-native-axios';
import { colors} from '../constants/palette';
import MyButton from '../components/ButtonCustom';

export default function App({navigation}){
  const[location, setLocation] = useState(null)
  const[pins,setPin]= useState(null)

  
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
     return ('Permission to access location was denied');
    }
    const currentlocation = await Location.getCurrentPositionAsync({});
     
      setLocation( currentlocation );

      const response = await  axios.get(`${BASE_API_URL}/api/get-businesses`, { headers:{
      'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1NDYyNTM3LCJleHAiOjE2MzU0NjYxMzcsIm5iZiI6MTYzNTQ2MjUzNywianRpIjoiTmlIeWJTNTkzemxvQWtnMyIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.4BaD4miwsLYFbwjdRXygSGuZl9LB1xkXYgw2-FnFrP8`
      }} 
    );
    // console.log(response.data);
    setPin(response);  
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
  const checkProfile = (id) =>{
    {navigation.navigate('Profile', { userId: id })}
  }
     
  const checkRate = () =>{
    console.log('hiii')
    {navigation.navigate('Rate')}
  }


  return (
    <View style={styles.container}> 
    {location && <MapView
        showsUserLocation
        style ={styles.map}
        region={{ latitude: location.coords.latitude , longitude: location.coords.longitude , latitudeDelta: 0.022, longitudeDelta: 0.0421 }}
        >
   {pins && <FlatList
      data = {pins.data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Marker 
        color = "pink"
         coordinate={{
           latitude: `${item.latitude}`,  
           longitude: `${item.longitude}`   
          }}> 
   {/* image={require('../assets/marker.png')} */}
           <Callout  onPress ={()=>{checkProfile(item.id);}}>
             <View style={{padding: 2}}>
              <Text>Business Name</Text>
              <Text>Business Name</Text>
              </View>
             </Callout>   
        </Marker>  
       )} /> }
       </MapView>
    }
    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: 10, //for center align
            width: '55%' //for align to right

        }}
    >
      <MyButton text="Check Current Rate"  onPressFunction = {() => checkRate()}/>
      
    </View>
    </View>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  marker: {
    width: 30,
    height: 30,
  },
  bubble: {
    flexDirection:'row',
    alignSelf:'flex-start',
    backgroundColor:'#fff',
    borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 0.5,
    padding:15,
    width: 150,
  },
  
btn: {
   
  width: "100%",
  borderRadius: 25,
  height: 30,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 60,
  backgroundColor: "#f0f",
  marginStart: 15,
},


});
