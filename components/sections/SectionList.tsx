import { FlatList, ScrollView, Text, View } from "react-native";
import { SectionNames, Sections } from "../../constants/Sections";
import SectionCard from "./SectionCard";
import { MotiView } from "moti";

type SectionProps = {
  sectionName: SectionNames
}

export default function SectionList({sectionName} : SectionProps) {
  return (
    <View className="my-7 mx-auto">
      <MotiView
        from={{
          scale: 0.5,
          translateY: -100,
          opacity: 0,

        }}
        animate={{
          scale: 1,
          translateY: 0,
          opacity: 1
        }}
        className="flex-row justify-center"
      >
        <Text className="font-primary-semibold text-4xl mr-3 text-gray">.</Text>
        <Text className="font-primary-semibold text-4xl text-gray pt-3">{sectionName}</Text>
        <Text className="font-primary-semibold text-4xl ml-3 text-gray-">.</Text>
      </MotiView>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
      >
        <MotiView
          from={{
            scale: 0.5,
            translateX: 300,
            opacity: 0
          }}
          animate={{
            scale: 1,
            translateX: 0,
            opacity: 1
          }}
        >
          <FlatList
            data={Sections[sectionName]}
            keyExtractor={(category) => category.id}
            numColumns={Math.ceil(Sections[sectionName].length / 2)}
            renderItem={({item : category}) => <SectionCard sectionName={sectionName} category={category}/>}
          />
        </MotiView>
      </ScrollView>
    </View>
  )
}
