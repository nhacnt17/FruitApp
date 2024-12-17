import { NotificationBing, SearchNormal1 } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { SafeAreaView } from 'react-native-safe-area-context'
import axiosInstance from '../../apiServices/api'
import { ButtonIcconComponent, ItemVerticalComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import CategoriesComponent from '../../components/CategoriesComponent'
import { appFonts } from '../../constants/appFonts'
import { appSize } from '../../constants/appSize'
import { appStyles } from '../../styles/appStyles'
import { appColors } from '../../constants/appColors'

const HomeScreen = ({ navigation }: any) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  const fetchData = async (group: string) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/product/get-list?group=${group}`);
      setData(response.data);
      // console.log('Thành công');
      setLoading(false)
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
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
    fetchData('fruit')
  }, [])

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId(); // Lấy ID duy nhất của thiết bị
      setDeviceId(id);
    };
    fetchDeviceId()
  }, []);


  return (
    <SafeAreaView style={appStyles.container}>
      <ScrollView>
        <View style={appStyles.content}>

          <SpaceComponent height={10} />

          <RowComponent>
            <View>
              <TextComponent text='WelCome !' type='type1' fontSize={16} />
              <TextComponent text='Nguyen Nhac' type='type2' />
            </View>
            <SpaceComponent flex={1} />
            <ButtonIcconComponent
              height={45}
              width={45}
              icon={<NotificationBing size="24" color="#000000" />}
            />
          </RowComponent>

          <SpaceComponent height={16} />

          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <View style={styles.Search}>
              <SpaceComponent width={16} />
              <TextComponent text='Search product...' type='type1' center />
              <SpaceComponent flex={1} />
              <SearchNormal1 size="22" color="gray" />
              <SpaceComponent width={16} />
            </View>
          </TouchableOpacity>

          <SpaceComponent height={16} />
          <SpaceComponent height={appSize.hei * 0.20} bgr='gray' />
          <SpaceComponent height={16} />

          <TextComponent text='Categories' type='type' fontFamily={appFonts.Bold} />

          <SpaceComponent height={16} />

          <CategoriesComponent handelGetData={(data) => fetchData(data)} />
        </View>

        {
          data.length === 0 ? (
            <View style={appStyles.center}>
              <Text style={{ textAlign: 'center' }}>Đéo có data</Text>
            </View>
          ) : loading ? (
            <View style={appStyles.center}>
              <Text style={{ textAlign: 'center' }}>Loading.....</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 16 }}>
              {data.map((item: any) => (
                <ItemVerticalComponent
                  key={item.id} // Thêm key để React nhận diện item duy nhất
                  onPreesbtn={() => handleAddToCart(item.id)}
                  onPrees={() => navigation.navigate('DetailScreen', { id: item.id })}
                  textProduct={item.name}
                  groupProduct={item.group}
                  priceProduct={item.price}
                />
              ))}
            </View>
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  Search: {
    width: appSize.wid - 32,
    height: 50,
    backgroundColor: appColors.gray1,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row'
  }
})
