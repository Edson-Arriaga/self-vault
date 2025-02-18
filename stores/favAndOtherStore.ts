import { create } from 'zustand'
import { FavAndOther } from '../types'
import * as Animatable from 'react-native-animatable';

interface FavAndOtherState {
  favsAndOthers: FavAndOther[],
  setFavsAndOthers: (faos : FavAndOther[]) => void,
  addFavAndOtherLocal: (fao: FavAndOther) => void 
  deleteFavAndOtherLocal: (faoId: FavAndOther['id']) => void
  updateFavAndOtherLocal: (faoId: FavAndOther['id'], newEntry: FavAndOther['entry']) => void,
  favAndOtherDeletedRef: React.RefObject<Animatable.View> | null,
  setFavAndOtherDeletedRef: (ref: React.RefObject<Animatable.View> | null) => void,
}

export const useFavAndOtherStore = create<FavAndOtherState>()((set, get) => ({
  favsAndOthers: [],
  setFavsAndOthers: (favsAndOthers) => set(() => ({favsAndOthers})),
  addFavAndOtherLocal: (favAndOther) => set(() => ({favsAndOthers: [...get().favsAndOthers, favAndOther]})),
  deleteFavAndOtherLocal: (favsAndOthersId) => set(() => ({
    favsAndOthers: get().favsAndOthers.filter((fao => fao.id !== favsAndOthersId))
  })),
  updateFavAndOtherLocal: (faoId, newEntry) => set(() => ({
    favsAndOthers: get().favsAndOthers.map(fao => fao.id === faoId ? {...fao, entry: newEntry} : fao)
  })),
  favAndOtherDeletedRef: null,
  setFavAndOtherDeletedRef: (favAndOtherDeletedRef) => set(() => ({favAndOtherDeletedRef}))
}))