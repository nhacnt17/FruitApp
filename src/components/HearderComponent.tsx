import { useNavigation } from '@react-navigation/native';
import { ArrowLeft2, Heart } from 'iconsax-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appColors } from '../constants/appColors';
import ButtonIconComponent from './ButtonIconComponent';

interface Props {
    title?: string;
}

const HearderComponent = ({ title }: Props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ButtonIconComponent
                height={45}
                icon={<ArrowLeft2 size="24" color={appColors.black} />}
                onPrees={() => navigation.goBack()} 
            />
            <Text style={styles.title}>{title}</Text>
            <ButtonIconComponent
                height={45}
                icon={<Heart size="24" color={appColors.black} />}
                // onPrees={() => navigation.goBack()} 
            />
        </View>
    );
};

export default HearderComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: appColors.white,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
        color: appColors.black,
        textAlign: 'center',
    },
});
