import React, { ReactNode } from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  justify?:
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;
  alignItems?:
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | undefined;
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const RowComponent = (props: Props) => {
  const { styles, justify, children, alignItems } = props;

  return (
    <View style={
      [
        styles,
        {
          flexDirection: 'row',
          justifyContent: justify ?? 'flex-start',
          alignItems: alignItems ?? 'center'
        }
      ]}>
      {children}
    </View>
  )
}

export default RowComponent;
