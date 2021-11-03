import React, { useState, useEffect, useRef } from 'react';
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
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Fontisto';
import { colors } from '../constants/palette';
import { Constants } from 'expo-constants';
import *  as Notifications from 'expo-notifications';

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
    const notificationListener = useRef();
    const responseListener = useRef();
  
  StatusBar.setBarStyle('dark-content');

  navigation.setOptions({
    title: 'Notifications',
    headerLeft: () => null,
  });

  const [notifications, setNotifications] = useState(null);


  const getNotifications = ()=>{
      setNotifications([{"amount":400},{"amount":200}])
  }

  useEffect(() => {

      getNotifications() ; 

      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    
    }
    ,[])

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
                    source={require('./store.png')}
                    />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text
                    s3tyle={{ fontSize: 16 }}
                    >{item.name}</Text>
                    <Text
                    s3tyle={{ fontSize: 10 }}
                    > 1 $ = {item.rates} LBP</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                    // onPress={() => {
                    //    ;   //change what happens on press
                    // }} 
                    >
                    <Icon name='reply' color ={colors.primary_light} style={{ marginLeft: 14 }} size={20} />
                    </TouchableOpacity>
                </View>
                <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification && notification.request.content.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                    <Button
                        title="Press to schedule a notification"
                        onPress={async () => {
                        await schedulePushNotification();
                        }}
                    />
                </View>

                </View>
          );
      })}
      
    </View>
  );
}
async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
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
