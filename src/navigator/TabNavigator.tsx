import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CartScreen, FavouriteScreen, HomeScreen, ProfileScreen } from '../screens';
import { Heart, Home, ShoppingCart, User } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Home color={color} size={28} style={{ marginTop: 20 }} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name='FavouriteScreen'
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Heart color={color} size={28} style={{ marginTop: 20 }} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name='CartScreen'
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ShoppingCart color={color} size={28} style={{ marginTop: 20 }} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <User color={color} size={28} style={{ marginTop: 20 }} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator;
