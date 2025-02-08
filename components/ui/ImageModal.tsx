import { Image, Pressable } from "react-native";
import { View } from "react-native";
import { useImageStore } from "../../stores/imageStore";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function ImageModal() {
  
  const {setIsImageModalActive, activeUriImage, setActiveUriImage} = useImageStore()
  
  function onCloseModal(){
    setIsImageModalActive(false)
    setActiveUriImage('')
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsImageModalActive(false)
        setActiveUriImage("") 
      }
    }, [])
  )
  
  return (
    <Pressable className="justify-center items-center absolute inset-0 bg-black/80 z-50" onPress={onCloseModal}>
      <View className="p-10 w-full">
        <Image
          className="size-full" 
          source={{uri: activeUriImage}} 
          resizeMode="contain"
        />
      </View>
    </Pressable>
  )
}
