import { Heart } from 'iconsax-react-native'
import React, { ReactNode } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { appColors } from '../constants/appColors'
import ButtonIconComponent from './ButtonIconComponent'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'

interface Props {
  linkIMG?: string
  textProduct?: string
  groupProduct?: string
  priceProduct?: string
  iconCart?: ReactNode
  units?: | 'kg' | 'L'
  onPrees?: () => (void)
  onPreesbtn?: () => (void)
  isFavourite: boolean

}

const ItemVerticalComponent = (props: Props) => {

  const { iconCart, linkIMG, priceProduct, textProduct, groupProduct, units, onPrees, onPreesbtn, isFavourite } = props

  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={onPrees}>
        
        <View style={styles.viewImg}>
          <Image
            source={require('../assets/images/nho.png')}
            style={{ width: 100, height: 100 }} 
          />
        </View>

        <View style={{ marginLeft: 8, marginTop: 8, marginRight: 8 }}>
          <TextComponent text={groupProduct ?? 'Fruit'} type='type1' fontSize={10} />
          <TextComponent text={textProduct ?? 'Nho Americal'} type='type2' fontSize={14} />
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent text={priceProduct ?? '2000'} type='type2' fontSize={14} />
            {
              units === 'L'
                ? <TextComponent text=' /L' type='type1' fontSize={14} />
                : <TextComponent text=' /Kg' type='type1' fontSize={14} />
            }
            <SpaceComponent flex={1} />
            <ButtonIconComponent
              onPrees={onPreesbtn}
              border={50} height={35} width={35}
              icon={
                isFavourite
                  ? <Heart size="24" variant="Bold" color={appColors.primary} />
                  : <Heart size="24" color={appColors.primary} />}
            />
          </RowComponent>
        </View>

      </TouchableOpacity>
    </View>
  )
}

export default ItemVerticalComponent

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: '47%',
    backgroundColor: appColors.white,
    marginBottom: '5%',
    borderRadius: 20,
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    // Shadow cho Android
    elevation: 3,
  },
  viewImg: {
    justifyContent: 'center',
    height: 120,
    width: '100%',
    backgroundColor: appColors.gray1,
    borderRadius: 20,
    alignItems: 'center'
  }
})
