import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput,Button, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity, Alert} from 'react-native';
import MyButton from '../components/ButtonCustom';
import { colors } from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import loginScreen from './login';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});  

export default function MainProject({route, navigation}) {
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [amount, setAmount] = useState(0);
  const business_id= route.params["userId"];

  async function sendPushNotification(expoPushToken, rate) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'New Notification',
      body: `You have exceeded your limit!`,
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

  const submit =  async() =>{

        console.log(route.params["userId"])
        const respone = await axios.post(`${BASE_API_URL}/api/make-exchange`, 
        {
          "business_id": business_id,
          "amount": amount
        },
        {headers:{
          'Authorization' : `Bearer ${await AsyncStorage.getItem('@storage_Key')}` 
        }}
        ); 
        // use allowance api to see if <0 send push notification to buyer.
        const resp = await  axios.post(`${BASE_API_URL}/api/get-remainingAllowance`, 
        {
          "id": business_id
        }, 
          {headers:{
              Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
            }}    
          ); 
            console.log(resp.data);

        if(resp.data[0].allowance <=0){

            const res = await  axios.post(`${BASE_API_URL}/api/get-token`, 
            {
              "id": business_id
            },
            {headers:{   
                Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
            }} 
            ); 

            //setExpoPushToken(res.data.expoToken);
            sendPushNotification(res.data.expoPushToken);
      } 
      Alert.alert(
        'Thank you for your cooperation!'
     )
  }

const login = () =>
  {console.log('hi');
    navigation.navigate('Login');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
        });
      
  }


return (
 
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
  <Card>
  <View style={{marginLeft:270}}>

    <Button title="logout" color={colors.primary} onPress={()=>login()}>Logout</Button>
  
  </View>
  <Card.Title title="Confirm Amount" subtitle="Private" left={(props) => <Icon {...props} name="search-dollar" color={colors.primary}/>} />
  <Card.Content>
    <Title>Monitoring Requirements</Title>
    <Paragraph>We are commited to increasing transparency in the Exchange market. Please help us make sure our profiles do not buy above their approved margins.</Paragraph>
  </Card.Content>
  <View style={[styles.searchBox,{marginTop:220}]}>       
       <TextInput
          placeholder="Confirm amount you are about to sell in $"
          placeholderTextColor="#808080"
          style={{flex:1,padding:0}}
          keyboardType={'numeric'}
          onChangeText={(amount) => setAmount(amount)}
       />
  </View> 
  <Card.Actions style={{marginTop:40}}>
    
  </Card.Actions>
</Card> 
<View style={{marginHorizontal:120}}>
      
       <MyButton text="Submit" onPressFunction={()=>submit()}/>
    
    </View>
  </View>
</TouchableWithoutFeedback> 

  );
  
  }


const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10
},
 
TextInputStyle: {
fontSize: 15,
textAlign: 'center',
},
searchBox: {
  position:'absolute', 
  flexDirection:"row",
  // top:10,
  backgroundColor: '#f5f0f0',
  width: '90%',
  alignSelf:'center',
  borderRadius: 5,
  padding: 10,
 // marginTop:140,
  shadowColor: '#ccc',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
},

});
