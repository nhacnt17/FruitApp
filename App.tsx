import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { MainStack } from './src/navigator';
import { appStyles } from './src/styles/appStyles';

const App = () => {
  return (
    <SafeAreaView style={appStyles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true} 
        backgroundColor="transparent" 
      />
     <MainStack/>
    </SafeAreaView>
  );
};

export default App;
