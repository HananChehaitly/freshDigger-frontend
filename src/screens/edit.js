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
  Button,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function edit({navigation}) {
    
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [Confirmation_password, setConPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [str, setStr] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      setStr(result.base64);
      setImage(result.uri); 
    }
  };

  const save = async () => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/add-picture`, {
          "image" :str
        },
        {headers:{
          'Authorization' : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
          }}
      );      //await AsyncStorage.setItem('@image', res.data['p_path']);
      
    } catch(err) {
      console.log(err); 
    }
  }

 useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  });
  StatusBar.setBarStyle('light-content', true);
}, []);

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
        <Text style={styles.welcomeText}>Edit Profile here</Text>
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
      <View style={{marginTop:25}}>
        <Button title="Pick an image from camera roll" onPress={pickImage}  color={colors.primary}/>
        {image && <Image source={{ uri: image }} style={styles.image}/>}
      </View> 
       
        <TouchableOpacity style={styles.loginButton} onPress={save}>
          <Text style={styles.loginButtonText}>Save Changes</Text>
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
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 15,
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