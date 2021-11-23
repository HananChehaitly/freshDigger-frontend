import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View , Text, Image, Alert, ActivityIndicator} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Caption , Title} from 'react-native-paper';
import { colors} from '../constants/palette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_API_URL from '../services/api/BaseUrl';

export default function BusinessHome({navigation}) {
    const [userData, setUserData] = useState(null);
    const [info, setInfo] =  useState(null);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [table, setTable] = useState(null);
    const [bool,setBool] = useState(false);
    const [returnDate, setReturnDate] =useState(null);
    const [isActive, setIsActive] = useState(false);
    const summary =  [
        { tableHead: [ 'Current total','Weekly Limit', 'Remaining Allowance'],
         tableData: [info]
        }  
     ];   

     const getInfo = async() =>{ 
 
          const profile = await  axios.get(`${BASE_API_URL}/api/get-Userprofile`, 
            {headers:{
              'Authorization' : `Bearer  ${await AsyncStorage.getItem('@storage_Key')}` 
             }}
          );      
            console.log(profile.data);
          setUserData(profile.data)
      
          const response = await  axios.get(`${BASE_API_URL}/api/remaining-allowance`,  
          {headers:{
              Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
            }}    
          ); 
 
          setInfo([response.data[0].sum,response.data[0].weekly_limit,response.data[0].allowance]);

          if(response.data[0].allowance<=0){
            const res = await  axios.get(`${BASE_API_URL}/api/return-date`,  
            {headers:{
                Authorization : `Bearer ${await AsyncStorage.getItem('@storage_Key')}`
              }}    
            );

            setReturnDate(res.data); 
            console.log(returnDate);
            {
              Alert.alert(
                `You are no longer visible to buyers. You will be visible again on ${await res.data}.`
                 ) 
              }   
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
       if(!userData || !info || !table){  
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

  {userData && info && table && <View style={{marginLeft:20}}>
          <View  style={{flexDirection: 'row', marginTop: 10, justifyContent:"space-Between"}}>
                  <Image
                    style={{width:100, height:100, borderRadius:90}}
                    source ={{uri: `${BASE_API_URL}${userData.picture_url}`}}
                  />
              <View style={{marginLeft: 25}}>
                  <Title style={ styles.title }>{userData.name}</Title>
                  <View style={{flexDirection:'row'}}>
                    <Icon name = "email"  color={colors.primary} size={20}/>
                      <Caption style={{ marginLeft:5}}>{userData.email}</Caption>
                  </View>
                  <View style={{flexDirection:'row'}}>
                  <Icon name = "phone"  color={colors.primary} size={20}/>
                      <Caption style={{ marginLeft:5}}>{userData.phone_number}</Caption>
                  </View>      
              </View>
          </View>
  </View>}

  <View  style = {{
    flex:2,
    padding:10,
    paddingTop: 30
  }}>   
      <View > 
    { userData && info && table && <Table borderStyle={{borderWidth: 2}}>
          <Row data={table.tableHead} flexArr={[1, 1,]} style={styles.head} textStyle={styles.headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={table.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
    }
      </View> 
      <View style={{marginTop:45 }}> 
    {userData && info && table && <Table borderStyle={{borderWidth: 2}}>
          <Row data={summary[0].tableHead} flexArr={[1, 1,1]} style={styles.head} textStyle={styles.headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={summary[0].tableData} flexArr={[1, 1,1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
    }
      </View>  
    
     
  </View> 

  </View>
    );
  }

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:5
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight:'500',
    flexWrap:'wrap',
    flexShrink:2,
    marginRight: 10,
    }   ,
  head: {  height: 40,  backgroundColor: colors.primary_light  },
  wrapper: { flexDirection: 'row' },
  row: {  height: 28  },
  headertext: { textAlign: 'center', fontWeight: 'bold' , fontSize: 15 },
  text: { textAlign: 'center', fontSize:15  }
});