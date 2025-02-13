import { Image, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useImageStore } from "../../stores/imageStore";
import { Memory } from "../../types";
import { useImages } from "../../hooks/useImages";

type ImageButtonProps = {
  imageUri: string
  memId: Memory['id']
  outerContainerStyle?: string
  innerContainerStyle?: string
}

export default function ImageButton({imageUri, memId, outerContainerStyle, innerContainerStyle} : ImageButtonProps) {
  
  const navigation = useNavigation()
  const {setIsImageModalActive, setActiveImageUri: setActiveUriImage} = useImageStore()
  const { selectAndAddImage } = useImages()

  async function addOrShowImageHandler(){
    if(imageUri){
      setActiveUriImage(imageUri)
      setIsImageModalActive(true)
    } else {
      const response = await selectAndAddImage(memId)
      if(response?.error) {
        navigation.navigate('ErrorScreen')
        return
      }
    }
  }
  
  return (
    <View className={`${outerContainerStyle}`}>
      <Pressable onPress={addOrShowImageHandler}>
        <View className={`${innerContainerStyle}`}>
          {imageUri ? (
            <Image className="size-full" source={{uri: imageUri}}/>
          ) : (
            <Image className="size-full" source={require('../../assets/images/add-image.jpg')}/>
          )}
        </View>
      </Pressable>
    </View>
  )
}
