import { create } from 'zustand'
import { Memory } from '../types'

interface MemoryState {
  memories: Memory[],
  setMemories: (memories : Memory[]) => void,
  addMemoryLocal: (mem: Memory) => void 
  deleteMemoryLocal: (memId: Memory['id']) => void 
  updateMemoryLocal: (memId: number, data: Partial<Memory>) => void
  addImageLocal: (memId: Memory['id'], imageUri : string) => void
}

export const useMemoryStore = create<MemoryState>()((set, get) => ({
  memories: [],
  setMemories: (memories) => set(() => ({memories})),
  addMemoryLocal: (mem) => set(() => ({memories: [...get().memories, mem]})),
  deleteMemoryLocal: (memId) => set(() => ({memories: get().memories.filter((mem => mem.id !== memId))})),
  updateMemoryLocal: (memId, data) => set(() => ({
    memories: get().memories.map(mem => mem.id === memId ? {...mem, ...data} : mem)
  })),
  addImageLocal: (memId, imageUri) => set(() => ({
    memories: get().memories.map(mem => mem.id === memId ? {...mem, imageUri } : mem)
  }))
}))