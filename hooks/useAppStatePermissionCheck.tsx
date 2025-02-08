import { PermissionResponse } from "expo-image-picker";
import { useState, useEffect } from "react";
import { AppState } from "react-native";

export function useAppStatePermissionCheck(requestPermission: () => Promise<PermissionResponse>) {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        await requestPermission()
      }
      setAppState(nextAppState)
    });

    return () => {
      subscription.remove()
    }
  }, [appState, requestPermission])

  return appState
}
