import { FlatList, ScrollView, Text, View } from "react-native";
import { SectionNames, Sections } from "../../constants/Sections";
import SectionCard from "./SectionCard";

type SectionProps = {
  sectionName: SectionNames
}

export default function SectionList({sectionName} : SectionProps) {
  return (
    <View className="my-7 mx-auto">
      <Text className="font-primary-semibold text-4xl ml-5 text-gray pt-3">{sectionName}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
      >
        <FlatList
          data={Sections[sectionName]}
          keyExtractor={(category) => category.id}
          numColumns={Math.ceil(Sections[sectionName].length / 2)}
          renderItem={({item : category}) => <SectionCard sectionName={sectionName} category={category}/>}
        />
      </ScrollView>
    </View>
  )
}
