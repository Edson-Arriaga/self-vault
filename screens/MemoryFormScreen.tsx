import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import BgGradient from "../components/ui/BgGradient";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "../constants/Colors";
import AppCalendar from "../components/memories/AppCalendar";
import { addMemory, getMemoryById, updateMemory } from "../db/memories";
import { FavAndOtherForm, MemoryForm, MemoryValidationForm } from "../types";
import { useMemoryStore } from "../stores/memoryStore";
import BottomButton from "../components/ui/BottomButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useImages } from "../hooks/useImages";
import { filterDifferntFields } from "../utils/filterDifferentFields";
import Notification from "../components/ui/Notification";

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryFormScreen'>;

export default function MemoryFormScreen({navigation, route} : Props) {

  const categoryName = route.params.categoryName
  const selectedEditId = route.params.selectedEditId

  const [data, setData] = useState({imageUri: '', date: ''} as MemoryForm)
  const [prevData, setPrevData] = useState({} as MemoryForm)
  const [isDeleteImageIconActive, setIsDeleteImageIconActive] = useState(false)
  const [isActiveCalendar, setIsActiveCalendar] = useState(false)
  
  const { addMemoryLocal, updateMemoryLocal } = useMemoryStore()
  const { selectAndAddImage } = useImages()

  const isEditModeEnabled = selectedEditId !== undefined

  useEffect(() => {
    async function getMemory(){
      const response = await getMemoryById(selectedEditId!)
      const formData : MemoryForm = {
        title: response.data.title,
        imageUri: response.data.imageUri,
        description: response.data.description,
        date: response.data.date,
      }
      setPrevData(formData)
      setData(formData)
      setIsDeleteImageIconActive(!!response.data.imageUri)
    }
    if(isEditModeEnabled){
      getMemory()
    }
  }, [])

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: ''})
  }, [navigation])
   
  const pickImageHandler = async () => {
    const result = await selectAndAddImage()
    if(!result?.canceled){
      setData(prev => ({...prev, imageUri: result.temporalUri!}))
      setIsDeleteImageIconActive(true)
    }
  }

  async function actionHandler(){
    /* VALIDATION */
    const {data : validatedData, error} = MemoryValidationForm.safeParse(data)
    console.log(validatedData)
    if(error){
      Notification('error', 'Invalid Fields.', 'Please fill in at least the Title and Description fields.')
      return
    }

    if(isEditModeEnabled){
      /* UPDATE MEMORY */
      const differentFields = filterDifferntFields(prevData, validatedData)
    

      if(Object.keys(differentFields).length === 0){
        Notification('info', 'Same Information', 'Please modify some fields before updating.')
        return
      }

      const response = await updateMemory(selectedEditId, differentFields, prevData.imageUri!)
      
      if(response?.error) {
        navigation.navigate('ErrorScreen')
        return
      }

      updateMemoryLocal(selectedEditId, validatedData)
      Notification('success', '✅ Memory Updated Successfully')
    } else {
      /* ADD MEMORY */
      const newMemory = {...validatedData, category: categoryName!}
      const response = await addMemory(newMemory)

      if(response?.error) {
        navigation.navigate('ErrorScreen')
        return
      }

      addMemoryLocal({...newMemory, id: response.data!})

      Notification('success', '✅ Memory Added Successfully')
    }

    navigation.goBack()
  }

  function deleteImageHandler(){
    setData(prev => ({...prev, imageUri: ''}))
    setIsDeleteImageIconActive(false)
  }

  function deleteDateHandler(){
    setData(prev => ({...prev, date: ''}))
  }

  function selectDayHandler(){
    setIsActiveCalendar(prev => !prev)
  }
  
  return (
    <View className="flex-1">
      <BgGradient />
      <ScrollView contentContainerStyle={{ flexGrow: 1, minHeight: '100%', width: '100%' }} scrollEnabled>
        <Text className="font-primary-bold text-5xl text-gray mb-6 pt-5 mt-12 text-center">
          {isEditModeEnabled ? 'Edit Memory' : 'Add Memory'}
        </Text>
    
        <View className="flex-1 justify-between">
          <View className="px-2">
            <View className="bg-white px-5 mb-5 rounded-2xl overflow-hidden w-full max-w-xl mx-auto pb-10">
              <View className="flex-row justify-between mt-4 border-b-4 border-gray pb-4 rounded-xl">
                <View className="flex-row items-center gap-1">
                    <Pressable
                      onPress={selectDayHandler}
                      className="rounded-lg overflow-hidden"
                      android_ripple={{color: Colors.gray, foreground: true}}
                    >
                    <AntDesign name="calendar" size={40} color={Colors.gray} />
                  </Pressable>

                  <View className="mt-1">
                    {data.date ? (
                      <Text className="text-sm text-gray font-primary-semibold mt-1">{data.date}</Text>
                    ) : (
                      <Text className="text-sm text-gray font-primary-semibold mt-1">No date added.</Text>
                    )}
                  </View>
                </View>

                <View className="flex-row items-center gap-2">
                  {isDeleteImageIconActive && (
                    <Pressable onPress={deleteImageHandler}>
                      <MaterialIcons name="delete-sweep" size={40} color={Colors.red} />
                    </Pressable>
                  )}

                  <Pressable
                    onPress={pickImageHandler}
                    className="rounded-xl overflow-hidden"
                    android_ripple={{color: Colors.gray, foreground: true}}
                  >
                    {data.imageUri ? (
                      <View className="size-11 rounded-lg overflow-hidden">
                        <Image className="size-full" source={{uri: data.imageUri}}/> 
                      </View>
                    ) : (
                      <Feather name="image" size={40} color={Colors.gray} />
                    )}
                  </Pressable>
                </View>
              </View>

              {isActiveCalendar ? (
                <View className="items-center gap-5">
                  <View className="w-full">
                    <AppCalendar date={data.date} setData={setData} />
                  </View>
                  {data.date && (
                    <Pressable
                      onPress={deleteDateHandler}
                      className="rounded-xl overflow-hidden"
                      android_ripple={{color: Colors.gray, foreground: true}}
                    >
                      <Ionicons name="trash-bin" size={40} color={Colors.red} />
                    </Pressable>
                  )}
                </View>
              ) : (
                <View className="mt-4">
                  <TextInput 
                    className="w-full text-3xl font-primary-medium"
                    placeholder="Title"
                    multiline 
                    style={{ lineHeight: 42 }}
                    value={data.title}
                    onChangeText={v => setData(prev => ({...prev, title: v}))}
                    maxLength={55}
                    scrollEnabled={false}
                  />
        
                  <TextInput 
                    className="w-full text-2xl font-primary-medium"
                    style={{ lineHeight: 42 }}
                    placeholder="Record your memory..."
                    value={data.description}
                    onChangeText={v => setData(prev => ({...prev, description: v}))}
                    multiline 
                    scrollEnabled={false}
                    maxLength={1500}
                  />
                </View>
              )}
            </View>
          </View>

          <BottomButton onPress={actionHandler}>
            {isEditModeEnabled ? 'Save Changes' : 'Add Memory'}
          </BottomButton>
        </View>
      </ScrollView>
    </View>
  )
}