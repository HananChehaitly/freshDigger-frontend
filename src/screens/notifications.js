import React , { useState, useEffect } from 'react';
import {View,  StyleSheet,  Image, SafeAreaView, Button } from 'react-native';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import ButtonCustom from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'axios';


export default function NotificationScreen({navigation }) {

    return (
             <View style={styles.container}>
                <View style={styles.userInfoSection}>
                    <View  style={{flexDirection: 'row', marginTop: 15}}>
                        <Avatar.Image
                          source ={{  
                            uri:'../assets/icon.png',
                        }}
                        source = {80}
                        />
                    <View style={{marginLeft: 20}}>
                    <Title style={[styles.title,{marginTop:15, marginBottom: 5}]}>hanan </Title>
                    <Caption stylele={styles.caption}>asaiojdiajais</Caption>
                    </View>
                </View>
            </View>
          
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name = "map-marker-radius"  color="#E05263" size={20}/>
                    <Text style={{color: '#E05263', marginLeft:20}}>Beirut, Lebanon</Text>
                </View>
                <View style={styles.row}>
                    <Icon name = "phone"  color="#E05263" size={20}/>
                    <Text style={{color: '#E05263', marginLeft:20}}>+961 71522151</Text>
                </View>
                <View style={styles.row}>
                    <Icon name = "email"  color="#E05263" size={20}/>
                    <Text style={{color: '#E05263', marginLeft:20}}>email"saija</Text>
                </View>
                <View style={styles.buttonBox}>
                    <View style={styles.buttons}>
                        <ButtonCustom text ='Ping for Offer' color='#659157'/>
                    </View>
                    <ButtonCustom text ='Message' color='#659157'/>
                </View>
                </View>
            </View> 
            
            
            );
        
        
        };
        
        
        const styles = StyleSheet.create({
            container: {
                flex: 1,
            },
            buttons: {
                marginRight: 10
            },
            buttonBox : {
                marginTop: 100,
                marginLeft: 30,
                flexDirection: 'row',
            },
            userInfoSection: {
                paddingHorizontal: 30,
                marginBottom: 30,
            },
            title: {
                fontSize: 20,
                fontWeight: 'bold',
            },
            caption: {
                fontSize: 14,
                lineHeight: 14,
                fontWeight:'500'
            },
            row: {
                flexDirection: 'row',
                marginBottom: 10,
                marginLeft: 150
            },
            infoBoxWrapper: {
                borderBottomColor: '#A1C084',
                borderBottomWidth: 1,
                borderTopColor: '#dddddd',
                borderTopWidth: 1,
                flexDirection: 'row',
                height: 100,
            },
            infoBoxWrapper: {
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
            },
            menuWrapper: {
                marginTop: 10,
            },
            menuItem: {
                flexDirection: 'row',
                paddingVertical: 15,
                paddingHorizontal: 30,
            },
            menuItemText: {
                color: '#A1C084',
                marginLeft: 20,
                fontWeight: '600',
                fontSize: 16,
                lineHeight: 26
            },
        });