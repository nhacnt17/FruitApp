import React, { ReactNode } from 'react'
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { appColors } from '../constants/appColors'

interface Props {
  icon?: ReactNode
  bgr?: string
  border?: number
  onPrees?: () => (void)
  styles?: StyleProp<ViewStyle>;
  height?: number
  width?: number
}
const ButtonIconComponent = (props: Props) => {

  const { bgr, border, icon, onPrees, styles, height, width } = props

  return (
    <TouchableOpacity
      onPress={onPrees}
      style={[
        styles,
        {
          backgroundColor: bgr ?? appColors.gray1,
          borderRadius: border ?? 15,
          height: height ?? 50,
          width: width ?? 50,
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]}>
      {icon}
    </TouchableOpacity>
  )
}

export default ButtonIconComponent