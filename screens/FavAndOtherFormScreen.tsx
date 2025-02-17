import { ScrollView, Text, TextInput, View } from "react-native";
import BgGradient from "../components/ui/BgGradient";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Toast from "react-native-toast-message";
import { addFavAndOther, updateFavAndOther, getFavAndOtherById } from "../db/favsAndOthers";
import { FavAndOther } from "../types";
import { useFavAndOtherStore } from "../stores/favAndOtherStore";
import BottomButton from "../components/ui/BottomButton";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'FavAndOtherFormScreen'>

export default function FavAndOtherFormScreen({navigation, route} : Props) {
  
  const { addFavAndOtherLocal, updateFavAndOtherLocal } = useFavAndOtherStore()
  const sectionName = route.params.sectionName 
  const categoryName = route.params.categoryName
  const selectedEditId = route.params.selectedEditId
  
  const isEditModeEnabled = selectedEditId !== undefined
  
  const [entry, setEntry] = useState('')

  useEffect(() => {
    async function getFavAndOther(){
      const favAndOther = await getFavAndOtherById(selectedEditId)
      setEntry(favAndOther.data.entry)
    }
    if(isEditModeEnabled){
      getFavAndOther()
    }
  }, [])

  useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: ''
      })
  }, [navigation])


  async function actionEntryHandler(){
    const isEntryValid = entry.trim().length >= 1 && entry.trim().length <= 150
  
    if(!isEntryValid){
      Toast.show({
        type: 'error',
        text1: 'Invalid Fields.',
        text2: 'Please fill all the fields.'
      })
      return
    }

    if(isEditModeEnabled){
      const response = await updateFavAndOther(selectedEditId, entry)

      if(response.error) {
        navigation.navigate('ErrorScreen')
        return
      }

      updateFavAndOtherLocal(selectedEditId, entry)

      Toast.show({
        type: 'success',
        text1: '✅ Entry Updated Successfully'
      })
    } else {
      const data : FavAndOther = {
        id: uuidv4(),
        entry,
        category: categoryName!,
        section: sectionName!
      }

      const response = await addFavAndOther(data)

      if(response.error) {
        navigation.navigate('ErrorScreen')
        return
      }
  
      addFavAndOtherLocal(data)

      Toast.show({
        type: 'success',
        text1: '✅ Entry Added Successfully'
      })
    }

    navigation.goBack()
  }
  
  return (
    <View className="flex-1">
      <BgGradient />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text className="font-primary-bold text-5xl text-gray mb-6 pt-5 mt-12 text-center">
            {isEditModeEnabled ? 'Edit Item' : 'Add Entry'}
          </Text>
          <View className="flex-1 justify-between">
            <View className="mx-4">
              <TextInput 
                className="text-3xl bg-white px-5 py-2 mb-12 rounded-xl overflow-hidden font-primary-medium w-full max-w-xl mx-auto" 
                style={{ lineHeight: 42 }}
                placeholder="Entry..."
                multiline
                value={entry}
                onChangeText={v => setEntry(v)}
                maxLength={150}
                scrollEnabled={false}
              />
            </View>
          
            <BottomButton onPress={actionEntryHandler}>
              {isEditModeEnabled ? 'Save Entry' : 'Add Entry'}
            </BottomButton>
          </View>
      </ScrollView>
    </View>
  )
}
