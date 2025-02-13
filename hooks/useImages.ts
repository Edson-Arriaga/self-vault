import * as ImagePicker from 'expo-image-picker';
import { addImage } from "../db/memories"
import * as FileSystem from 'expo-file-system'
import { Memory } from "../types"
import { useMemoryStore } from "../stores/memoryStore";

export function useImages(){
  const {addImageLocal} = useMemoryStore()
  
  async function selectAndAddImage(
    memoryId? : Memory['id']
  ){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
  
      addImageLocal(memoryId, destinationUri)
      
      return {canceled: false, error: false}
    } else {
      return {canceled: true, error: false}
    }
  }

  return {
    selectAndAddImage
  }
}