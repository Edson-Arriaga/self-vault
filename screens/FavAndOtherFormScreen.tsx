import { ScrollView, Text, TextInput, View } from "react-native";
import BgGradient from "../components/ui/BgGradient";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { addFavAndOther, updateFavAndOther, getFavAndOtherById } from "../db/favsAndOthers";
import { FavAndOther, FavAndOtherValidationForm } from "../types";
import { useFavAndOtherStore } from "../stores/favAndOtherStore";
import BottomButton from "../components/ui/BottomButton";
import Notification from "../components/ui/Notification";

type Props = NativeStackScreenProps<RootStackParamList, 'FavAndOtherFormScreen'>

export default function FavAndOtherFormScreen({navigation, route} : Props) {
  
  const sectionName = route.params.sectionName 
  const categoryName = route.params.categoryName
  const selectedEditId = route.params.selectedEditId

  const { addFavAndOtherLocal, updateFavAndOtherLocal } = useFavAndOtherStore()
 
  const [entry, setEntry] = useState('')
 
  const isEditModeEnabled = selectedEditId !== undefined

  useEffect(() => {
    async function getFavAndOther(){
      const favAndOther = await getFavAndOtherById(selectedEditId!)
      setEntry(favAndOther.data.entry)
    }
    if(isEditModeEnabled){
      getFavAndOther()
    }
  }, [])

  useEffect(() => {
      navigation.setOptions({ headerShown: true, title: '' })
  }, [navigation])

  async function actionHandler(){
    /* VALIDATION */
    const {data : validatedData, error} = FavAndOtherValidationForm.safeParse(entry)
        
    if(error){
      Notification('error', 'Invalid Fields.', 'Please fill in at least the Title and Description fields.')
      return
    }

    if(isEditModeEnabled){
      /* UPDATE DATA */
      const response = await updateFavAndOther(selectedEditId, validatedData.entry)

      if(response?.error) {
        navigation.navigate('ErrorScreen')
        return
      }

      updateFavAndOtherLocal(selectedEditId, validatedData.entry)

      Notification('success', '✅ Data Updated Successfully')
    } else {
      /* ADD ENTRY */
      const newEntry = {
        entry: validatedData.entry,
        category: categoryName!,
        section: sectionName!
      }

      const response = await addFavAndOther(newEntry)

      if(response?.error) {
        navigation.navigate('ErrorScreen')
        return
      }
      
      addFavAndOtherLocal({...newEntry, id: response.data!})
      Notification('success', '✅ Entry Added Successfully')
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
          
            <BottomButton onPress={actionHandler}>
              {isEditModeEnabled ? 'Save Entry' : 'Add Entry'}
            </BottomButton>
          </View>
      </ScrollView>
    </View>
  )
}
