import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appStyles } from '../../styles/appStyles'
import { ButtonIcconComponent, RowComponent } from '../../components'
import { Add } from 'iconsax-react-native'
import TextComponent from '../../components/TextComponent'
import { appFonts } from '../../constants/appFonts'

const HomeScreen = () => {
  return (
    <SafeAreaView style={appStyles.container}>
      <View style={appStyles.content}>
        <RowComponent>
          <TextComponent text='welcom chào Nguyễn Nhạc ! ' type='type' />
          <TextComponent text='welcom chào Nguyễn Nhạc ! ' type='type1' />
          <TextComponent text='welcom chào Nguyễn Nhạc ! ' type='type2' />
        </RowComponent>

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})