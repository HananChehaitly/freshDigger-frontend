import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function App(){
  const[location, setLocation] = useState({coords: { latitude: 33.899129237432014, longitude:35.48556628343314}}  //put coords of lebanon here
  )

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
     return ('Permission to access location was denied');
    }
    const location = await Location.getCurrentPositionAsync({});
    
    setLocation( location );
  }

  useEffect(()=> {
    getLocationAsync();
  },[])
 
    return (
     
      <View style={styles.container}>
         <MapView
         showsUserLocation
        style ={styles.map}
        region={{ latitude: location.coords.latitude , longitude: location.coords.longitude , latitudeDelta: 0.022, longitudeDelta: 0.0421 }}
       />
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
});
