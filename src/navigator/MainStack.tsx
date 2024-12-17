import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DetailScreen, SearchScreen } from '../screens';
import TabNavigator from './TabNavigator';

const MainStack = () => {
    const RootStack = createNativeStackNavigator()
  return (
     <NavigationContainer>
      <RootStack.Navigator>
        {/* MainTabs sẽ chứa Tab Navigator */}
        <RootStack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <RootStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


export default MainStack