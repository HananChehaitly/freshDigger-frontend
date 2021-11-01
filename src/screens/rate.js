import React, {useEffect, useState} from 'react';
import { Button, Text, View , StyleSheet, ActivityIndicator} from 'react-native';
import BASE_API_URL from '../services/api/BaseUrl';
import axios from 'axios';
import MyButton from '../components/ButtonCustom';
import { colors, shadows } from '../constants/palette';
import { LineChart } from 'react-native-chart-kit'; 
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function RateScreen({navigation}){
    const[averages, setData] = useState(null);
    const[days, setDays] = useState(null);
      const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.1,
        color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
        strokeWidth: 0, // optional, default 3
        barPercentage: 0,
        useShadowColorFromDataset: false, // optional
        decimalPlaces: 0,
        
      };
    const[rate, setRate] = useState(null)
    
    const getRate =  async() => { 
        const resp =  await axios.get(`${BASE_API_URL}/api/scrap`, { headers:{
            'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1Nzg3OTY2LCJleHAiOjE2MzU3OTE1NjYsIm5iZiI6MTYzNTc4Nzk2NiwianRpIjoiM0ZQekVHUFJzcXF3MEgzaiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.OtaTO6QQO9TK9B59RfjhYkW9eLPiPogFNypM1tegJAg`
  
        }} 
        );
        const response =  await axios.get(`${BASE_API_URL}/api/draw-chart`, { headers:{
            'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1Nzg3OTY2LCJleHAiOjE2MzU3OTE1NjYsIm5iZiI6MTYzNTc4Nzk2NiwianRpIjoiM0ZQekVHUFJzcXF3MEgzaiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.OtaTO6QQO9TK9B59RfjhYkW9eLPiPogFNypM1tegJAg`
        }}  
        );
         
        setRate(resp.data)

        
        setDays(response.data.days)
        const array = response.data.avgs;
        const map = array.map(element => element["cast(avg(rate) as decimal(10,3))"]);
        setData(map);
        console.log(map)
        console.log(days);
    }

    useEffect(()=>{
        getRate();
    },[]) 

if(!(rate && days)){
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
           const checkProfile = (id) =>{
             {navigation.navigate('Profile', { userId: id })}
           }    
           const checkRate = () =>{
             {navigation.navigate('Rate')}
    }

return(
    <View> 
    <View style={{marginTop:40, alignItems:'center'}}>
    <Text style={{fontSize:18, fontWeight:'bold'}}> Current OMT exchange rate is at: </Text>
    </View>
    <View style={{marginTop:10}}>
     {rate &&   <View style={styles.button}>
                    <Text  style={styles.buttonText}>  
                      1 $ = {rate} LBP
                    </Text>
                </View> 
     }  
    <View style={{marginTop:25}}>

    <View style={{marginTop:20, marginLeft:37}}>
        <Text style={{fontSize:14, marginBottom: 15}}> History of daily average rates in last six days: </Text>
    </View>

   {days && averages &&
   <View style={{marginHorizontal:15}}>
   <LineChart
        data={{labels: days,
        datasets:[
            { 
              data: averages   

            }
        ],
        legend: ["Daily Average Rate"]
    }
    }   width={screenWidth}
        height={220}
        chartConfig={chartConfig} 
        
        />
    </View>
   }
    </View>
    </View>
    </View>
    );
}

const styles= StyleSheet.create({

    buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: colors.white,
      },
      
      button:{
        flexDirection: 'row',
        borderRadius:100,
        justifyContent: 'center',
        alignItems: 'center',
        
        paddingVertical: 8,
        backgroundColor: "#a8adaa",
        elevation: shadows.md.y,
        
        paddingHorizontal: 25,
        height: 48,
        marginTop: 5,
        marginHorizontal: 100,
      }
      
});