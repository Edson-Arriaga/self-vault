import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

export default function ErrorScreen() {
  
  const navigation = useNavigation()

  async function returnHomeHandler(){
    navigation.navigate('Home')
  }
  
  return (
    <View className="flex-1 items-center justify-center gap-5">
      <Text className="font-primary-bold text-2xl px-5 pt-3">Oops! Something went wrong 😞</Text>
      <Text className="font-primary-semibold text-xl px-5 -mt-5">Please try again later...</Text>
      <Pressable
        className="border-aqua border bg-aqua/50 p-3 rounded-xl"
        onPress={returnHomeHandler}
      >
        <Text className="font-primary-semibold text-xl">Go back to Home</Text>
      </Pressable>
    </View>
  )
}
