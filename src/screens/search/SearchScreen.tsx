import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axiosInstance from '../../apiServices/api'
import { ButtonIcconComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { appSize } from '../../constants/appSize'
import { BagTick2 } from 'iconsax-react-native'
import { appStyles } from '../../styles/appStyles'
import DeviceInfo from 'react-native-device-info'

const SearchScreen = ({navigation}: any) => {
  const [textinput, setTextInput] = useState("")
  const [data, setData] = useState([]);
  const [deviceId, setDeviceId] = useState('');


  const fetchData = async () => {
    try {
      //   setLoading(true);
      const response = await axiosInstance.get(`/product/get-list?name=${textinput}`);
      setData(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      //   setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const body = {
        deviceId, // Đảm bảo giá trị này không rỗng
        productId,
        quantity: 1,
      };

      console.log('Request body:', body); // Kiểm tra giá trị trước khi gửi

      const response = await axiosInstance.post('/cart/pushCart', body);
      console.log('Added to cart:', response.data);
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [textinput]);

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId(); // Lấy ID duy nhất của thiết bị
      setDeviceId(id);
    };
    fetchDeviceId()
  }, []);


  return (
    <View>
      <SpaceComponent height={50} />
      <TextInput style={{ backgroundColor: appColors.gray3 }}
        onChangeText={setTextInput}
      >
      </TextInput>

      <View>
        {data.map((item: any) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', { id: item.id })}
          >
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/images/nho.png')}
                style={{ width: appSize.wid * 0.25, height: appSize.hei * 0.12, }}
              />
              <SpaceComponent width={16} />

              <View style={{ justifyContent: 'center', flex: 1 }}>
                <TextComponent text={item.name} type='type2' fontSize={16} />
                <TextComponent text={item.group} type='type1' />
                <SpaceComponent height={appSize.hei * 0.03} />
                <RowComponent alignItems='flex-start'>
                  <TextComponent text={item.price} type='type2' fontSize={16} color='#ff6600' />
                  <Text> /kg</Text>
                </RowComponent>
              </View>

              <View style={appStyles.center}>
                <ButtonIcconComponent
                onPrees={() => handleAddToCart(item.id)}
                  bgr='#fff'
                  icon={
                    <BagTick2
                      size="48"
                      color="#FF8A65"
                      variant="Bold"
                    />
                  }
                />
              </View>
              <SpaceComponent width={16} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}


export default SearchScreen


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
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,

  },

  itemText: {
    fontSize: 16
  },
});
