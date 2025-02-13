import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { Category, SectionNames } from "../../constants/Sections";
import { Colors } from "../../constants/Colors";

export default function SectionCard({category, sectionName} : {category : Category, sectionName: SectionNames}) {
  
  const navigation = useNavigation()

  function onPressHandler(categoryId: string){
    if(sectionName === 'Memories'){
      navigation.navigate('MemoryListScreen', { categoryId })
    } else {
      navigation.navigate('FavAndOtherListScreen', { categoryId, sectionName })
    }
  }
  
  return (
    <View className="w-36 h-48 m-3 rounded-xl overflow-hidden">
      <Pressable 
        className="border-gray"
        android_ripple={{foreground: true, color: Colors.gray}}
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
    </View>
  )
}
