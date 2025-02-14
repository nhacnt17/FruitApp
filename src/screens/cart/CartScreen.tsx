import { useFocusEffect } from '@react-navigation/core';
import { Add, Minus } from 'iconsax-react-native';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axiosInstance from '../../apiServices/api';
import { ButtonIconComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { appSize } from '../../constants/appSize';
import { appStyles } from '../../styles/appStyles';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);




  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === itemId ? { ...item, quantity: newQuantity } : item));
      const deviceId = await DeviceInfo.getUniqueId();
      await axiosInstance.post('/cart/pushCart', {
        deviceId,
        productId: itemId,
        quantity: newQuantity,
      });
      const totalResponse = await axiosInstance.get('/cart/total-price', { params: { deviceId } });
      setTotalPrice(totalResponse.data.totalPrice);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };


  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        try {
          const deviceId = await DeviceInfo.getUniqueId();
          const response = await axiosInstance.get('/cart/get-list', { params: { deviceId } });
          setCartItems(response.data.cart);
          const totalResponse = await axiosInstance.get('/cart/total-price', { params: { deviceId } });
          setTotalPrice(totalResponse.data.totalPrice);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }, [])
  );


  if (loading) {
    return (
      <SafeAreaView style={appStyles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={appStyles.container}>
      <View style={appStyles.content}>
        <SpaceComponent height={16} />
        <Text style={styles.title}>Cart Items</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={require('../../assets/images/nho.png')} style={styles.image} />
                <SpaceComponent width={16} />
                <View style={{ flex: 1 }}>
                  <TextComponent text={item?.product?.name} type="type2" fontSize={14} />
                  <TextComponent text={item?.product?.group} type="type1" />
                  <SpaceComponent height={appSize.hei * 0.03} />
                  <RowComponent>
                    <TextComponent text={`${item?.product?.price} /kg`} type="type2" fontSize={16} color="#ff6600" />
                  </RowComponent>
                </View>

                <View>
                  <ButtonIconComponent
                    border={10}
                    width={35}
                    height={35}
                    onPrees={() => handleQuantityChange(item?.product?.id, Math.max(item.quantity - 1, 0))}
                    bgr="#fff"
                    icon={<Minus size={22} color={appColors.gray3} />}
                  />
                  <TextComponent styles={{ width: 35 }} center type="type" fontSize={14} text={`${item.quantity}`} />
                  <ButtonIconComponent
                    border={10}
                    width={35}
                    height={35}
                    onPrees={() => handleQuantityChange(item?.product?.id, item.quantity + 1)}
                    bgr="#fff"
                    icon={<Add size={22} color="#FF6600" />}
                  />
                </View>
                <SpaceComponent width={16} />
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.footer}>
        <RowComponent>
          <TextComponent color={appColors.primary} fontSize={18} type='type1' text='Tổng tiền:' />
          <SpaceComponent flex={1} />
          <TextComponent color={appColors.primary} fontSize={20} type='type2' text={totalPrice.toLocaleString()} />
        </RowComponent>
        <SpaceComponent height={16} />
        <ButtonIconComponent
          bgr="#ff6600"
          height={55}
          width={appSize.wid - 32}
          // onPrees={addToCart}
          icon={<TextComponent text="Thanh Toán" type="type2" fontSize={14} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },

  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray'
  },

  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },

  image: {
    width: appSize.wid * 0.15,
    height: appSize.hei * 0.10
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.primary2,
    padding: 16,
  },

  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6600'
  }
});