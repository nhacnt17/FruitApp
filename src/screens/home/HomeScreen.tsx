import { useFocusEffect } from '@react-navigation/core'
import { NotificationBing, SearchNormal1 } from 'iconsax-react-native'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import axiosInstance from '../../apiServices/api'
import { ButtonIconComponent, ItemVerticalComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import CategoriesComponent from '../../components/CategoriesComponent'
import { appColors } from '../../constants/appColors'
import { appFonts } from '../../constants/appFonts'
import { appSize } from '../../constants/appSize'
import { appStyles } from '../../styles/appStyles'

const HomeScreen = ({ navigation }: any) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState<number[]>([]);


  const fetchData = async (group: string) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/product/get-list?group=${group}`);
      setData(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };


  const loadFavourites = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      if (!deviceId) return;
      const response = await axiosInstance.get(`/favourites/get-list?deviceId=${deviceId}`);
      if (response.data && response.data.favourites) {
        const favouritesList = response.data.favourites.map((item: any) => item.product.id);
        setFavourites(favouritesList);
      }
    } catch (error) {
      console.error('Không thể tải danh sách yêu thích từ API', error);
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
          setFavourites(prev => prev.filter(id => id !== productId)); // Remove from local state
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
          setFavourites(prev => [...prev, productId]); // Add to local state
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


  useFocusEffect(
    useCallback(() => {
      fetchData('fruit');
      loadFavourites();
    }, [])
  );


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
            <ButtonIconComponent
              height={45}
              width={45}
              icon={<NotificationBing size="24" color="#000000" />}
            />
          </RowComponent>
          <SpaceComponent height={16} />

          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <View style={styles.Search}>
              <SpaceComponent width={16} />
              <TextComponent text='Search product...' type='type1' center />
              <SpaceComponent flex={1} />
              <SearchNormal1 size="22" color="gray" />
              <SpaceComponent width={16} />
            </View>
          </TouchableOpacity>
          <SpaceComponent height={16} />

          <View style={{ height: appSize.hei * 0.18 }} >
            <Image
              source={require('../../assets/images/bannertraicau.jpg')}
              style={{ height: appSize.hei * 0.18, width: appSize.wid - 32, }}
            />
          </View>
          <SpaceComponent height={16} />

          <TextComponent text='Categories' type='type' fontFamily={appFonts.Bold} />
          <SpaceComponent height={16} />
          <CategoriesComponent handelGetData={(data) => fetchData(data)} />
        </View>

        {
          data.length === 0 ? (
            <View style={appStyles.center}>
              <Text style={{ textAlign: 'center' }}>There are no products yet</Text>
            </View>
          ) : loading ? (
            <View style={appStyles.center}>
              <Text style={{ textAlign: 'center' }}>Loading.....</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 16 }}>
              {data.map((item: any) => (
                <ItemVerticalComponent
                  key={item.id}
                  onPreesbtn={() => handleAddToFavourite(item.id)}
                  onPrees={() => navigation.navigate('DetailScreen', { id: item.id })}
                  textProduct={item.name}
                  groupProduct={item.group}
                  priceProduct={item.price}
                  isFavourite={favourites.includes(item.id)}
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
