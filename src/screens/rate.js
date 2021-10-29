import React, {useEffect, useState} from 'react';
import { Button, Text, View , StyleSheet} from 'react-native';
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

    
    const data = {
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Daily Average Rate"] // optional
      };
      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    const[rate, setRate] = useState(null)
    
    const getRate =  async() => { 
        const resp =  await axios.get(`${BASE_API_URL}/api/scrap`, { headers:{
            'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1NDcyNDA2LCJleHAiOjE2MzU0NzYwMDYsIm5iZiI6MTYzNTQ3MjQwNiwianRpIjoiQWZqUHljNFZZTGRUNU14ciIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.r-fPUw2lapWWtP-Hz6R783lFE-_amzz9EmnVCIoM5fo`
  
        }} 
        );

        const response =  await axios.get(`${BASE_API_URL}/api/draw-chart`, { headers:{
            'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuODo4MDAxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjM1NDcyNDA2LCJleHAiOjE2MzU0NzYwMDYsIm5iZiI6MTYzNTQ3MjQwNiwianRpIjoiQWZqUHljNFZZTGRUNU14ciIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.r-fPUw2lapWWtP-Hz6R783lFE-_amzz9EmnVCIoM5fo`
  
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

    return(
    <View style={{marginTop:70}}>
     {rate &&   <View style={styles.button}>
                    <Text  style={styles.buttonText}>  
                        {rate}
                    </Text>
                </View> 
     }  

    <View style={{marginTop:20}}>
   {days && <LineChart
        data={{labels: days, 
        datasets:[
            { 
                data: averages
            }
        ]
    }
    }
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        />
   }
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
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        paddingVertical: 8,
        backgroundColor: colors.primary,
        elevation: shadows.md.y,
        shadowColor: shadows.md.color,
        shadowOpacity: shadows.md.opacity,
        shadowOffset: { width: shadows.md.x, height: shadows.md.y },
        paddingHorizontal: 30,
        height: 48,
        marginTop: 5,
        marginHorizontal: 35
      }
      
});