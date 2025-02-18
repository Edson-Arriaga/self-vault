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
  const {setMemoryDeletedRef, memoryDeletedRef} = useMemoryStore()

  async function deleteMemorieHandler(){
    const response = await deleteMemory(memoryId)

    if(response.error) {
      navigation.navigate('ErrorScreen')
      return
    }

    setModalStatus(false)
    await memoryDeletedRef?.current?.animate('bounceOut', 700)
    setMemoryDeletedRef(null)
    deleteMemoryLocal(memoryId)
    Toast.show({
      type: 'success',
      text1: '✅ Item Deleted Succesfully.'
    })
  }
  
  return <DeleteModalContent  deleteHandler={deleteMemorieHandler} setModalStatus={setModalStatus}/>
}
