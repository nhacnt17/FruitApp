import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { TabNavigator } from './src/navigator';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        translucent={true} 
        backgroundColor="transparent" 
      />
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
