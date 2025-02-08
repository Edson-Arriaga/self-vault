import { FavAndOther, Memory } from "."
import { SectionNames } from "../constants/Sections"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined
  MemoryListScreen: { categoryId: string }
  FavAndOtherListScreen: { categoryId: string, sectionName: SectionNames }
  MemoryFormScreen: { categoryName: string | undefined, selectedEditId: FavAndOther['id'] }
  FavAndOtherFormScreen: { categoryName: string | undefined, sectionName: SectionNames | undefined, selectedEditId: FavAndOther['id']}
  DisplayMemoryScreen: { memoryId: Memory['id'] }
  ErrorScreen: undefined
}