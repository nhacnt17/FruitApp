import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { CloseSquare } from 'iconsax-react-native';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axiosInstance from '../../apiServices/api';
import { ButtonIcconComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { appSize } from '../../constants/appSize';
import { appStyles } from '../../styles/appStyles';
import Toast from 'react-native-toast-message';

const FavouriteScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const handleRemoveFavourite = async (productId: number) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      if (!deviceId) return;
      const body = { deviceId, productId };
      const deleteResponse = await axiosInstance.delete(`/favourites/remove`, { data: body });
      if (deleteResponse.status === 200) {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể xóa sản phẩm.',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };


  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        try {
          const deviceId = await DeviceInfo.getUniqueId();
          const response = await axiosInstance.get('/favourites/get-list', { params: { deviceId } });
          setCartItems(Array.isArray(response.data.favourites) ? response.data.favourites : []);
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
        <Text style={styles.title}>Favourites</Text>

        {Array.isArray(cartItems) && cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item?.product?.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => (navigation as any).navigate('DetailScreen', { id: item.product.id })}
              >
                <View style={styles.itemContainer2}>
                  <View style={styles.itemContainer}>
                    <ButtonIcconComponent
                      border={10}
                      width={35}
                      height={35}
                      onPrees={() => handleRemoveFavourite(item.product.id)}
                      bgr="#fff"
                      icon={<CloseSquare size={22} color="#FF6600" />}
                    />
                    <SpaceComponent width={16} />
                    <View style={{ flex: 1 }}>
                      <TextComponent text={item?.product?.name} type="type2" fontSize={14} />
                      <TextComponent text={item?.product?.group} type="type1" />
                      <SpaceComponent height={appSize.hei * 0.03} />
                      <RowComponent>
                        <TextComponent text={`${item?.product?.price} /kg`} type="type2" fontSize={16} color="#ff6600" />
                      </RowComponent>
                    </View>
                  </View>
                  <Image source={require('../../assets/images/nho.png')} style={styles.image} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavouriteScreen;

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
    backgroundColor: appColors.primary2,
    padding: 10,
    width: appSize.wid - 32,
    height: appSize.hei * 0.13,
    marginVertical: 5,
    borderRadius: 5
  },

  itemContainer2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: appSize.hei * 0.18,
    marginVertical: 5,
    borderRadius: 5
  },

  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: appSize.wid * 0.4,
    height: appSize.hei * 0.16
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
