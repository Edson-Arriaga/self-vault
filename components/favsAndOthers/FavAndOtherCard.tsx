import { Pressable, Text, View } from "react-native";
import { FavAndOther } from "../../types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

type MemorieCardProps = {
  fao: FavAndOther
  setIsEntryDetailsModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setActiveFavAndOtherId: React.Dispatch<React.SetStateAction<FavAndOther['id']>>
}

export default function FavAndOtherCard({fao, setIsEntryDetailsModalActive, setIsDeleteModalActive, setActiveFavAndOtherId} : MemorieCardProps) {
  
  const navigation = useNavigation()

  function showFavAndOtherDetailsHandler(){
    setIsEntryDetailsModalActive(true)
    setActiveFavAndOtherId(fao.id)
  }

  async function deleteFavAndOtherHandler(){
    setActiveFavAndOtherId(fao.id)
    setIsDeleteModalActive(true)
  }

  async function editFavAndOtherHandler(){
    navigation.navigate('FavAndOtherFormScreen', {sectionName: undefined, categoryName: undefined, selectedEditId: fao.id})
  }

  return (
    <Pressable 
      className="bg-lightCream/75 border-4 border-aqua/75 rounded-xl shadow-black shadow-md w-full max-w-xl mx-auto"
      onPress={showFavAndOtherDetailsHandler}  
    >
      <View className="border-4 border-coral/50 p-1 flex-row items-center justify-between rounded-md">
        <Text className="border-l-2 text-gray border-aqua pl-1 text-xl font-primary-semibold line-clamp-1 mt-2 mb-1">
          {fao.entry}
        </Text>
        <View className="flex-row items-center gap-3 mr-1"> 
          <Pressable onPress={editFavAndOtherHandler}>
            <AntDesign name="edit" size={36} color={Colors.aqua} />
          </Pressable>
          <Pressable onPress={deleteFavAndOtherHandler}>
            <Ionicons name="trash-bin" size={36} color={Colors.coral} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}
