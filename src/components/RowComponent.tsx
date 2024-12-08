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
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const RowComponent = (props: Props) => {
  const { styles, justify, children, } = props;

  return (
    <View style={
      [
        styles,
        {
          justifyContent: justify ?? 'center',
        }
      ]}>
      {children}
    </View>
  )
}

export default RowComponent;
