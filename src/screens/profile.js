import React , { useState, useEffect } from 'react';
import {View,  StyleSheet,  Image, SafeAreaView , ActivityIndicator, TouchableOpacity, Button,TextInput} from 'react-native';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import MyButton from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'axios';
import { colors } from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNModal from 'react-native-modal';

export default function ProfileScreen({route,  navigation }) {
  const [userId, setUsedId]  = useState(route.params["userId"]); 
  const time = Math.round(route.params["duration"]["time"]);
  const [token, setToken] =useState(null);
  const [userData, setUserData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [rnmodaVisible, setRnmodaVisible] = useState(false);

  const getProfile = async () => { 
        const res = await  axios.post(`${BASE_API_URL}/api/get-profile`, 
        {
            "id": userId
        },
        {headers:{
      'Authorization' : `Bearer  ${await AsyncStorage.getItem('@storage_Key')}` 
        }}
        ); 
        
        setUserData(res.data)
        setToken(userData.expoToken)
        
        console.log(res.data)
        console.log(res.data.expoToken)
    }

  const sendPushNotification= async() => {

      setRnmodaVisible(false);
      
      // First save body to db
      const res = await  axios.post(`${BASE_API_URL}/api/send-notification`, 
        {
            "body": amount,
            "receiver_id": userId
        },
        {headers:{
      'Authorization' : `Bearer  ${await AsyncStorage.getItem('@storage_Key')}` 
        }}
        );
      
        const message = {
          to: token,
          sound: 'default',
          title: 'Original Title',
          body: `Someone pinged you for ${amount}` ,
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

  useEffect(()=> {
        getProfile();
    },[])

if(!userData){
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

    <View style={styles.container}>
    {userData && <View >
        <View style={styles.userInfoSection}>
            <View  style={{flexDirection: 'row', marginTop: 10, justifyContent:"space-Between"}}>
                <Image
                  style={{width:140, height:140, borderRadius:100}}
                  source ={{uri: `${BASE_API_URL}${userData.picture_url}`}}
                />
            <View style={{marginLeft: 20}}>
                <Title style={ styles.title }>{userData.name}</Title>
                <View>
                    <Caption style={styles.caption}>{userData.bio}</Caption>
                </View>      
            </View>
          
      </View>
      </View>
      <View style={styles.button}>
                        <Text  style={styles.buttonText}> 
                                Estimated time to destination: {time} min
                        </Text>
      </View>
      <View style={[styles.userInfoSection,{justifyContent:"space-between"}]}>
        <View style={{   marginTop:  35,}}>
            <View style={styles.row}>
                <Icon name = "map-marker-radius"  color={colors.primary} size={20}/>
                <Text style={{color: colors.primary_light, marginLeft:20}}>Beirut, Lebanon</Text>
            </View>
            <View style={styles.row}>
                <Icon name = "phone"  color={colors.primary} size={20}/>
                <Text style={{color: colors.primary_light, marginLeft:20}}>+961 71522151</Text>
            </View>
            <View style={styles.row}>
                <Icon name = "email"  color={colors.primary} size={20}/>
                <Text style={{color: colors.primary_light, marginLeft:20}}>{userData.email}</Text>
            </View>
        </View>
           
    </View> 

    
            <View style={{marginHorizontal:70}}>
                <MyButton  text ='Ping for Offer' onPressFunction={()=>{setRnmodaVisible(true)}}/>      
            </View>  
      
</View>
}
        <RNModal
          isVisible={rnmodaVisible}
          animationIn= 'zoomIn'
          animationOut= 'zoomOut'
          >
            <View>
              <View style= {[styles.input,{fontSize:18, fontWeight: '700'}]}>
              <TextInput
              placeholder="Enter the amount in $"
              onChangeText={(amount) => setAmount(amount)}
              />
              </View> 
              <View style={{marginTop:40, marginHorizontal:80}}>
                <MyButton style={{marginHorizontal:40}} text="send" onPressFunction = {() =>  sendPushNotification()}/>
              </View>
            </View> 
        </RNModal>

</View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:5
    },
    input: {
        position:'absolute', 
        flexDirection:"row",
        
        bottom:107,
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
  
    userInfoSection: {
        marginLeft: 20,
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:15, 
        marginBottom: 5,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight:'500',
        flexWrap:'wrap',
        flexShrink:2,
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,  
    },

    button:{
        marginTop:30,
        marginHorizontal:35,
        flexDirection: 'row',
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: '#abbab0' ,
        },
    buttonText:{
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,        
    }
}
);