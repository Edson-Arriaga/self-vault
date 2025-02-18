import { Pressable, Text } from "react-native";

type BottomButtonProps = {
  onPress: () => void
  children: React.ReactNode
}

export default function BottomButton({onPress, children} : BottomButtonProps) {
  return (
    <Pressable 
      className="bg-aqua py-5 justify-center items-center"
      onPress={onPress}
    >
      <Text className="font-primary-semibold text-4xl text-lightCream pt-5">{children}</Text>
    </Pressable>
  )
}
