import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import loginScreen from './src/screens/login'
import signupScreen from './src/screens/register'
import HomeScreen from './src/screens/map'
import ChartScreen from './src/screens/chart'
//import ChatsScreen from './src/screens/chats';
//import ConversationScreen from './src/screens/conversation';
import AmountScreen  from './src/screens/amount';
import ProfileScreen from './src/screens/profile';
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Chart" component={ChartScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}


function NotificationsStackScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications screen</Text>
      </View>
    );
}

const Tab = createBottomTabNavigator();

function bottomTabScreen() {
  return (
    <Tab.Navigator  screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Notifications" component={NotificationsStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName = "Login">
      <Stack.Screen name="Login" component={loginScreen} />
      <Stack.Screen name="Signup" component={signupScreen} />
      <Stack.Screen name="BottomTab" component={bottomTabScreen} options={{
            title:""
          }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
