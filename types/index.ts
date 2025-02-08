import {z} from 'zod'

export const MemorySchema = z.object({
  id: z.number().optional(),
  title: z.string().trim().min(1).max(55),
  description: z.string().trim().min(1).max(1500),
  category: z.string().min(1),
  date: z.string(),
  imageUri: z.string(),
  createdAt: z.string().optional()
})


export const MemoriesSchema = z.array(MemorySchema) 

export type Memory = z.infer<typeof MemorySchema>
export type MemoryForm = Pick<Memory, 'title' | 'description' | 'date' | 'imageUri'>

export const FavAndOtherSchema = z.object({
  id: z.number().optional(),
  entry: z.string().trim().min(1).max(150),
  section: z.string().min(1),
  category: z.string().min(1),
  createdAt: z.string().optional()
})

export const FavsAndOthersSchema = z.array(FavAndOtherSchema) 

export type FavAndOther = z.infer<typeof FavAndOtherSchema>