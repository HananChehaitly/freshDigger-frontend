import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import loginScreen from './src/screens/login'
import signupScreen from './src/screens/register'
import HomeScreen from './src/screens/map'
//import ChatsScreen from './src/screens/chats';
//import ConversationScreen from './src/screens/conversation';
import AmountScreen  from './src/screens/amount';
import ProfileScreen from './src/screens/profile';
import NotificationScreen from './src/screens/notifications';
import RateScreen from './src/screens/rate';
import { colors } from './src/constants/palette';
import Design from 'react-native-vector-icons/AntDesign';
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Rate" component={RateScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}


function NotificationsStackScreen({ navigation }) {
    return (
      <HomeStack.Screen name="Notifications" component={NotificationScreen} />

    );
}

const Tab = createBottomTabNavigator();

function bottomTabScreen() {
  return (
    <Tab.Navigator  screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarIcon:({focused, size})=>
            (
              <Icon
              name={"home"}
              size = {40}
              color= {colors.primary}
              />
            ),
          
          }}  />
        <Tab.Screen name="Notifications" component={NotificationsStackScreen} options={{
          tabBarIcon:({focused, size})=>
            (
              <Design
              name={"message1"}
              size = {30}
              color= {colors.primary}
              />
            ),
          
          }}/>
        <Tab.Screen name="Amount" component={AmountScreen} />

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
