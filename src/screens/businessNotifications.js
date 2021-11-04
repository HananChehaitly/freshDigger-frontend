import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  StatusBar,
  Image,
  Text,
  TouchableOpacity, TextInput,
  Alert,
  View,
  Button,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Fontisto';
import { Constants } from 'expo-constants';
import *  as Notifications from 'expo-notifications';
import RNModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/palette';
import MyButton from '../components/ButtonCustom';

export default function NotificationsBus({ navigation }){
    StatusBar.setBarStyle('dark-content');

    navigation.setOptions({
      title: 'Notifications',
      headerLeft: () => null,
    });

  const [notifications, setNotifications] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [rnmodaVisible, setRnmodaVisible] = useState(false);
  const [rate, setRate] = useState(null);
  const [id, setId] = useState(null);
  const[isActive] =useState(true);

  
  const getNotifications = async () => {
    console.log('ahlan')
    const response = await  axios.get(`${BASE_API_URL}/api/get-notifications`, 
      {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }}  
    );
    console.log(response.data) 
    setNotifications(response.data)
  }

  
  const sendResponse = async() =>{  
    setRnmodaVisible(false);
    const response = await  axios.post(`${BASE_API_URL}/api/send-notification`, 
    {
      "body": rate,
      "receiver_id": id
    },
    {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }} 
    );   
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getNotifications();
      return () => {
        isActive = false;
      };
    }, [isActive])
   );
  

  if (!notifications) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }


  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      {notifications && notifications.map((item)=>{
          return( 
          <View
                style={{
                    margin: 4,
                    backgroundColor: '#fff',
                    marginRight: 40,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                }}>
            
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text
                    s3tyle={{ fontSize: 16 }}
                    >Someone pinged you for:</Text>
                    <Text
                    s3tyle={{ fontSize: 10 }}
                    >{item.body} $</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                    onPress={() => {
                       setId(item.sender_id);
                       setRnmodaVisible(true)
                    }} 
                    >
                    <Icon name='reply' style={{ marginLeft: 14 }} size={20} />
                    </TouchableOpacity>
                </View>

          </View>


          );
      })}
      
      <RNModal
          isVisible={rnmodaVisible}
          animationIn= 'zoomIn'
          animationOut= 'zoomOut'
          >
            <View>
              <View style= {[styles.input,{fontSize:18, fontWeight: '700'}]}>
              <TextInput
              placeholder="Enter rate for 1 $"
              onChangeText={(rate) => setRate(rate)}
              />
              </View>
              <View style={{marginTop:40, marginHorizontal:80}}>
                <MyButton style={{marginHorizontal:40}} text="send" onPressFunction = {() => {console.log({id});sendResponse()}}/>
              </View>
            </View> 
          </RNModal>
    </View>
  );
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
 
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
 input: {
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
  buttonText:{
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
 
  
})