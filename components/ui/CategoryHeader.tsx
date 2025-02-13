import React from 'react'
import { Image, Text, View } from 'react-native'
import { Category } from '../../constants/Sections'
import { MotiView } from 'moti'

type CategoryHeaderProps = {
  category: Category
}

export default function CategoryHeader({category} : CategoryHeaderProps) {
  return (
    <View className="border-b-4 border-dashed border-gray items-center pt-12 pb-8">
      <MotiView
        from={{
          scale: 0
        }}
        animate={{
          scale: 1
        }}
        className='items-center'
      >
      <View className="size-56 rounded-3xl overflow-hidden shadow-xl shadow-black">
        <Image
          source={category!.image} 
          className="size-full"
        />
      </View>
      <Text className="font-primary-bold text-4xl text-gray mt-8 text-center pt-5">{category!.name}</Text>
      </MotiView>
    </View>

  )
}
