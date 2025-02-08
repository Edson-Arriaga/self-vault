import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

export default function BgGradient() {
  return (
    <LinearGradient
      colors={[Colors.coral, 'transparent']}
      className="absolute inset-0 h-screen"
    />
  )
}
