import { Pressable, Text, View } from "react-native";
import { FavAndOther } from "../../types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { useRef } from "react";

type FavAndOtherCardProps = {
  fao: FavAndOther,
  i: number
  setIsEntryDetailsModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsDeleteModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setActiveFavAndOtherId: React.Dispatch<React.SetStateAction<FavAndOther['id']>>
}

export default function FavAndOtherCard({fao, i, setIsEntryDetailsModalActive, setIsDeleteModalActive, setActiveFavAndOtherId} : FavAndOtherCardProps) {
  
  const navigation = useNavigation()

  const deleteIconRef = useRef<Animatable.View>(null)
  const updateIconRef = useRef<Animatable.View>(null)

  function showFavAndOtherDetailsHandler(){
    setIsEntryDetailsModalActive(true)
    setActiveFavAndOtherId(fao.id)
  }

  async function deleteFavAndOtherHandler(){
    deleteIconRef.current?.animate('swing', 200)
    setTimeout(() => {
      setActiveFavAndOtherId(fao.id)
      setIsDeleteModalActive(true)
    }, 100)
  }

  async function updateFavAndOtherHandler(){
    updateIconRef.current?.animate('swing', 200)
    setTimeout(() => {
      navigation.navigate('FavAndOtherFormScreen', {sectionName: undefined, categoryName: undefined, selectedEditId: fao.id})
    }, 100)
  }

  return (
    <Animatable.View animation={'bounceIn'} delay={i * 200} className='flex-row max-w-xl mx-auto'>
      <Pressable 
        className="bg-lightCream/75 border-4 border-aqua/75 rounded-xl w-full max-w-xl mx-auto overflow-hidden"
        android_ripple={{color: Colors.gray, foreground: true}}
        onPress={showFavAndOtherDetailsHandler}  
      >
        <View className="border-4 border-coral/50 p-1 flex-row items-center justify-between rounded-md">
          <Text className="border-l-2 text-gray border-aqua pl-1 text-xl font-primary-semibold line-clamp-1 mt-2 mb-1 pt-2">
            {fao.entry}
          </Text>
          <View className="flex-row items-center gap-3 mr-1"> 
            <Pressable onPress={deleteFavAndOtherHandler}>
              <Animatable.View ref={deleteIconRef}>
                <Ionicons name="trash-bin" size={34} color={Colors.coral} />
              </Animatable.View>
            </Pressable>
            <Pressable onPress={updateFavAndOtherHandler}>
              <Animatable.View ref={updateIconRef}>
                <AntDesign name="edit" size={34} color={Colors.aqua} />
              </Animatable.View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animatable.View>
  )
}
