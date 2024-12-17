import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CartScreen, FavouriteScreen, HomeScreen, ProfileScreen, SearchScreen } from '../screens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name='SearchScreen' component={SearchScreen} />
      <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='FavouriteScreen' component={FavouriteScreen} />
      <Tab.Screen name='CartScreen' component={CartScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator