import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
import BgGradient from "../components/ui/BgGradient";
import { useImageStore } from "../stores/imageStore";
import ImageModal from "../components/ui/ImageModal";
import ImageButton from "../components/memories/ImageButton";
import { useMemoryStore } from "../stores/memoryStore";

type Props = NativeStackScreenProps<RootStackParamList, 'DisplayMemoryScreen'>

export default function DisplayMemoryScreen({ navigation, route } : Props) {
  
  const memoryId = route.params.memoryId

  const { isImageModalActive } = useImageStore()
  const { memories } = useMemoryStore()

  const memory = memories.find(mem => mem.id === memoryId)
  
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true
    })
  }, [navigation])
  
  return (
    <View className="flex-1">
      <BgGradient />
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', marginHorizontal: 20, gap: 10}}>
        <Text className="font-primary-bold text-5xl pt-5 text-gray mt-10 mb-3">Details</Text>
        <View className="bg-lightCream/90 rounded-xl mb-10 w-full border-aqua/75 border-8 overflow-hidden max-w-lg">
          <View className="border-4 border-coral/50 w-full p-5 items-center rounded-sm">
            <ImageButton 
              memId={memory?.id} imageUri={memory?.imageUri!}
              innerContainerStyle="border-white border-4 size-56"
              outerContainerStyle='rounded-xl overflow-hidden border-stone-500 border-8 -rotate-6'
            />
            <Text className="text-gray font-primary-bold text-3xl my-5 text-center pt-3 leading-normal">{memory?.title}</Text>
            <View className="w-full">
              {memory?.date ? (
                <Text className="font-primary-semibold text-lg text-gray">- {memory.date}</Text>
              ) : (
                <Text className="font-primary-semibold text-xl">- No date added.</Text>
              )}
              <Text className="font-primary-semibold text-xl text-gray mt-10">{memory?.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {isImageModalActive && (
        <ImageModal />
      )}
    </View> 
  )
}
