import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Button,
 } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import Remove from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/palette';
import { Constants } from 'expo-constants';
import *  as Offers from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

Offers.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });  

export default function OffersScreen({ navigation }) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const[isActive] =useState(true);

  StatusBar.setBarStyle('dark-content');

  navigation.setOptions({
    title: 'Offers',
    headerLeft: () => null,
  });

  const [notifications, setOffers] = useState(null);
  const [pending, setPending] = useState(null)
  const deleteNotification= async(id) => {
      const respone =await  axios.post(`${BASE_API_URL}/api/delete-notification`, 
      {
        "sender_id" : id 
      },
      {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }}  
      );
      getOffers();
    
  } 

  const getOffers = async ()=>{
    console.log('ahlan')
    const response = await  axios.get(`${BASE_API_URL}/api/get-Sellernotifications`, 
      {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }}  
    );
    console.log(response.data.responded)
    console.log(response.data.pending)
    setOffers(response.data.responded)
    setPending(response.data.pending)
  } 

  const sendResponse = async(id, rate) =>{  
    console.log(id, rate)
    const response = await  axios.post(`${BASE_API_URL}/api/send-notification`, 
        {
          "body": `Someone accepted your offer of ${rate} `, 
          "receiver_id": id
        },
        {headers:{
            Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
          }} 
        );  
    
        const res = await  axios.post(`${BASE_API_URL}/api/get-token`, 
        {
          "id": id
        },
        {headers:{
            Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
        }} 
        ); 

       setExpoPushToken(res.data.expoToken);
       sendPushNotification(expoPushToken, rate);
    
       const resp = await  axios.post(`${BASE_API_URL}/api/delete-notification`, 
        {
          "sender_id": id
        },
        {headers:{
            Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
          }} 
        );        
        getOffers();
        navigation.navigate('Amount', { userId: id});
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getOffers();
      return () => {
        isActive = false;
      };
    }, [isActive])
   );


   if(!notifications){
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
  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      {notifications && notifications.map((item)=>{
          return( 
          <View
                style={{
                    margin: 4,
                    backgroundColor: '#fff',
                    marginRight: 30,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                }}>
                <View>
                    <Image
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                    source={{uri: `${BASE_API_URL}${item.picture_url}`}}
                    />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text
                    s3tyle={{ fontSize: 16 }}
                    >{item.name}</Text>
                    <Text
                    s3tyle={{ fontSize: 10 }}
                    > 1 $ = {item.body} LBP</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                    onPress={() => {
                         // Send notification of confirmation to business, delete notification from from db then direct to amount page
                       sendResponse(item.sender_id, item.body);
                    }} 
                    >
                    <Icon name='checkcircle' color ={colors.primary} style={{ marginLeft: 14 }} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                         // Send notification of confirmation to business, delete notification from from db then direct to amount page
                       deleteNotification(item.sender_id);
                    }} 
                    >
                    <Remove name='remove' color ={colors.primary} style={{ marginLeft: 14 }} size={25} />
                    </TouchableOpacity>
                </View>
          </View>
          );
      })}
      
      {pending && pending.map((item)=>{
          return( 
          <View
                style={{
                    margin: 4,
                    backgroundColor: '#fff',
                    marginRight: 30,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                }}>
                <View>
                    <Image
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                    source={{uri: `${BASE_API_URL}${item.picture_url}`}}
                    />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text
                    s3tyle={{ fontSize: 16 }}
                    >{item.name}</Text>
                    <Text
                    s3tyle={{ fontSize: 10 }}
                    > Pending</Text>
                </View>
          </View>
          );
      })}


    </View>
  );
}
async function sendPushNotification(expoPushToken, rate) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'New Notification',
    body: `Someone accepted your offer of  ${rate} `,
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


