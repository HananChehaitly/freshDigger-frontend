import React from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import { colors, shadows } from '../constants/palette';

export default function MyButton(props) {

    return(
       
            <TouchableOpacity  style={styles.button} onPress={props.onPressFunction}>
                <View>
                    <Text  style={styles.buttonText}>
                        {props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        
    );

}


const styles = StyleSheet.create({
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
        paddingHorizontal: 15,
        height: 48,
        marginTop: 30,
    }
});