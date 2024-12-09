import React, { useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { appColors } from '../constants/appColors'
import { appFonts } from '../constants/appFonts'
import ButtonIcconComponent from './ButtonIcconComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'

const CategoriesComponent = () => {

  const [btnCheck, setBtnCheck] = useState(0)

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center' }}>
        <ButtonIcconComponent
          onPrees={() => setBtnCheck(0)}
          styles={{ marginBottom: 8 }}
          height={60}
          width={60}
          bgr={btnCheck === 0 ? appColors.primary : appColors.gray1}
          icon={
            btnCheck === 0 ?
              <Image
                source={require('../assets/images/fruit-white.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              /> :
              <Image
                source={require('../assets/images/fruit-black.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              />
          }
        />
        <TextComponent text='fruit' type='type1' fontFamily={appFonts.SemiBold} />
      </View>
      <SpaceComponent width={16} />
      <View style={{ alignItems: 'center' }}>
        <ButtonIcconComponent
          onPrees={() => setBtnCheck(1)}
          styles={{ marginHorizontal: 16, marginBottom: 8 }}
          height={60}
          width={60}
          bgr={btnCheck === 1 ? appColors.primary : appColors.gray1}
          icon={
            btnCheck === 1 ?
              <Image
                source={require('../assets/images/vegetable-white.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              /> :
              <Image
                source={require('../assets/images/vegetable-black.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              />
          }
        />
        <TextComponent text='vegetable' type='type1' fontFamily={appFonts.SemiBold} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <ButtonIcconComponent
          onPrees={() => setBtnCheck(2)}
          styles={{ marginHorizontal: 16, marginBottom: 8 }}
          height={60}
          width={60}
          bgr={btnCheck === 2 ? appColors.primary : appColors.gray1}
          icon={
            btnCheck === 2 ?
              <Image
                source={require('../assets/images/nuts-white.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              /> :
              <Image
                source={require('../assets/images/nuts-black.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              />
          }
        />
        <TextComponent text='Nuts' type='type1' fontFamily={appFonts.SemiBold} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <ButtonIcconComponent
          onPrees={() => setBtnCheck(3)}
          styles={{ marginHorizontal: 16, marginBottom: 8 }}
          height={60}
          width={60}
          bgr={btnCheck === 3 ? appColors.primary : appColors.gray1}
          icon={
            btnCheck === 3 ?
              <Image
                source={require('../assets/images/milk-white.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              /> :
              <Image
                source={require('../assets/images/milk-black.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              />
          }
        />
        <TextComponent text='Milk' type='type1' fontFamily={appFonts.SemiBold} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <ButtonIcconComponent
          onPrees={() => setBtnCheck(4)}
          styles={{ marginHorizontal: 16, marginBottom: 8 }}
          height={60}
          width={60}
          bgr={btnCheck === 4 ? appColors.primary : appColors.gray1}
          icon={
            btnCheck === 4 ?
              <Image
                source={require('../assets/images/wheat-white.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              /> :
              <Image
                source={require('../assets/images/wheat-black.png')}
                style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
              />
          }
        />
        <TextComponent text='Milk' type='type1' fontFamily={appFonts.SemiBold} />
      </View>
    </ScrollView>
  )
}

export default CategoriesComponent