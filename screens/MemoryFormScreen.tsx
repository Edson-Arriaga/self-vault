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
import { MemoryForm } from "../types";
import { useMemoryStore } from "../stores/memoryStore";
import Toast from "react-native-toast-message";
import BottomButton from "../components/ui/BottomButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useImages } from "../hooks/useImages";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import * as Animatable from 'react-native-animatable';

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryFormScreen'>;

export default function MemoryFormScreen({navigation, route} : Props) {

  const [prevData, setPrevData] = useState<MemoryForm>()
  const [isDeleteImageIconActive, setIsDeleteImageIconActive] = useState(false)
  const [isActiveCalendar, setIsActiveCalendar] = useState(false)
  
  const categoryName = route.params.categoryName
  const selectedEditId = route.params.selectedEditId
  
  const [data, setData] = useState<MemoryForm>({
    title: '',
    date: '',
    description: '',
    imageUri: ''
  })

  const { addMemoryLocal, updateMemoryLocal } = useMemoryStore()
  const { selectAndAddImage } = useImages()

  const isEditModeEnabled = selectedEditId !== undefined

  useEffect(() => {
    async function getMemory(){
      const memory = await getMemoryById(selectedEditId)
      
      const memoryData : MemoryForm = {
        title: memory.data.title,
        description: memory.data.description,
        date: memory.data.date,
        imageUri: memory.data.imageUri
      }

      setPrevData(memoryData)
      setData(memoryData)
      setIsDeleteImageIconActive(!!memoryData.imageUri)
    }
    if(isEditModeEnabled){
      getMemory()
    }
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: ''
    })
    
  }, [navigation])
   
  const pickImageHandler = async () => {
    const result = await selectAndAddImage()
    if(!result?.canceled){
      setData(prev => ({...prev, imageUri: result?.temporalUri!}))
      setIsDeleteImageIconActive(true)
    }
  }

  async function actionMemoryHandler(){
    const titleIsValid = data.title.trim().length >= 1 && data.title.trim().length <= 55
    const descriptionIsValid = data.description.trim().length >= 1 && data.title.trim().length <= 1500
  
    if(!titleIsValid || !descriptionIsValid){
      Toast.show({
        type: 'error',
        text1: 'Invalid Fields.',
        text2: 'Please fill in at least the Title and Description fields.'
      })
      return
    }

    if(isEditModeEnabled){
      let newData = {} as MemoryForm
      if(data.title !== prevData?.title){
        newData = {...newData, title: data.title}
      }
      if (data.description !== prevData?.description) {
        newData = { ...newData, description: data.description };
      }
      if (data.date !== prevData?.date) {
        newData = { ...newData, date: data.date };
      }
      if (data.imageUri !== prevData?.imageUri) {
        newData = { ...newData, imageUri: data.imageUri }
      }

      if(Object.keys(newData).length === 0){
        Toast.show({
          type: 'info',
          text1: 'Same Information',
          text2: 'Please modify some fields before updating.'
        })
        return
      }

      const response = await updateMemory(selectedEditId, newData)

      if(response.error) {
        navigation.navigate('ErrorScreen')
        return
      }

      updateMemoryLocal(selectedEditId, data)
      
      Toast.show({
        type: 'success',
        text1: '✅ Memory Updated Successfully'
      })

    } else {
      const completeData = {
        ...data,
        id: uuidv4(),
        category: categoryName!,
      }

      const response = await addMemory(completeData)

      if(response.error) {
        navigation.navigate('ErrorScreen')
        return
      }

      addMemoryLocal(completeData)

      Toast.show({
        type: 'success',
        text1: '✅ Memory Added Successfully'
      })
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

          <BottomButton onPress={actionMemoryHandler}>
            {isEditModeEnabled ? 'Save Changes' : 'Add Memory'}
          </BottomButton>
        </View>
      </ScrollView>
    </View>
  )
}
