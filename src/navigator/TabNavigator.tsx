import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CartScreen, FavouriteScreen, HomeScreen, ProfileScreen } from '../screens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='FavouriteScreen' component={FavouriteScreen} />
      <Tab.Screen name='CartScreen' component={CartScreen} />
      <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator