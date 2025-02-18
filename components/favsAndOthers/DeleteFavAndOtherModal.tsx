import { FavAndOther } from "../../types";
import Toast from "react-native-toast-message";
import DeleteModalContent from "../ui/DeleteModalContent";
import { deleteFavAndOther } from "../../db/favsAndOthers";
import { useFavAndOtherStore } from "../../stores/favAndOtherStore";
import { useNavigation } from "@react-navigation/native";

type DeleteFavAndOtherModalProps = {
  favAndOtherId: FavAndOther['id']
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteFavAndOtherModal({favAndOtherId, setModalStatus} : DeleteFavAndOtherModalProps) {
  
  const {deleteFavAndOtherLocal} = useFavAndOtherStore()

  const navigation = useNavigation()
  const {favAndOtherDeletedRef, setFavAndOtherDeletedRef} = useFavAndOtherStore()
  
  async function deleteMemorieHandler(){
    const response = await deleteFavAndOther(favAndOtherId)

    if(response.error) {
      navigation.navigate('ErrorScreen')
      return
    }

    setModalStatus(false)
    await favAndOtherDeletedRef?.current?.animate('bounceOut', 700)
    setFavAndOtherDeletedRef(null)
    deleteFavAndOtherLocal(favAndOtherId)
    Toast.show({
      type: 'success',
      text1: '✅ Memory Deleted Succesfully.'
    })
  }
  
  return <DeleteModalContent deleteHandler={deleteMemorieHandler} setModalStatus={setModalStatus}/>
}
