import React, { useEffect, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { appColors } from '../constants/appColors'
import { appFonts } from '../constants/appFonts'
import ButtonIconComponent from './ButtonIconComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'

interface Props {
  handelGetData: (group: string) => void
}

const CategoriesComponent = (props: Props) => {
  const { handelGetData } = props
  const [active, setActive] = useState("fruit")

  useEffect(() => {
    handelGetData(active)
  }, [active])

  // Mảng chứa dữ liệu các sản phẩm
  const categories = [
    {
      id: 0,
      name: 'fruit',
      iconActive: require('../assets/images/fruit-white.png'),
      iconInactive: require('../assets/images/fruit-black.png'),
    },
    {
      id: 1,
      name: 'vegetable',
      iconActive: require('../assets/images/vegetable-white.png'),
      iconInactive: require('../assets/images/vegetable-black.png'),
    },
    {
      id: 2,
      name: 'Nuts',
      iconActive: require('../assets/images/nuts-white.png'),
      iconInactive: require('../assets/images/nuts-black.png'),
    },
    {
      id: 3,
      name: 'Milk',
      iconActive: require('../assets/images/milk-white.png'),
      iconInactive: require('../assets/images/milk-black.png'),
    },
    {
      id: 4,
      name: 'Wheat',
      iconActive: require('../assets/images/wheat-white.png'),
      iconInactive: require('../assets/images/wheat-black.png'),
    },
  ]

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <View style={{ alignItems: 'center' }} key={category.id}>
          <ButtonIconComponent
            onPrees={() => {
              setActive(category.name) 
            }}
            styles={{ marginHorizontal: 16, marginBottom: 8 }}
            height={60}
            width={60}
            bgr={active === category.name ? appColors.primary : appColors.gray1}
            icon={
              active === category.name ? (
                <Image
                  source={category.iconActive}
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <Image
                  source={category.iconInactive}
                  style={{ width: 30, height: 30 }}
                />
              )
            }
          />
          <TextComponent text={category.name} type="type1" fontFamily={appFonts.SemiBold} />
        </View>
      ))}
      <SpaceComponent width={16} />
    </ScrollView>
  )
}

export default CategoriesComponent
