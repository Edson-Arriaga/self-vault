import { Pressable } from "react-native";
import { Text, View } from "react-native";
import { Memory } from "../../types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import ImageButton from "./ImageButton";

type MemorieCardProps = {
  mem: Memory
  setIsDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setActiveId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function MemoryCard({mem, setIsDeleteModalActive, setActiveId} : MemorieCardProps) {

  const navigation = useNavigation()
  
  async function deleteMemorieHandler(){
    setActiveId(mem.id)
    setIsDeleteModalActive(true)
  }

  async function updateMemorieHandler(){
    navigation.navigate('MemoryFormScreen', {selectedEditId: mem.id, categoryName: undefined})
  }

  async function displayMemoryHandler(){
    navigation.navigate('DisplayMemoryScreen', {memoryId: mem.id})
  }

  return (
    <View className="flex-row max-w-xl mx-auto">
      <ImageButton
        imageUri={mem.imageUri!}
        memId={mem.id}
        outerContainerStyle="h-36 w-32 border-y-gray border-l-gray border-r-aqua/75 border-2 rounded-lg overflow-hidden"
      />
  
      <View className="border-y-8 border-r-8 flex-1 border-transparent">
        <Pressable 
          className="flex-1 h-28 bg-lightCream/75 border-y-4 border-r-4 border-aqua/75 rounded-r-xl shadow-black shadow-md"
          android_ripple={{color: Colors.gray, foreground: true}}
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
              <Pressable onPress={deleteMemorieHandler}>
                <Ionicons name="trash-bin" size={36} color={Colors.coral} />
              </Pressable>
              <Pressable onPress={updateMemorieHandler}>
                <AntDesign name="edit" size={36} color={Colors.aqua} />
              </Pressable>
            </View>

          </View>
        </Pressable>
      </View>

    </View>
  )
}
