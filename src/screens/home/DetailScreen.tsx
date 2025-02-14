import { useNavigation } from '@react-navigation/core';
import { Add, ArrowLeft2, Heart, Minus } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../apiServices/api';
import { ButtonIconComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { appSize } from '../../constants/appSize';
import { appStyles } from '../../styles/appStyles';

const DetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [dataDetail, setDataDetail] = useState<any>(null);
  const [number, setNumber] = useState(1);
  const [ischeckFavourites, setIscheckFavourites] = useState(Boolean);
  const [favourites, setFavourites] = useState<number[]>([]);



  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/product/get-detail/${id}`);
      setDataDetail(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const handleAddToFavourite = async (productId: number) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      if (!deviceId) return;
      const body = { deviceId, productId };
      const favResponse = await axiosInstance.get(`/favourites/check?deviceId=${deviceId}&productId=${productId}`);
      if (favResponse.data.exists) {
        const deleteResponse = await axiosInstance.delete(`/favourites/remove`, { data: body });
        if (deleteResponse.status === 200) {
          setFavourites(prev => prev.filter(id => id !== productId)); 
          setIscheckFavourites(!ischeckFavourites)
          Toast.show({
            type: 'info',
            text1: 'Thông báo',
            text2: 'Sản phẩm đã bị xóa khỏi danh sách yêu thích.',
            position: 'top',
            visibilityTime: 2000,
          });
        }
      } else {
        const addResponse = await axiosInstance.post('/favourites/add', body);
        if (addResponse.status === 201) {
          setFavourites(prev => [...prev, productId]); 
          setIscheckFavourites(!ischeckFavourites)
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Sản phẩm đã được thêm vào yêu thích.',
            position: 'top',
            visibilityTime: 2000,
          });
        }
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Có lỗi xảy ra. Vui lòng thử lại.',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };


  const loadFavourites = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      if (!deviceId) return;
      const response = await axiosInstance.get(`/favourites/get-list?deviceId=${deviceId}`);
      if (response.data && response.data.favourites) {
        const favouritesList = response.data.favourites.map((item: any) => item.product.id);
        if (favouritesList.includes(id)) {
          setIscheckFavourites(true);
        } else {
          setIscheckFavourites(false);
        }
      }
    } catch (error) {
      console.error('Không thể tải danh sách yêu thích từ API', error);
    }
  };


  const addToCart = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const cartResponse = await axiosInstance.get('/cart/get-list', { params: { deviceId } });
      const cartItems = cartResponse.data.cart || [];
      const existingItem = cartItems.find((item: any) => item.product.id === id);
      const newQuantity = existingItem ? existingItem.quantity + number : number;
      await axiosInstance.post('/cart/pushCart', {
        deviceId,
        productId: id,
        quantity: newQuantity,
      });
      Toast.show({
        type: 'success',
        text1: 'Thêm vào giỏ hàng thành công!',
        text2: `${dataDetail?.name} - Số lượng: ${newQuantity}`,
        visibilityTime: 2000, 
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể thêm sản phẩm vào giỏ hàng',
        visibilityTime: 2000,
      });
    }
  };

  
  useEffect(() => {
    fetchData();
    loadFavourites();
  }, []);


  return (
    <>
      <ScrollView style={appStyles.container}>
        <View style={appStyles.content}>
          <SpaceComponent height={16} />

          <View style={styles.containerHearder}>
            <ButtonIconComponent
              height={45}
              icon={<ArrowLeft2 size="24" color={appColors.black} />}
              onPrees={() => navigation.goBack()}
            />
            <Text style={styles.titleHearder}>Detail</Text>
            <ButtonIconComponent
              height={45}
              onPrees={() => handleAddToFavourite(id)}
              icon={
                ischeckFavourites
                  ? <Heart variant='Bold' size={24} color="#FF6600" />
                  : <Heart size={24} color="#FF6600" />}
            />
          </View>

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
              <View style={styles.quantityContainer}>
                <ButtonIconComponent
                  onPrees={() => setNumber(Math.max(number - 1, 1))}
                  bgr="#fff"
                  icon={<Minus size={22} color={appColors.gray3} />}
                />
                <TextComponent styles={{ width: 40 }} center type="type" text={String(number)} />
                <ButtonIconComponent
                  onPrees={() => setNumber(Math.min(number + 1, 100))}
                  bgr="#fff"
                  icon={<Add size={22} color="#FF6600" />}
                />
              </View>
            </RowComponent>
          </View>
          <SpaceComponent height={appSize.hei * 0.2} />

          <ButtonIconComponent
            bgr="#ff6600"
            height={55}
            width={appSize.wid - 32}
            onPrees={addToCart}
            icon={<TextComponent text="Add to cart" type="type2" fontSize={14} color="#fff" />}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    borderColor: appColors.gray2,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
  },
  titleHearder: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    color: appColors.black,
    textAlign: 'center',
  },

  containerHearder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.white,
  },

});
