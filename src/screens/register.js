
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity, ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


export default function RegisterBusiness({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [Confirmation_password, setConPassword] = useState(null);
  const [limit, setLimit] = useState(null);
  const [phone, setPhone] = useState(null);
  const [location, setLocation] = useState(null);
  const [name,setName] = useState(null);
  const [token, setToken] =  useState(null);

 async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250], 
      lightColor: '#FF231F7C',
    });
  }
  console.log(token);
  return token;
}
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    registerForPushNotificationsAsync().then(token => setToken(token));
    
  }, []);

const register= async() => {
  try {
    //use the function that gives expotoken then say setToken(response)

    const res = await  axios.post(`${BASE_API_URL}/api/register`, {
      "email" : email,
      "password":password,
      "password_confirmation": Confirmation_password,
      "expoToken":token,
      "user_type_id": "3"
    });  
     
    }catch(err) {
    console.log(email);
    console.log(token);
    console.log(password);
    console.log(Confirmation_password);
    console.log(err);
  }
 }

  return (
    <ScrollView>
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <LinearGradient
        colors={['#000', '#222', '#111']}
        style={styles.container}
      >
        <Text style={styles.welcomeText}>Register Here: </Text>
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
        

        <TouchableOpacity style={styles.loginButton} onPress={()=>register()}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
    </ScrollView>
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