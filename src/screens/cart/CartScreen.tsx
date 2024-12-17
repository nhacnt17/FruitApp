import { Add, Minus } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axiosInstance from '../../apiServices/api';
import { ButtonIcconComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { appSize } from '../../constants/appSize';
import { appStyles } from '../../styles/appStyles';

const CartScreen = ({ deviceId, productId, initialQuantity }: any) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1); // Khởi tạo giá trị dạng chuỗi
  const [quantity, setQuantity] = useState(initialQuantity);



  useEffect(() => {
    const fetchCart = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();

        const items = await axiosInstance.get('/cart/get-list', {
          params: { deviceId },
        });

        console.log('Response:', items.data); // Log dữ liệu phản hồi
        setCartItems(items.data.cart);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [],);


  const increaseQuantity = async () => {
    try {
      const response = await axiosInstance.post('/cart/increase-quantity', {
        deviceId,
        productId,
      });
      if (response.status === 200) {
        setQuantity((prevQuantity: number) => prevQuantity + 1);
      }
    } catch (error) {
      console.error('Error increasing quantity:');
    }
  };

  const decreaseQuantity = async () => {
      const response = await axiosInstance.post('cart/decrease-quantity', {
        deviceId,
        productId,
      });
      if (response.status === 200) {
        setQuantity((prevQuantity: number) => prevQuantity - 1);
      }
    }


  // Hiển thị loader nếu đang tải dữ liệu
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
            extraData={cartItems} // Đảm bảo FlatList theo dõi thay đổi trong state
            data={cartItems}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image
                  source={require('../../assets/images/nho.png')}
                  style={{ width: appSize.wid * 0.2, height: appSize.hei * 0.15, }}
                />
                <SpaceComponent width={16} />

                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <TextComponent text={item.product.name} type='type2' fontSize={16} />
                  <TextComponent text={item.product.group} type='type1' />
                  <SpaceComponent height={appSize.hei * 0.03} />
                  <RowComponent alignItems='flex-start'>
                    <TextComponent text={item.product.price} type='type2' fontSize={16} color='#ff6600' />
                    <Text> /kg</Text>
                  </RowComponent>
                </View>

                <View>

                  {/* Nút trừ */}
                  <ButtonIcconComponent
                    onPrees={decreaseQuantity}
                    bgr="#fff"
                    icon={<Minus size={22} color={appColors.gray3} />}
                  />
                  {/* Text */}
                  <TextComponent styles={{ width: 40 }}
                    center
                    type='type'
                    text={(item.quantity)}
                  />
                  {/* Nút cộng */}
                  <ButtonIcconComponent
                    onPrees={increaseQuantity}
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
    color: 'gray' },

  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },

  itemText: { 
    fontSize: 16 
  },
});
