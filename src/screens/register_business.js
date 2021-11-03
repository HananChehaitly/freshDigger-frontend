import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';

export default function RegisterBusiness({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [Confirmation_password, setConPassword] = useState(null);
  const [limit, setLimit] = useState(null);
  const [phone, setPhone] = useState(null);
  const [location, setLocation] = useState(null);
  const [name,setName] = useState(null);


  const getLocation = async() => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
     return ('Permission to access location was denied');
    }
    const currentlocation = await Location.getCurrentPositionAsync({});
     
      setLocation( await currentlocation );
 }

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    getLocation();
  }, []);

const register= async() => {
  try {
    const res = await  axios.post(`${BASE_API_URL}/api/register`, {
      "email" : email,
      "password":password,
      "latitude": location.coords.latitude ,
      "longitude": location.coords.longitude,
      "password_confirmation": Confirmation_password,
      "phone_number":phone,
      "name": name,
      "weekly_limit": limit,
      "user_type_id": "2"
    },
    {headers:{
        'Authorization' : `Bearer  ${await AsyncStorage.getItem('@storage_Key')}` 
    }}
    );  
     
    }catch(err) {
    //console.log(email);
    console.log(password);
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
     console.log(Confirmation_password);
     console.log(limit)
    console.log(err);
  }
 }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <LinearGradient
        colors={['#000', '#222', '#111']}
        style={styles.container}
      >
        <Text style={styles.welcomeText}>Register Business Profile: </Text>
        <TextInput
          placeholder='Email Address'
          placeholderTextColor='#808e9b'
          style={styles.input}
          autoCompleteType='email'
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText ={(email) => setEmail(email)}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#808e9b'
          style={styles.input}
          secureTextEntry={true}
          textContentType='password'
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          placeholder='Confirm Password'
          placeholderTextColor='#808e9b'
          style={styles.input}
          secureTextEntry={true}
          textContentType='password'
          onChangeText={(password) => setConPassword(password)}
        />
        <TextInput
          placeholder='Name'
          placeholderTextColor='#808e9b'
          style={styles.input}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          placeholder='Phone Number'
          placeholderTextColor='#808e9b'
          style={styles.input}
          onChangeText={(phone) => setPhone(phone)}
        />
        <TextInput
          placeholder='Weekly Limit'
          placeholderTextColor='#808e9b'
          style={styles.input}
          onChangeText={(limit) => setLimit(limit)}
        />
  

        <TouchableOpacity style={styles.loginButton} onPress={()=>register()}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    alignSelf: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#B33771',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: colors.primary ,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 30,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  
 
});