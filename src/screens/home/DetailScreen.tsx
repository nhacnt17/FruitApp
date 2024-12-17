import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TextInputComponent, View } from 'react-native';
import { ButtonIcconComponent, HearderComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appStyles } from '../../styles/appStyles';
import { appColors } from '../../constants/appColors';
import { Add, Minus } from 'iconsax-react-native';
import { appSize } from '../../constants/appSize';
import axiosInstance from '../../apiServices/api';

const DetailScreen = ({ route }: any) => {
  const { id } = route.params;

  const [dataDetail, setDataDetail] = useState<any>();
  const [number, setNumber] = useState(1); // Khởi tạo giá trị dạng chuỗi

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
        <View style={{ height: appSize.hei * 0.15 }}>
          <RowComponent>
            <View style={{ flex: 1 }}>
              <TextComponent text={dataDetail?.group} type="type1" />
              <TextComponent text={dataDetail?.name} type="type2" />
              <TextComponent text={dataDetail?.price} type="type2" fontSize={16} color="#FF6600" />
            </View>
            <View style={{ flexDirection: 'row', borderColor: appColors.gray2, borderRadius: 10, borderWidth: 2, alignItems: 'center' }}>
              {/* Nút trừ */}
              <ButtonIcconComponent
                onPrees={() => setNumber(number>1 ? number-1 : number-0)}
                bgr="#fff"
                icon={<Minus size={22} color={appColors.gray3} />}
              />
              {/* Text */}
              <TextComponent styles={{ width: 40 }}
                center
                type='type'
                text={String(number)}
              />
              {/* Nút cộng */}
              <ButtonIcconComponent
                onPrees={() => setNumber(number<100 ? number+1 : number+0)}
                bgr="#fff"
                icon={<Add size={22} color="#FF6600" />}
              />
            </View>
          </RowComponent>
        </View>
        <SpaceComponent height={appSize.hei * 0.2} />
        <ButtonIcconComponent
          bgr='#ff6600'
          height={55}
          width={appSize.wid - 32}
          icon={
            <View>
              <TextComponent text='Add to cart' type='type2' fontSize={14} color='#fff' />
            </View>
          } />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
});
