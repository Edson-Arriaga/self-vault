import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { FavAndOther } from "../../types";
import { useFavAndOtherStore } from "../../stores/favAndOtherStore";

type FavAndOtherDetailsModalProps = {
  favAndOtherId: FavAndOther['id']
  setIsFavAndOtherDetailsModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FavAndOtherDetailsModal({favAndOtherId, setIsFavAndOtherDetailsModalActive} : FavAndOtherDetailsModalProps) {
  
  const {favsAndOthers} = useFavAndOtherStore()
  const favAndOther = favsAndOthers.find(fao => fao.id === favAndOtherId)

  function onCloseModal(){
    setIsFavAndOtherDetailsModalActive(false)
  }

  return (
    <Pressable className="justify-center items-center absolute inset-0 bg-black/80 z-50" onPress={onCloseModal}>
      <View className="p-10 w-full max-w-lg">
        <Text className="text-white text-center font-primary-medium text-2xl leading-normal">{favAndOther?.entry}</Text>
      </View>
    </Pressable>
  )
}
