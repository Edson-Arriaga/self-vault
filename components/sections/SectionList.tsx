import { FlatList, ScrollView, Text, View } from "react-native";
import { SectionNames, Sections } from "../../constants/Sections";
import SectionCard from "./SectionCard";
import * as Animatable from 'react-native-animatable';

type SectionListProps = {
  sectionName: SectionNames
}

export default function SectionList({sectionName} : SectionListProps) {
  return (
    <View className="my-7 mx-auto">
      <Animatable.View animation={'fadeInLeft'} easing={'ease-in-quad'}>
        <View className="flex-row justify-center">
          <Text className="font-primary-semibold text-4xl mr-3 text-gray">.</Text>
          <Text className="font-primary-semibold text-4xl text-gray pt-3">{sectionName}</Text>
          <Text className="font-primary-semibold text-4xl ml-3 text-gray-">.</Text>
        </View>
      </Animatable.View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
      >
        <Animatable.View animation='fadeInRight'>
          <FlatList
            data={Sections[sectionName]}
            keyExtractor={(category) => category.id}
            className="mr-4"
            numColumns={Math.ceil(Sections[sectionName].length / 2)}
            renderItem={({item : category}) => <SectionCard sectionName={sectionName} category={category}/>}
          />
        </Animatable.View>
      </ScrollView>
    </View>
  )
}
