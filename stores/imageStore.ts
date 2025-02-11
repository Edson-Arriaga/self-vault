import { create } from "zustand"

interface ImageStoreState {
  activeImageUri: string,
  setActiveImageUri: (id: string) => void,
  isImageModalActive: boolean,
  setIsImageModalActive: (status: boolean) => void
  permissionsAllowed: boolean,
  setPemissionsAllowed: (status: boolean) => void,
  isMemoryListScreenUpdated: boolean,
  setIsMemoryListScreenUpdated: (status: boolean) => void,
}

export const useImageStore = create<ImageStoreState>()((set) => ({
  activeImageUri: '',
  setActiveImageUri: (id) => set(() => ({activeImageUri: id})),
  isImageModalActive: false,
  setIsImageModalActive: (status) => set(() => ({isImageModalActive: status})),
  permissionsAllowed: false,
  setPemissionsAllowed: (status) => set(() => ({permissionsAllowed: status})),
  isMemoryListScreenUpdated: false,
  setIsMemoryListScreenUpdated: (status) => set(() => ({isMemoryListScreenUpdated: status})),
}))