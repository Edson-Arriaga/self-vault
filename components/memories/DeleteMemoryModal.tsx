import { deleteMemory } from "../../db/memories";
import { useMemoryStore } from "../../stores/memoryStore";
import { Memory } from "../../types";
import Toast from "react-native-toast-message";
import DeleteModalContent from "../ui/DeleteModalContent";
import { useNavigation } from "@react-navigation/native";

type DeleteMemoryModalProps = {
  memoryId: Memory['id']
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteMemoryModal({memoryId, setModalStatus} : DeleteMemoryModalProps) {
  
  const {deleteMemoryLocal} = useMemoryStore()

  const navigation = useNavigation()
  
  async function deleteMemorieHandler(){
    const response = await deleteMemory(memoryId)

    if(response.error) {
      navigation.navigate('ErrorScreen')
      return
    }

    deleteMemoryLocal(memoryId)
    setModalStatus(false)
    Toast.show({
      type: 'success',
      text1: '✅ Memory Deleted Succesfully.'
    })
  }
  
  return <DeleteModalContent  deleteHandler={deleteMemorieHandler} setModalStatus={setModalStatus}/>
}
