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
  Button
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/palette';
import { Constants } from 'expo-constants';
import *  as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });  

export default function NotificationsScreen({ navigation }) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const[isActive] =useState(true);

  StatusBar.setBarStyle('dark-content');

  navigation.setOptions({
    title: 'Notifications',
    headerLeft: () => null,
  });

  const [notifications, setNotifications] = useState(null);


  const getNotifications = async ()=>{
    console.log('ahlan')
    const response = await  axios.get(`${BASE_API_URL}/api/get-Sellernotifications`, 
      {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }}  
    );
    console.log(response.data)
    setNotifications(response.data)
  } 

  const sendResponse = async(id, rate) =>{  
    
    // const response = await  axios.post(`${BASE_API_URL}/api/send-notification`, 
    //     {
    //       "body": `Someone accepted your offer of  ${rate}`,
    //       "receiver_id": id
    //     },
    //     {headers:{
    //         Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
    //       }} 
    //     );  
    
    // const resp = await  axios.post(`${BASE_API_URL}/api/delete-notification`, 
    //     {
    //       "sender_id": id
    //     },
    //     {headers:{
    //         Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
    //       }} 
    //     );
    navigation.navigate('Amount');
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
                </View>
          </View>
          );
      })}
      
    </View>
  );
}


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
  
    return token;
  }