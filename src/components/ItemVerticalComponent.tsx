import React, { ReactNode } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { appColors } from '../constants/appColors'
import TextComponent from './TextComponent'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import ButtonIcconComponent from './ButtonIcconComponent'
import { Add, HeartAdd } from 'iconsax-react-native'

interface Props {
  linkIMG?: string
  textProduct?: string
  groupProduct?: string
  priceProduct?: string
  iconCart?: ReactNode
  units?: | 'kg' | 'L'
}

const ItemVerticalComponent = (props: Props) => {

  const { iconCart, linkIMG, priceProduct, textProduct, groupProduct, units } = props

  return (
    <View style={styles.container}>
      <View style={styles.viewImg}>
        <Image
          source={require('../assets/images/nho.png')}
          style={{ width: 100, height: 100 }} // Điều chỉnh kích thước ảnh cho phù hợp
        />
      </View>
      <View style={{ marginLeft: 8, marginTop: 8, marginRight: 8 }}>
        <TextComponent text={groupProduct ?? 'Fruit'}  type='type1' fontSize={10} />
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
          <ButtonIcconComponent border={50} height={35} width={35}
            icon={<Add size={24} />} />
        </RowComponent>
      </View>
    </View>
  )
}

export default ItemVerticalComponent

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: '42.5%',
    backgroundColor: appColors.white,
    marginLeft:'5%',
    marginBottom:'4%',
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
