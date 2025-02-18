import React from 'react'
import { Pressable, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useMemoryStore } from '../../stores/memoryStore';
import { useFavAndOtherStore } from '../../stores/favAndOtherStore';

type DeleteModalContentProps = {
  deleteHandler(): Promise<void>
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteModalContent({deleteHandler, setModalStatus} : DeleteModalContentProps) {
  
  const {setMemoryDeletedRef} = useMemoryStore()
  const {setFavAndOtherDeletedRef} = useFavAndOtherStore()
  
  function cancelDeleteHandler(){
    setModalStatus(false)
    setFavAndOtherDeletedRef(null)
    setMemoryDeletedRef(null)
  }
  
  return (
    <View className="justify-center items-center absolute inset-0 bg-black/80 z-50">
      <Animatable.View animation={'bounceIn'} className='bg-lightCream border-4 border-coral rounded-xl mx-3'>
        <View className="gap-8 rounded-lg border-2 border-coral/50 p-5">
          <Text className="font-primary-semibold text-2xl text-gray">Are you sure you want to delete this item?</Text>
          <View className="flex-row justify-evenly gap-5">
            <Pressable onPress={deleteHandler} className="bg-red/80 border-red border p-5 items-center justify-center flex-1 rounded-xl">
              <Text className="text-white font-primary-bold text-lg">Delete item</Text>
            </Pressable>
            <Pressable onPress={cancelDeleteHandler} className="bg-gray/80 border border-gray p-5 rounded-xl">
              <Text className="text-white font-primary-bold text-lg">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Animatable.View>
    </View>
  )
}
