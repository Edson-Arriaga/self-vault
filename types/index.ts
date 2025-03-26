import {z} from 'zod'
import { memoriesTable, favsAndOthersTable } from '../db/schema';

/* MEMORY TYPES */
export type Memory = typeof memoriesTable.$inferSelect

export const MemoryValidationForm = z.object({
  title: z.string().trim().min(1).max(55),
  description: z.string().trim().min(1).max(1500),
  date: z.string(),
  imageUri: z.string()
})

export type MemoryForm = z.infer<typeof MemoryValidationForm>


/* FAV AND OTHER TYPES */
export type FavAndOther = typeof favsAndOthersTable.$inferSelect

export const FavAndOtherValidationForm = z.object({
  entry: z.string().trim().min(1).max(150)
})

export type FavAndOtherForm = z.infer<typeof FavAndOtherValidationForm>
