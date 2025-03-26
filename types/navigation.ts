import { FavAndOther, Memory } from "."
import { Category, SectionNames } from "../constants/Sections"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined
  MemoryListScreen: { categoryId: Category['id'] }
  FavAndOtherListScreen: { categoryId: Category['id'], sectionName: SectionNames }
  MemoryFormScreen: { categoryName: Category['name'] | undefined, selectedEditId: Memory['id'] | undefined}
  FavAndOtherFormScreen: { categoryName: Category['name'] | undefined, sectionName: SectionNames | undefined, selectedEditId: FavAndOther['id'] | undefined}
  DisplayMemoryScreen: { memoryId: Memory['id'] }
  ErrorScreen: undefined
}