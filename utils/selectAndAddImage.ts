import * as ImagePicker from 'expo-image-picker';
import { addImage } from "../db/memories"
import * as FileSystem from 'expo-file-system'
import { Memory } from "../types"

export async function selectAndAddImage(
  memoryId? : Memory['id'],
  addImageLocal?: (memId: Memory["id"], imageUri: string) => void,
){
  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.75
  })

  if (!result?.canceled) {
    //Form memory funnctionality
    if(!memoryId){
      return {temporalUri: result.assets[0].uri, error: false}
    }

    //Rest app funnctionality
    const sourceUri = result.assets[0].uri
    const extension = sourceUri.slice(sourceUri.lastIndexOf('.'))
    
    const destinationUri = `${FileSystem.documentDirectory}${Date.now()}${extension}`
    
    await FileSystem.moveAsync({
      from: sourceUri,
      to: destinationUri,
    })

    const response = await addImage(memoryId, destinationUri)

    if(response.error) return {error: true}

    if(addImageLocal){
      addImageLocal(memoryId, destinationUri)
    }
    return {canceled: false, error: false}
  } else {
    return {canceled: true, error: false}
  }
}

export default selectAndAddImage