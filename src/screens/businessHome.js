import React, { useState, usetable } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { colors} from '../constants/palette';

export default function BusinessHome({navigation}) {
    const table = [
       { tableHead: [ 'Exchanges', 'Date'],
        tableData: [
          ['1', '2'],
          ['a', 'b'],
          ['1', '2'],
          ['a', 'b']
        ]}
    ];
    const summary =  [
        { tableHead: [ 'Total Exchanges','Weekly Limit', 'Remaining Allowance'],
         tableData: [
           ['1', '2','3'],
           ['a', 'b','c'],
         ]}
     ];

console.log(table[0].tableHead); 
    return (
<View>
      <View > 
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={table[0].tableHead} flexArr={[1, 1,]} style={styles.head} textStyle={styles.headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={table[0].tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>  
      <View style={{marginTop:110 }}> 
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={summary[0].tableHead} flexArr={[1, 1,1]} style={styles.head} textStyle={styles.headertext}/>
          <TableWrapper style={styles.wrapper}>
            <Rows data={summary[0].tableData} flexArr={[1, 1,1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>  
</View>
    );
  }

 
const styles = StyleSheet.create({
  head: {  height: 40,  backgroundColor: colors.primary_light  },
  wrapper: { flexDirection: 'row' },
  row: {  height: 28  },
  headertext: { textAlign: 'center', fontWeight: 'bold'  },
  text: { textAlign: 'center'  }
});