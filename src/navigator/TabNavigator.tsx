import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CartNavigator from './CartNavigator';
import FavouriteNavigator from './FavouriteNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='HomeNavigator'
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name='SearchNavigator' component={SearchNavigator} />
      <Tab.Screen name='ProfileNavigator' component={ProfileNavigator} />
      <Tab.Screen name='HomeNavigator' component={HomeNavigator} />
      <Tab.Screen name='FavouriteNavigator' component={FavouriteNavigator} />
      <Tab.Screen name='CartNavigator' component={CartNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator