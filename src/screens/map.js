import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Title } from 'react-native-paper';
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'react-native-axios';

export default function App(){
 // const[location, setLocation] = useState({coords: { latitude: 33.899129237432014, longitude:35.48556628343314}})  //put coords of lebanon here
  const[location, setLocation] = useState(null)
  const[pins,setPin]= useState(null)
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
     return ('Permission to access location was denied');
    }
    const location = await Location.getCurrentPositionAsync({});
    
    setLocation( location );

    const response = await  axios.get(`${BASE_API_URL}/api/get-businesses`, { headers:{
      'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1MjA1NzEwLCJleHAiOjE2MzUyMDkzMTAsIm5iZiI6MTYzNTIwNTcxMCwianRpIjoiR25XNlNORUY3bG50bzJ0NSIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.TxvJaEKEQWKQwgJgGChRlg3o7_n1iSRpX2MM3-iA-_o}`
    }}
    );
    setPin(response);
  }

  useEffect(()=> {
    getLocationAsync();
  },[])
 
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
         coordinate={{
           latitude: `${item.latitude}`, 
           longitude:`${item.longitude}`
           }}> 
   {/* image={require('../assets/marker.png')} */}
       
           <Callout>
               <View>
                <View style ={styles.bubble}>
                  <Title style ={styles.name}>Business Name</Title> 
                  {/* <Image style ={styles.image}
                  source={require('../')}
                /> */}
                </View>
               </View>
           </Callout>
       </Marker>
       )} /> }
       </MapView>}
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
  
name: {
    fontSize: 16,
    marginBottom: 5,
},

});
