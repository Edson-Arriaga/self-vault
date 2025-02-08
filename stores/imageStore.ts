import { create } from "zustand"

interface ImageStoreState {
  activeUriImage: string,
  setActiveUriImage: (id: string) => void,
  isImageModalActive: boolean,
  setIsImageModalActive: (status: boolean) => void 
}

export const useImageStore = create<ImageStoreState>()((set) => ({
  activeUriImage: '',
  setActiveUriImage: (id) => set(() => ({activeUriImage: id})),
  isImageModalActive: false,
  setIsImageModalActive: (status) => set(() => ({isImageModalActive: status}))
}))