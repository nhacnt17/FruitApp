import React, { useEffect, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import axiosInstance from '../../apiServices/api'
import { SpaceComponent } from '../../components'
import { appColors } from '../../constants/appColors'

const SearchScreen = () => {
  const [textinput, setTextInput] = useState("")
  const [data, setData] = useState([]);
  console.log(textinput)

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
  useEffect(() => {
    fetchData()
  }, [textinput]);
  return (
    <View>
      <SpaceComponent height={50} />
      <TextInput style={{ backgroundColor: appColors.gray3 }}
        onChangeText={setTextInput}
      >
      </TextInput>

      <View>
        {data.map((item: any) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text>Tên sản phẩm: {item.name}</Text>
            <Text>Giá: {item.price}</Text>
            <Button title="Xem chi tiết" onPress={() => console.log(`ID sản phẩm: ${item.id}`)} />
          </View>
        ))}
      </View>
    </View>
  )
}

export default SearchScreen