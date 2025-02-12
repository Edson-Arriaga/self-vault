import { PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { Alert, Linking } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { addImage } from "../db/memories"
import * as FileSystem from 'expo-file-system'
import { Memory } from "../types"
import { useMemoryStore } from "../stores/memoryStore";
import { useImageStore } from "../stores/imageStore";
import { useEffect } from "react";

export function useImages(){
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
  const {addImageLocal} = useMemoryStore()
  const {setPemissionsAllowed, setIsMemoryListScreenUpdated} = useImageStore()
  
  async function verifyImagePermissions( refreshScreenHandler?: () => void ){
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
  
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "The app needs access to your photos to help you save and manage your memories.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => {
            Linking.openSettings()
            if(refreshScreenHandler){
              refreshScreenHandler()
            }
          } },
        ]
      )
      setPemissionsAllowed(false)
      return false
    }

    if (cameraPermissionInformation?.status === undefined) {
      setIsMemoryListScreenUpdated(false)
      return false
    }
    setPemissionsAllowed(true)
    return true
  }

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
    verifyImagePermissions,
    selectAndAddImage
  }
}