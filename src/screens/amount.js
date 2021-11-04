import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput,Button, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import MyButton from '../components/ButtonCustom';
import { colors } from '../constants/palette';

export default function MainProject({route, navigation}) {
 
  const [amount, setAmount] = useState(0);
  
  const submit =  async() =>{

    const respone = await axios.post(`${BASE_API_URL}/api/make-exchange`, 
    {
      "business_id": "7",
      "amount": amount
    },
    {headers:{
      'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1Nzg3OTY2LCJleHAiOjE2MzU3OTE1NjYsIm5iZiI6MTYzNTc4Nzk2NiwianRpIjoiM0ZQekVHUFJzcXF3MEgzaiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.OtaTO6QQO9TK9B59RfjhYkW9eLPiPogFNypM1tegJAg` 
    }}
    ); 
    
  }


return (
  // Put paragraph here later .

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.MainContainer}>
    
  <View style={{marginHorizontal:20, marginBottom:40 }} >
      <Text style ={{ flexDirection: 'row', fontWeight:'bold', backgroundColor:'#e6ffee', fontSize:20}}>We are commited to increasing transparency in the Exchange market.
      
      Please help us make sure our profiles do not buy above their approved margins.</Text>

  </View> 
      <TextInput
         placeholder="Confirm amount you are about to sell in $"
         style={styles.TextInputStyle}
         keyboardType={'numeric'}
         onChangeText={(amount) => setAmount(amount)}
      />
    <View style={{marginTop: 20, marginHorizontal:80}}>
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
fontSize: 15,
textAlign: 'center',
},
 
});