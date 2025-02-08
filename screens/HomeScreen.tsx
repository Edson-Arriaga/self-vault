import { FlatList, Image, Text, View } from "react-native";
import { SectionNames, Sections } from "../constants/Sections";
import BgGradient from "../components/ui/BgGradient";
import SectionList from "../components/sections/SectionList";

export default function HomeScreen() {
  return (
    <View className="flex-1 pt-8">
      <BgGradient />

      <View className="border-b-4 border-dashed border-gray flex-row items-center justify-center pr-6">
        <Image
          source={require('../assets/images/main-logo.png')} 
          className="size-32"
        />
        <View className="mt-2 -ml-3">
          <Text className="font-primary-bold text-6xl text-gray pt-10">SelfVault </Text>
        </View>
      </View>

      {/* Sections */}
      <FlatList
        data={Object.keys(Sections) as SectionNames[]} 
        keyExtractor={(sectionName) => sectionName} 
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="border-b-4 border-gray border-dashed"/>
        )}
        renderItem={({item}) => <SectionList sectionName={item}/>}
      />
    </View>
  )
}