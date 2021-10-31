import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput,Button, Keyboard, TouchableWithoutFeedback} from 'react-native';
import MyButton from '../components/ButtonCustom';


export default function MainProject({route, navigation}) {
 
  const [amount, setAmount] = useState(0);
  
  const submit =  async() =>{

    const respone = await axios.post(`${BASE_API_URL}/api/make-exchange`, 
    {
      "business_id": "7",
      "amount": amount
    },
    {headers:{
      'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1NjEyNzMwLCJleHAiOjE2MzU2MTYzMzAsIm5iZiI6MTYzNTYxMjczMCwianRpIjoiRGo2cmZSd2R6Y3NReEphaCIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.B9AJfm2LZLHsLQALvboAAZD7CDvO4DIHIsioLXU8eww` 
    }}
    ); 
    
  }
   return (
  
  <TouchableWithoutFeedback onPress= {() => Keyboard.dismiss()}>
  <View style={styles.MainContainer}>
 
       <TextInput
 
         placeholder="Enter your sold amount in $"
 
         style={styles.TextInputStyle}
 
         keyboardType={'numeric'}

         onChangeText={(amount) => setAmount(amount)}
       />
    <View style={{marginTop: 20, marginHorizontal:20}}>
       <MyButton text="Submit" onPress={()=>submit()}/>
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
fontSize: 30,
textAlign: 'center',
 
},
 

});