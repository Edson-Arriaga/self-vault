import { FlatList, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Sections } from "../constants/Sections";
import BgGradient from "../components/ui/BgGradient";
import { useEffect, useState } from "react";
import { FavAndOther } from "../types";
import FavAndOtherCard from "../components/favsAndOthers/FavAndOtherCard";
import { useFavAndOtherStore } from "../stores/favAndOtherStore";
import CategoryHeader from "../components/ui/CategoryHeader";
import BottomButton from "../components/ui/BottomButton";
import FavAndOtherDetailsModal from "../components/favsAndOthers/FavAndOtherDetailsModal";
import DeleteFavAndOtherModal from "../components/favsAndOthers/DeleteFavAndOtherModal";

type Props = NativeStackScreenProps<RootStackParamList, 'FavAndOtherListScreen'>

export default function FavAndOtherListScreen({route, navigation} : Props) {
  const categoryId = route.params.categoryId
  const sectionName = route.params.sectionName
  
  const category = Object.values(Sections).flat().find((cat) => cat.id === categoryId)

  const {favsAndOthers} = useFavAndOtherStore()
  
  const [activeFavAndOtherId, setActiveFavAndOtherId] = useState<FavAndOther['id']>()
  const [isEntryDetailsModalActive, setIsEntryDetailsModalActive] = useState(false)
  
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)


  if(!category){
    navigation.navigate('ErrorScreen')
  }

  function addEntryHandler(){
    navigation.navigate('FavAndOtherFormScreen', {categoryName: category!.name, sectionName, selectedEditId: undefined})
  }

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
          {favsAndOthers.filter(fao => fao.category === category?.name).length === 0 ? (
            <View className="my-10 mx-10">
              <Text className="font-primary-semibold text-center text-xl text-gray">No entries yet.</Text>
              <Text className="font-primary-semibold text-center text-xl text-gray">Add one to see your list here 🤗</Text>
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={favsAndOthers.filter(fao => fao.category === category?.name)}
              keyExtractor={mem => mem.id.toString()}
              contentContainerStyle={{
                marginVertical: 16, 
                marginHorizontal: 10,
                gap: 16
              }}
              renderItem={({item, index}) => (
                <FavAndOtherCard
                  fao={item}
                  i={index}
                  setIsEntryDetailsModalActive={setIsEntryDetailsModalActive}
                  setIsDeleteModalActive={setIsDeleteModalActive}
                  setActiveFavAndOtherId={setActiveFavAndOtherId}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
      
      <BottomButton onPress={addEntryHandler}>Add Entry</BottomButton>
      {(isEntryDetailsModalActive && activeFavAndOtherId) && (
        <FavAndOtherDetailsModal favAndOtherId={activeFavAndOtherId} setIsFavAndOtherDetailsModalActive={setIsEntryDetailsModalActive} />
      )}
      {(isDeleteModalActive && activeFavAndOtherId) &&  (
        <DeleteFavAndOtherModal setModalStatus={setIsDeleteModalActive} favAndOtherId={activeFavAndOtherId}/>
      )}
    </View>
  )
}

