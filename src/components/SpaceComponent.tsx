import { View, Text } from 'react-native'
import React from 'react'

interface Props {
    height?: number
    width?: number
    flex?: number
    bgr?: string
}

const SpaceComponent = (props: Props) => {
    const { height, width, flex, bgr } = props
    return (
        <View style={{
            height: height,
            width: width,
            flex: flex ?? 0,
            backgroundColor: bgr
        }} />
    )
}

export default SpaceComponent