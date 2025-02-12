import { FlatList, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Sections } from "../constants/Sections";
import BgGradient from "../components/ui/BgGradient";
import { useEffect, useState } from "react";
import { Memory } from "../types";
import MemoryCard from "../components/memories/MemoryCard";
import { useMemoryStore } from "../stores/memoryStore";
import ImageModal from "../components/ui/ImageModal";
import DeleteMemoryModal from "../components/memories/DeleteMemoryModal";
import { useImageStore } from "../stores/imageStore";
import CategoryHeader from "../components/ui/CategoryHeader";
import BottomButton from "../components/ui/BottomButton";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryListScreen'>

export default function MemoryListScreen({route, navigation} : Props) {
  const categoryId = route.params.categoryId

  const category = Object.values(Sections).flat().find((cat) => cat.id === categoryId)
  
  const { isImageModalActive, permissionsAllowed, setIsMemoryListScreenUpdated, isMemoryListScreenUpdated } = useImageStore()

  const [activeId, setActiveId] = useState<Memory['id']>() 
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)

  const [data, setData] = useState<Memory[]>([])
 
  const {memories} = useMemoryStore()

  if(!category){
    navigation.navigate('ErrorScreen')
  }
 
  function addEntryHandler(){
    navigation.navigate('MemoryFormScreen', {categoryName: category!.name, selectedEditId: undefined})
  }

  useEffect(() => {
    async function getAllMemories(){
      setData(memories)
    }
    getAllMemories()
  }, [memories])

  const isFocus = useIsFocused()
  
  //Refresh the screen if the permission has been updated from another screen
  useEffect(() => {
    if(!isMemoryListScreenUpdated && permissionsAllowed && isFocus){
      setIsMemoryListScreenUpdated(true)
      navigation.replace('MemoryListScreen', { categoryId })
    }
  }, [isMemoryListScreenUpdated, permissionsAllowed, isFocus])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: category!.name
    })

  }, [navigation])

  return (
    <View className="flex-1">
      <BgGradient />
      <ScrollView>
        <View>
          <CategoryHeader category={category!}/>
         {data.filter(mem => mem.category === category?.name).length === 0 ? (
            <View className="my-10 mx-10">
              <Text className="font-primary-semibold text-center text-xl text-gray">No memories yet.</Text>
              <Text className="font-primary-semibold text-center text-xl text-gray">Add one to see your list here 🤗</Text>
            </View>
         ) : (
          <FlatList
            scrollEnabled={false}
            data={data.filter(mem => mem.category === category?.name)}
            keyExtractor={mem => mem.id?.toString()!}
            contentContainerStyle={{
              marginVertical: 36, 
              marginLeft: 10,
              gap: 16
            }}
            renderItem={({item}) => (
              <MemoryCard 
                mem={item}
                setIsDeleteModalActive={setIsDeleteModalActive}
                setActiveId={setActiveId}
              />
            )}
          />
         )}
          
          
        </View>
      </ScrollView>
      
      <BottomButton onPress={addEntryHandler}>Add Memory</BottomButton>
      
      {isImageModalActive && (
        <ImageModal />
      )}
      {isDeleteModalActive && (
        <DeleteMemoryModal memoryId={activeId} setModalStatus={setIsDeleteModalActive}/>
      )}
    </View>
  )
}
