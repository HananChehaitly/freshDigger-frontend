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
      'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1NDY0MDM5LCJleHAiOjE2MzU0Njc2MzksIm5iZiI6MTYzNTQ2NDAzOSwianRpIjoiQUxPaEZGd1h2V3lvbkI5YyIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.6JJDP4mJkzGqJV9fOwTKxXsvjX3J2IsdSxDFAZ_9VOc` 
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