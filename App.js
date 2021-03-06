import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import loginScreen from './src/screens/login'
import signupScreen from './src/screens/register'
import HomeScreen from './src/screens/map'
import AmountScreen  from './src/screens/amount';
import ProfileScreen from './src/screens/profile';
import OffersScreen from './src/screens/offers';
import RateScreen from './src/screens/rate';
import { colors } from './src/constants/palette';
import Design from 'react-native-vector-icons/AntDesign';
import Dollar from 'react-native-vector-icons/FontAwesome';
import RegisterBusiness from './src/screens/register_business';
import RemoveAccounts from './src/screens/RemoveAccounts';
import Delete from 'react-native-vector-icons/AntDesign';
import BusOffers from './src/screens/businessOffers';
import edit from './src/screens/edit';
import BusinessHome from './src/screens/businessHome';

console.disableYellowBox = true;
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Map" component={HomeScreen} />
      <HomeStack.Screen name="Rate" component={RateScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}

const OffersStack = createNativeStackNavigator();

function OffersStackScreen() {
  return (
    <OffersStack.Navigator screenOptions={{ headerShown: false }}>
      <OffersStack.Screen name="Offers" component={OffersScreen} />
      <OffersStack.Screen name="Amount" component={AmountScreen} />
    </OffersStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function bottomTabScreen() {
  return (
    <Tab.Navigator  screenOptions={{ headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#aebdb3',
      tabBarShowLabel: true,  
      tabBarAllowFontScaling: false,
      tabBarKeyboardHidesTabBar: true,
      tabBarShadowColor: '#FFF',
      tabBarLabelStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },}}>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarIcon:({focused, size})=>
            (
              <Icon
              name={"home"}
              size = {40}
              color={focused ? colors.primary : "#798a7f"}              
              />
            ),
          
          }}  />
        <Tab.Screen name="Offers" component={OffersStackScreen} options={{
          tabBarIcon:({focused, size})=>
            (
              <Design
              name={"message1"}
              size = {30}
              color={focused ? colors.primary : "#798a7f"}              
          />
            ),
          
          }}/>
      
    </Tab.Navigator>
  );
}

const TabAd = createBottomTabNavigator();

function bottomTabAdminScreen() {
  return (
    <TabAd.Navigator  screenOptions={{ headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#798a7f',
      tabBarShowLabel: true,
      tabBarAllowFontScaling: false,
      tabBarKeyboardHidesTabBar: true,
      tabBarShadowColor: '#FFF',
      tabBarLabelStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },}}>
        <TabAd.Screen name="Home" component={RegisterBusiness} options={{
          tabBarIcon:({focused, size})=>
            (
              <Icon
              name={"home"}
              size = {40}
              color={focused ? colors.primary : "#798a7f"}              
              />
            ),
          }}  />
        <TabAd.Screen name="Delete" component={RemoveAccounts} options={{
          tabBarIcon:({focused, size})=>
            (
              <Delete
              name={"deleteuser"}
              size = {30}
              color={focused ? colors.primary : "#798a7f"}              
              />
            ), 
          }}  />
    </TabAd.Navigator>
  );
}

const TabBus = createBottomTabNavigator();

function bottomTabBusScreen() {
  return (
    <TabBus.Navigator  screenOptions={{ headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#798a7f',
      tabBarShowLabel: true,
      tabBarAllowFontScaling: false,
      tabBarKeyboardHidesTabBar: true,
      tabBarShadowColor: '#FFF',
      tabBarLabelStyle: {
        fontWeight: "bold",
        fontSize: 10,
      },}}>
        <TabBus.Screen name="Home" component={BusinessHome} options={{
          tabBarIcon:({focused, size})=>
            (
              <Icon
              name={"home"}
              size = {30}
              color={focused ? colors.primary : "#798a7f"}              
              />
            ),
          }}  />
        <TabBus.Screen name="Offers" component={BusOffers} options={{
          tabBarIcon:({focused, size})=>
            (
              <Dollar
              name={"dollar"}
              size = {30}
              color={focused ? colors.primary : "#798a7f"}              
              />
            ),
          }}  />
         <TabBus.Screen name="Edit" component={edit} options={{
          tabBarIcon:({focused, size})=>
            (
              <Design
              name={"edit"}
              size = {30}
              color={focused ? colors.primary : "#798a7f"}              
              />
            ), 
          }}  />
    </TabBus.Navigator>
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
      <Stack.Screen name="BottomTabAdmin" component={bottomTabAdminScreen} options={{
            title:""
          }}/>
      <Stack.Screen name="BottomTabBus" component={bottomTabBusScreen} options={{
            title:""
          }}/>  

    </Stack.Navigator>
    </NavigationContainer>
  );
}
