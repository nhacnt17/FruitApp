import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { HearderComponent, SpaceComponent } from '../../components'
import { appStyles } from '../../styles/appStyles'

const CartScreen = () => {
  return (
    <SafeAreaView style={appStyles.container}>
    <View style={[appStyles.content, ]}>
      <SpaceComponent height={16}/>
      <Text>CartScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default CartScreen