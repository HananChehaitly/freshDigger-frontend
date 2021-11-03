import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Fontisto';


export default function Notifications({ navigation }) {
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
      getNotifications() ; }
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
                    >{item.amount} $</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                    // onPress={() => {
                    //    ;   //change what happens on press
                    // }} 
                    >
                    <Icon name='reply' style={{ marginLeft: 14 }} size={20} />
                    </TouchableOpacity>
                </View>
                </View>

          );
      })}
      
    </View>
  );
}

