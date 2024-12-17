import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ButtonIcconComponent, HearderComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appStyles } from '../../styles/appStyles';
import { appColors } from '../../constants/appColors';
import { Add, Minus } from 'iconsax-react-native';
import { appSize } from '../../constants/appSize';
import axiosInstance from '../../apiServices/api';

const DetailScreen = ({ route }: any) => {
  const { id } = route.params;

  const [dataDetail, setDataDetail] = useState<any>();
  const [number, setNumber] = useState('1.0'); // Khởi tạo giá trị dạng chuỗi

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/product/get-detail/${id}`);
      setDataDetail(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleInputChange = (text: string) => {
    if (/^\d*\.?\d*$/.test(text)) { // Chỉ cho phép số và dấu chấm thập phân
      const numericValue = parseFloat(text) || 0;
      setNumber(numericValue >= 0.5 ? text : ''); // Không cho phép nhỏ hơn 0.5
    }
  };

  const handleDecrement = () => {
    const currentNumber = parseFloat(number) || 0;
    const updatedNumber = Math.max(currentNumber - 1, 0.5).toFixed(1); // Không giảm dưới 0.5
    setNumber(updatedNumber);
  };

  const handleIncrement = () => {
    const currentNumber = parseFloat(number) || 0;
    const updatedNumber = (currentNumber + 1).toFixed(1);
    setNumber(updatedNumber);
  };

  return (
    <ScrollView style={appStyles.container}>
      <View style={appStyles.content}>
        <SpaceComponent height={16} />
        <HearderComponent />
        <View style={[{ height: appSize.hei * 0.45 }, appStyles.center]}>
          <View style={{ backgroundColor: appColors.gray1, height: 270, width: 270, borderRadius: 200 }} />
          <Image
            source={require('../../assets/images/nho.png')}
            style={{ width: '100%', height: '100%', position: 'absolute', flex: 1 }}
          />
        </View>
        <RowComponent>
          <View style={{ flex: 1 }}>
            <TextComponent text={dataDetail?.group} type="type1" />
            <TextComponent text={dataDetail?.name} type="type2" />
            <TextComponent text={dataDetail?.price} type="type2" fontSize={16} color="#FF6600" />
          </View>
          <View style={{ flexDirection: 'row', borderColor: appColors.gray2, borderRadius: 10, borderWidth: 2 }}>
            {/* Nút trừ */}
            <ButtonIcconComponent
              onPrees={handleDecrement}
              bgr="#fff"
              icon={<Minus size={22} color={appColors.gray3} />}
            />
            {/* TextInput */}
            <TextInput
              style={{ width: 45, textAlign: 'center', fontSize: 18 }}
              maxLength={4}
              keyboardType="numeric"
              value={number}
              onChangeText={handleInputChange}
            />
            {/* Nút cộng */}
            <ButtonIcconComponent
              onPrees={handleIncrement}
              bgr="#fff"
              icon={<Add size={22} color="#FF6600" />}
            />
          </View>
        </RowComponent>
        <SpaceComponent height={100}/>
        <ButtonIcconComponent 
        bgr='#ff6600'
        height={55}
        width={appSize.wid-32}
        icon={
          <View>
            <TextComponent text='Add to cart' type='type2' fontSize={14} color='#fff'/>
          </View>
        }/>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
});
