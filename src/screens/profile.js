import React , { useState, useEffect } from 'react';
import {View,  StyleSheet,  Image, SafeAreaView } from 'react-native';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import MyButton from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'axios';
import { colors } from '../constants/palette';

export default function ProfileScreen({route,  navigation }) {
 // const [userId, setUsedId]  = useState("'"+route.params["userId"]+"'"); 
  const [userId, setUsedId]  = useState(route.params["userId"]); 
    console.log(userId);
    const [userData, setUserData] = useState(null);
    let tokenStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1NzI2MjUxLCJleHAiOjE2MzU3Mjk4NTEsIm5iZiI6MTYzNTcyNjI1MSwianRpIjoieXNDaGFvaVJoc1kxTEdZayIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.GGv-SleC_NdI3DMp8cHnN5npok4VzzVlw69vT4G_uvg';
    
    const getProfile = async () => {  

        const res = await  axios.post(`${BASE_API_URL}/api/get-profile`, 
        {
            "id": userId
        },
        {headers:{
      'Authorization' : `Bearer ${tokenStr}` 
        }}
        ); 
        console.log(res.data);  
    
        setUserData(res.data)
    }

      useEffect(()=> {
        getProfile();
      },[])
   
    return ( 
    <View style={styles.container}>
    {userData && <View >
        <View style={styles.userInfoSection}>
            <View  style={{flexDirection: 'row', marginTop: 10, justifyContent:"space-Between"}}>
                <Image
                  style={{width:120, height:120, borderRadius:100}}
                  source ={require('./store.png')}
                
                />
            <View style={{marginLeft: 20}}>
                <Title style={ styles.title }>{userData.name} </Title>
                <View>
                    <Caption style={styles.caption}>{userData.bio}</Caption>
                </View>
               
        </View>

      </View>
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
        <View style={{marginTop:40, marginRight:12}}>
            <MyButton text ='Ping for Offer'/>
        </View>
        
                 
    </View>  
</View>
}
</View>
    );


};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:5
    },
  
  
    userInfoSection: {
        marginLeft: 20,
        flexDirection:"row",
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
});