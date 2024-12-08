import React from 'react'
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { appColors } from '../constants/appColors'

interface Props {
  icon?: React.JSX.Element
  bgr?: string
  border?: string
  onPrees?: () => (void)
  styles?: StyleProp<ViewStyle>;
  height?: number
  width?: number
}
const ButtonIcconComponent = (props: Props) => {

  const { bgr, border, icon, onPrees, styles, height, width } = props

  return (
    <TouchableOpacity
      onPress={onPrees}
      style={[
        styles,
        {
          backgroundColor: bgr ? bgr : appColors.gray1,
          borderRadius: border ? border : 15,
          height: height ? height : 50,
          width: width ? width : 50,
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]}>
      {icon}
    </TouchableOpacity>
  )
}

export default ButtonIcconComponent