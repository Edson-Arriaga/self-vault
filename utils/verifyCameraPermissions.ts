import { PermissionResponse, PermissionStatus } from "expo-image-picker";
import { Alert, Linking } from "react-native";

export async function verifyCameraPermissions(
  cameraPermissionInformation: PermissionResponse | null, 
  requestPermission: () => Promise<PermissionResponse>
){
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
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false
  }

  return true
}