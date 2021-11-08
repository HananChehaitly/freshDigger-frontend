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
import *  as Offers from 'expo-notifications';
import RNModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/palette';
import MyButton from '../components/ButtonCustom';
import Delete from 'react-native-vector-icons/AntDesign';

export default function OffersBus({ navigation }){
    StatusBar.setBarStyle('dark-content');

    navigation.setOptions({
      title: 'Offers',
      headerLeft: () => null,
    });
    Offers.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });  

  const [notifications, setOffers] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const [rnmodaVisible, setRnmodaVisible] = useState(false);
  const [rate, setRate] = useState(null);
  const [id, setId] = useState(null);
  const[isActive, setIsActive] =useState(true);
  
  const deleteNotification= async(id, body) => {
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
  const getOffers = async () => {

    const response = await  axios.get(`${BASE_API_URL}/api/get-notifications`, 
      {headers:{
        Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
      }}  
    );
    console.log(response.data) 
    setOffers(response.data)
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
        //First get token of receiver 
        const res = await  axios.post(`${BASE_API_URL}/api/get-token`, 
            {
              "id": id
            },
            {headers:{
                Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
            }} 
            ); 
        
        setExpoPushToken(res.data.expoToken)
        
        //console.log(res.data.expoToken)
        
        sendPushNotification(expoPushToken,rate);
        deleteNotification(id)  ;
        getOffers();
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
                    s3tyle={{ fontSize: 10 }}
                    >{item.body}</Text>
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
                    <TouchableOpacity
                    onPress={() => {
                       deleteNotification(item.sender_id);
                    }} 
                    >
                    <Delete name='delete' style={{ marginLeft: 14 }} size={20} />
                    </TouchableOpacity>
                </View>

          </View>


          );
      })}
      
      <RNModal
          isVisible={rnmodaVisible}
          animationIn= 'zoomIn'
          animationOut= 'zoomOut'
          onBackdropPress={() => setRnmodaVisible(false)}
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

async function sendPushNotification(expoPushToken,rate) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Rate',
    body: `1 $ = ${rate} LBP`,
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