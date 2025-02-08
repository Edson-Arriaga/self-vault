import { Image, Pressable, View } from "react-native";
import selectAndAddImage from "../../utils/selectAndAddImage";
import { useNavigation } from "@react-navigation/native";
import { useImageStore } from "../../stores/imageStore";
import { useMemoryStore } from "../../stores/memoryStore";
import { Memory } from "../../types";
import { useCameraPermissions } from "expo-image-picker";
import { verifyCameraPermissions } from "../../utils/verifyCameraPermissions";
import { useAppStatePermissionCheck } from "../../hooks/useAppStatePermissionCheck";

type ImageButtonProps = {
  imageUri: string
  memId: Memory['id']
  outerContainerStyle?: string
  innerContainerStyle?: string
}

export default function ImageButton({imageUri, memId, outerContainerStyle, innerContainerStyle} : ImageButtonProps) {
  
  const navigation = useNavigation()
  const {addImageLocal} = useMemoryStore()
  const {setIsImageModalActive, setActiveUriImage} = useImageStore()
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
  useAppStatePermissionCheck(requestPermission)

  async function addOrShowImageHandler(){
    if(imageUri){
      setActiveUriImage(imageUri)
      setIsImageModalActive(true)
    } else {
      const hasPermission = await verifyCameraPermissions(cameraPermissionInformation, requestPermission)
      
      if(!hasPermission){
        return
      }
      
      const response = await selectAndAddImage(memId, addImageLocal)
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
