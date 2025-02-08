import { FavAndOther } from "../../types";
import Toast from "react-native-toast-message";
import DeleteModalContent from "../ui/DeleteModalContent";
import { deleteFavAndOther } from "../../db/favsAndOthers";
import { useFavAndOtherStore } from "../../stores/favAndOtherStore";
import { useNavigation } from "@react-navigation/native";

type ImageModal = {
  favAndOtherId: FavAndOther['id']
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteFavAndOtherModal({favAndOtherId, setModalStatus} : ImageModal) {
  
  const {deleteFavAndOtherLocal} = useFavAndOtherStore()

  const navigation = useNavigation()
  
  async function deleteMemorieHandler(){
    const response = await deleteFavAndOther(favAndOtherId)

    if(response.error) {
      navigation.navigate('ErrorScreen')
      return
    }

    deleteFavAndOtherLocal(favAndOtherId)
    setModalStatus(false)
    Toast.show({
      type: 'success',
      text1: '✅ Memory Deleted Succesfully.'
    })
  }
  
  return <DeleteModalContent  deleteHandler={deleteMemorieHandler} setModalStatus={setModalStatus}/>
}
