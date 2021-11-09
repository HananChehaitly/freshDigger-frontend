import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View , Text} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { colors} from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_API_URL from '../services/api/BaseUrl';

export default function BusinessHome({navigation}) {
    const [info, setInfo] =  useState(null);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [table, setTable] = useState(null);
    const [bool,setBool] = useState(false);
    const [returnDate, setReturnDate] =useState(null);
    const [isActive, setIsActive] = useState(false);
    const summary =  [
        { tableHead: [ 'Total Exchanges','Weekly Limit', 'Remaining Allowance'],
         tableData: [info]
        }  
     ];   

     const getInfo = async() =>{ 
     
          const response = await  axios.get(`${BASE_API_URL}/api/remaining-allowance`,  
          {headers:{
              Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
            }}    
          ); 
 
          setInfo([response.data[0].sum,response.data[0].weekly_limit,response.data[0].allowance]);

          if(response.data[0].allowance<0){
            const res = await  axios.get(`${BASE_API_URL}/api/return-date`,  
            {headers:{
                Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
              }}    
            );

            setReturnDate(res.data); 
            setBool(true);
          }
          const resp = await  axios.get(`${BASE_API_URL}/api/daily-sums`,  
          {headers:{
              Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
            }}    
          );

            const JSONString = resp.data;
            const array = JSONString.map((item) => {
              return [item.date, item.sum];
            });
           console.log(array)
           setTable({
            tableHead: [ 'Date', 'Daily Sum (in $)'],
            tableData: array 
         })
      } 
       
      useFocusEffect(
        React.useCallback(() => {
          let isActive = true;
          getInfo();
          return () => {
            isActive = false;
          };
        }, [isActive])
       );
      
return (
  <View  style = {{
    flex:2,
    padding:10
  }}>   
      <View > 
    { table && <Table borderStyle={{borderWidth: 2}}>
          <Row data={table.tableHead} flexArr={[1, 1,]} style={styles.head} textStyle={styles.headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={table.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
    }
      </View> 
      <View style={{marginTop:110 }}> 
    {info && <Table borderStyle={{borderWidth: 2}}>
          <Row data={summary[0].tableHead} flexArr={[1, 1,1]} style={styles.head} textStyle={styles.headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={summary[0].tableData} flexArr={[1, 1,1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
    }
      </View>  
     {bool && returnDate &&<View>
          <Text>You are no longer visible to buyers.</Text>
          <Text>You will be visible again on {returnDate} .</Text>
      </View>
    }
  </View>

    );
  }

 
const styles = StyleSheet.create({
  head: {  height: 40,  backgroundColor: colors.primary_light  },
  wrapper: { flexDirection: 'row' },
  row: {  height: 28  },
  headertext: { textAlign: 'center', fontWeight: 'bold' , fontSize: 15 },
  text: { textAlign: 'center', fontSize:15  }
});