import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { appFonts } from '../constants/appFonts';

interface Props {
  color?: string
  fontSize?: number
  text?: string
  styles?: StyleProp<ViewStyle>
  fontFamily?: string
  type?: | 'type' | 'type1' | 'type2' | undefined
  center?: boolean
}

const TextComponent = (props: Props) => {
  const { color, text, fontSize, fontFamily, styles, type, center } = props

  const typeStyles = {
    type: { fontSize: fontSize ?? 16, color: color ?? appColors.gray4, fontFamily: fontFamily ?? appFonts.Medium, },
    type1: { fontSize: fontSize ?? 12, color: color ?? appColors.gray3, fontFamily: fontFamily ?? appFonts.Medium },
    type2: { fontSize: fontSize ?? 20, color: color ?? appColors.black2, fontFamily: fontFamily ?? appFonts.SemiBold },
  };

  const dynamicStyle = type ? typeStyles[type] : {};

  return (
    <Text style={[
      styles,
      dynamicStyle,
      center ? { textAlign: 'center' } : {}, 
    ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
