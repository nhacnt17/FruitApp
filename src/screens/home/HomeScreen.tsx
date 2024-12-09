import { NotificationBing } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-svg'
import axiosInstance from '../../apiServices/api'
import { ButtonIcconComponent, ItemVerticalComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import CategoriesComponent from '../../components/CategoriesComponent'
import { appFonts } from '../../constants/appFonts'
import { appSize } from '../../constants/appSize'
import { appStyles } from '../../styles/appStyles'

// // Dữ liệu mẫu cho các sản phẩm
// const data = [
//   {
//     id: '1',
//     linkIMG: 'nho.png',
//     textProduct: 'Nho California',
//     groupProduct: 'Fruit',
//     priceProduct: '20000',
//     units: 'kg',
//   },
//   {
//     id: '2',
//     linkIMG: 'apple.png',
//     textProduct: 'Táo Fuji',
//     groupProduct: 'Fruit',
//     priceProduct: '15000',
//     units: 'kg',
//   },
//   {
//     id: '3',
//     linkIMG: 'banana.png',
//     textProduct: 'Chuối Tây',
//     groupProduct: 'Fruit',
//     priceProduct: '12000',
//     units: 'kg',
//   },
//   {
//     id: '4',
//     linkIMG: 'grapes.png',
//     textProduct: 'Nho Đen',
//     groupProduct: 'Fruit',
//     priceProduct: '18000',
//     units: 'kg',
//   },
//   {

//     id: '5',
//     linkIMG: 'nho.png',
//     textProduct: 'Nho California',
//     groupProduct: 'Fruit',
//     priceProduct: '20000',
//     units: 'kg',
//   },
//   {
//     id: '6',
//     linkIMG: 'apple.png',
//     textProduct: 'Táo Fuji',
//     groupProduct: 'Fruit',
//     priceProduct: '15000',
//     units: 'kg',
//   },
//   {
//     id: '6',
//     linkIMG: 'banana.png',
//     textProduct: 'Chuối Tây',
//     groupProduct: 'Fruit',
//     priceProduct: '12000',
//     units: 'kg',
//   },
//   {
//     id: '7',
//     linkIMG: 'grapes.png',
//     textProduct: 'Nho Đen',
//     groupProduct: 'Fruit',
//     priceProduct: '18000',
//     units: 'kg',
//   },
// ];

const HomeScreen = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (group: string) => {
    console.log(axiosInstance);
    
    try {
      const response = await axiosInstance.get(`/product/get-list?group=${group}`); // Thay '/products' bằng endpoint của bạn
      setData(response.data);
      console.log(data)
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('fruit')
  }, [])

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
          <SpaceComponent height={appSize.hei * 0.23} bgr='red' />
          <SpaceComponent height={16} />
          <TextComponent text='Categories' type='type' fontFamily={appFonts.Bold} />
          <SpaceComponent height={16} />
          <CategoriesComponent handelGetData={(data) => fetchData(data)} />
        </View>

        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            // console.log(item.id),
            <ItemVerticalComponent
              textProduct={item.name}
              groupProduct={item.group}
              priceProduct={item.price}
            />
          )}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

// const Categories = () => {

//   const [btnCheck, setBtnCheck] = useState(0)

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//     >
//       <View style={{ alignItems: 'center' }}>
//         <ButtonIcconComponent
//           onPrees={() => setBtnCheck(0)}
//           styles={{ marginBottom: 8 }}
//           height={60}
//           width={60}
//           bgr={btnCheck === 0 ? appColors.primary : appColors.gray1}
//           icon={
//             btnCheck === 0 ?
//               <Image
//                 source={require('../../assets/images/fruit-white.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               /> :
//               <Image
//                 source={require('../../assets/images/fruit-black.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               />
//           }
//         />
//         <TextComponent text='fruit' type='type1' fontFamily={appFonts.SemiBold} />
//       </View>
//       <SpaceComponent width={16} />
//       <View style={{ alignItems: 'center' }}>
//         <ButtonIcconComponent
//           onPrees={() => setBtnCheck(1)}
//           styles={{ marginHorizontal: 16, marginBottom: 8 }}
//           height={60}
//           width={60}
//           bgr={btnCheck === 1 ? appColors.primary : appColors.gray1}
//           icon={
//             btnCheck === 1 ?
//               <Image
//                 source={require('../../assets/images/vegetable-white.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               /> :
//               <Image
//                 source={require('../../assets/images/vegetable-black.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               />
//           }
//         />
//         <TextComponent text='vegetable' type='type1' fontFamily={appFonts.SemiBold} />
//       </View>
//       <View style={{ alignItems: 'center' }}>
//         <ButtonIcconComponent
//           onPrees={() => setBtnCheck(2)}
//           styles={{ marginHorizontal: 16, marginBottom: 8 }}
//           height={60}
//           width={60}
//           bgr={btnCheck === 2 ? appColors.primary : appColors.gray1}
//           icon={
//             btnCheck === 2 ?
//               <Image
//                 source={require('../../assets/images/nuts-white.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               /> :
//               <Image
//                 source={require('../../assets/images/nuts-black.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               />
//           }
//         />
//         <TextComponent text='Nuts' type='type1' fontFamily={appFonts.SemiBold} />
//       </View>
//       <View style={{ alignItems: 'center' }}>
//         <ButtonIcconComponent
//           onPrees={() => setBtnCheck(3)}
//           styles={{ marginHorizontal: 16, marginBottom: 8 }}
//           height={60}
//           width={60}
//           bgr={btnCheck === 3 ? appColors.primary : appColors.gray1}
//           icon={
//             btnCheck === 3 ?
//               <Image
//                 source={require('../../assets/images/milk-white.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               /> :
//               <Image
//                 source={require('../../assets/images/milk-black.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               />
//           }
//         />
//         <TextComponent text='Milk' type='type1' fontFamily={appFonts.SemiBold} />
//       </View>
//       <View style={{ alignItems: 'center' }}>
//         <ButtonIcconComponent
//           onPrees={() => setBtnCheck(4)}
//           styles={{ marginHorizontal: 16, marginBottom: 8 }}
//           height={60}
//           width={60}
//           bgr={btnCheck === 4 ? appColors.primary : appColors.gray1}
//           icon={
//             btnCheck === 4 ?
//               <Image
//                 source={require('../../assets/images/wheat-white.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               /> :
//               <Image
//                 source={require('../../assets/images/wheat-black.png')}
//                 style={{ width: 30, height: 30 }} // Điều chỉnh kích thước ảnh cho phù hợp
//               />
//           }
//         />
//         <TextComponent text='Milk' type='type1' fontFamily={appFonts.SemiBold} />
//       </View>

//     </ScrollView>
//   )
// }


export default HomeScreen

const styles = StyleSheet.create({
  flatListContainer: {

  }
})
