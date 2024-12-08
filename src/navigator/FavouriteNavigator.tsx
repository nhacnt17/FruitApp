import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { FavouriteScreen } from '../screens';

const FavouriteNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
     <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name='FavouriteScreen' component={FavouriteScreen} />
    </Stack.Navigator>
    )
}

export default FavouriteNavigator