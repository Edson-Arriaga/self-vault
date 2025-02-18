import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { Category, SectionNames } from "../../constants/Sections";
import { Colors } from "../../constants/Colors";
import { useMemoryStore } from "../../stores/memoryStore";
import { useFavAndOtherStore } from "../../stores/favAndOtherStore";
import { useRef } from "react";
import * as Animatable from 'react-native-animatable';

export default function SectionCard({category, sectionName} : {category : Category, sectionName: SectionNames}) {
  
  const navigation = useNavigation()
  const {memories} = useMemoryStore()
  const { favsAndOthers } = useFavAndOtherStore()

  const cardRef = useRef<Animatable.View>(null)
  
  const numberOfMemories = sectionName === 'Memories' 
  ? memories.filter(mem => mem.category === category.name).length 
  : favsAndOthers.filter(fao => fao.category === category.name).length 

  function onPressHandler(categoryId: string){
    cardRef.current?.animate('swing', 300)
    if(sectionName === 'Memories'){
      navigation.navigate('MemoryListScreen', { categoryId })
    } else {
      navigation.navigate('FavAndOtherListScreen', { categoryId, sectionName })
    }
  }
  
  return (
    <Animatable.View animation={'bounceIn'} className="w-36 h-48 m-3 rounded-xl" ref={cardRef}>
      <Pressable 
        className="border-gray"
        onPress={() => onPressHandler(category.id)}
      >
        <View className="h-2/3 border-aqua rounded-t-xl overflow-hidden border-x-2 border-t-2">
          <Image className="size-full" source={category.image}/>
        </View>
        <View className="h-1/3 bg-lightCream border-coral/75 border-4 rounded-b-lg">
          <View className="border-coral/50 border-2 flex-1 justify-center rounded-b-sm">
            <Text className="font-primary-semibold text-center text-sm pt-1" key={category.id}>{category.name}</Text>
          </View>
        </View> 
      </Pressable>
      {numberOfMemories > 0 && (
        <View className="absolute size-8 bg-lightCream -right-3 -top-3 z-10 rounded-full border-aqua border-2">
          <Text className="font-primary-bold text-center -mt-[2.5px] -ml-[1px] text-gray">{numberOfMemories}</Text>
        </View>
      )}
    </Animatable.View>
  )
}
