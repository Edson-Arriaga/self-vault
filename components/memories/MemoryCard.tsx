import { Pressable } from "react-native";
import { Text, View } from "react-native";
import { Memory } from "../../types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "./ImageButton";
import * as Animatable from 'react-native-animatable';
import { useRef } from "react";
import { useMemoryStore } from "../../stores/memoryStore";

type MemoryCardProps = {
  mem: Memory,
  i: number
  setIsDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setActiveId: React.Dispatch<React.SetStateAction<Memory['id']>>
}

export default function MemoryCard({mem, i, setIsDeleteModalActive, setActiveId} : MemoryCardProps) {

  const navigation = useNavigation()
  const {setMemoryDeletedRef} = useMemoryStore() 
  const deleteIconRef = useRef<Animatable.View>(null)
  const updateIconRef = useRef<Animatable.View>(null)
  const cardRef = useRef<Animatable.View>(null)
  
  async function deleteMemorieHandler(){
    deleteIconRef.current?.animate('swing', 200)
    setTimeout(() => {
      setActiveId(mem.id)
      setIsDeleteModalActive(true)
      setMemoryDeletedRef(cardRef)
    }, 50)
  }

  async function updateMemorieHandler(){
    updateIconRef.current?.animate('swing', 200)
    navigation.navigate('MemoryFormScreen', {selectedEditId: mem.id, categoryName: undefined})
  }

  async function displayMemoryHandler(){
    cardRef.current?.animate('pulse', 200)
    navigation.navigate('DisplayMemoryScreen', {memoryId: mem.id})
  }

  return (
    <Animatable.View animation={'zoomIn'} delay={i * 200} className='flex-row max-w-xl mx-auto' ref={cardRef}>
      <ImageButton
        imageUri={mem.imageUri!}
        memId={mem.id}
        outerContainerStyle="h-36 w-32 border-y-gray border-l-gray border-r-aqua/75 border-2 rounded-lg overflow-hidden"
      />
        <View className="border-y-8 border-r-8 flex-1 border-transparent">
          <Pressable 
            className="flex-1 h-28 bg-lightCream/75 border-y-4 border-r-4 border-aqua/75 rounded-r-xl"
            onPress={displayMemoryHandler}
          >
          <View className="flex-1 border-y-4 border-r-4 border-coral/50 p-3 flex-row justify-between rounded-br-md rounded-tr-md">
            
            <View className="flex-1">
              {mem.date ? (
                <Text className="text-xs text-gray font-primary-semibold -m-1 pt-1">{mem.date}</Text>
              ) : (
                <Text className="text-xs text-gray font-primary-semibold -m-1 pt-1">No date added.</Text>
              )}

              <View className="mt-2">
                <Text className="border-l-2 text-gray border-aqua pl-1 text-xl font-primary-semibold line-clamp-1 mb-1">{mem.title}</Text>
                <Text className="text-sm text-gray font-primary-medium line-clamp-2">{mem.description}</Text>
              </View>
            </View>

            <View className="items-center justify-between -my-1">
              <Pressable onPress={deleteMemorieHandler} className="ml-1">
                <Animatable.View ref={deleteIconRef}>
                  <Ionicons name="trash-bin" size={34} color={Colors.coral} />
                </Animatable.View>
              </Pressable>
              <Pressable onPress={updateMemorieHandler}>
                <Animatable.View ref={updateIconRef}>
                  <AntDesign name="edit" size={34} color={Colors.aqua} />
                </Animatable.View>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    </Animatable.View>
  )
}
