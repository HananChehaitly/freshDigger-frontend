import * as React from 'react';
import { Button, Text, View } from 'react-native';


export default function loginScreen({ navigation }) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login screen</Text>
            <Button
              title="Go to Home"
              onPress={() => {navigation.navigate('BottomTab'); 
              navigation.reset({
                  index: 0,
                  routes: [{ name: 'BottomTab' }],
                  });}}
            />
             <Button
              title="Go to signup"
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        );
      }