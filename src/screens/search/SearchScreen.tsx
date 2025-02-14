import { BagTick2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axiosInstance from '../../apiServices/api';
import { ButtonIconComponent, RowComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { appSize } from '../../constants/appSize';
import { appStyles } from '../../styles/appStyles';

const SearchScreen = ({ navigation }: any) => {
  const [textinput, setTextInput] = useState('');
  const [data, setData] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]); // Quản lý giỏ hàng

  // Lấy deviceId từ thiết bị
  const fetchDeviceId = async () => {
    const id = await DeviceInfo.getUniqueId();
    setDeviceId(id);
  };

  // Tìm kiếm sản phẩm theo tên
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/product/get-list?name=${textinput}`);
      setData(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (productId: number) => {
    try {
      // Tìm sản phẩm trong giỏ hàng
      const existingProduct = cartItems.find((item) => item.product.id === productId);

      let newQuantity = 1; // Số lượng mặc định là 1 nếu sản phẩm chưa có trong giỏ hàng

      // Nếu sản phẩm đã có trong giỏ hàng, cộng thêm 1 vào số lượng
      if (existingProduct) {
        newQuantity = existingProduct.quantity + 1;
      }

      // Cập nhật giỏ hàng ở local state
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
        if (!existingProduct) {
          updatedItems.push({ product: { id: productId }, quantity: newQuantity });
        }
        return updatedItems;
      });

      const deviceId = await DeviceInfo.getUniqueId();

      // Gửi API để cập nhật số lượng sản phẩm vào giỏ hàng
      await axiosInstance.post('/cart/pushCart', {
        deviceId,
        productId,
        quantity: newQuantity,
      });

    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  // Gọi fetchData và fetchDeviceId khi màn hình load
  useEffect(() => {
    fetchData();
    fetchDeviceId();
  }, [textinput]);

  return (
    <View>
      <SpaceComponent height={50} />
      <TextInput style={{ backgroundColor: appColors.gray3 }} onChangeText={setTextInput} />

      <View>
        {data.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('DetailScreen', { id: item.id })}
          >
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/images/nho.png')}
                style={{ width: appSize.wid * 0.25, height: appSize.hei * 0.12 }}
              />
              <SpaceComponent width={16} />

              <View style={{ justifyContent: 'center', flex: 1 }}>
                <TextComponent text={item.name} type="type2" fontSize={16} />
                <TextComponent text={item.group} type="type1" />
                <SpaceComponent height={appSize.hei * 0.03} />
                <RowComponent alignItems="flex-start">
                  <TextComponent text={item.price} type="type2" fontSize={16} color="#ff6600" />
                  <Text> /kg</Text>
                </RowComponent>
              </View>

              <View style={appStyles.center}>
                <ButtonIconComponent
                  onPrees={() => handleAddToCart(item.id)} // Đã sửa lại thành onPress
                  bgr="#fff"
                  icon={<BagTick2 size="48" color="#FF8A65" variant="Bold" />}
                />
              </View>
              <SpaceComponent width={16} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    margin: 15,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});
