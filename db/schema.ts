import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const memoriesTable = sqliteTable("memories", {
  id: int().primaryKey({autoIncrement: true}),
  title: text().notNull(), 
  description: text().notNull(), 
  category: text().notNull(),
  date: text().notNull().default(''),
  imageUri: text().notNull().default('')
})

export const favsAndOthersTable = sqliteTable("favsAndOthers", {
  id: int().primaryKey({autoIncrement: true}),
  entry: text().notNull(), 
  category: text().notNull(), 
  section: text().notNull()
})