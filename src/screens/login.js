
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

export default function loginScreen({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

const login= async() => {
  try {
    
    const res = await  axios.post(`${BASE_API_URL}/api/login`, {
      "email" : email,
      "password":password
    });
     await AsyncStorage.setItem('@user_type', ''+res.data['user']['user_type_id']); 
     await AsyncStorage.setItem('@storage_Key', res.data['access_token']);
    const user_type = await AsyncStorage.getItem('@user_type')
    console.log(res.data['user']['user_type_id'])
    if(user_type == 3){
      navigation.navigate('BottomTab');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTab' }],
        });
    }
     else if(user_type == 2){
      navigation.navigate('BottomTabBus');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabBus' }],
        });
    }
    else if(user_type == 1){
      navigation.navigate('BottomTabAdmin');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabAdmin' }],
        });
    }
    }catch(err) {
    console.log(err);
  }
  console.log()
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
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.loginText}>Login</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={()=>login()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
 
        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}>
            <Text style={[styles.signUpText, { color: colors.primary }]}>
              {' Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 30,
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
  
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#808e9b',
    fontSize: 20,
    fontWeight: '500',
  },
});