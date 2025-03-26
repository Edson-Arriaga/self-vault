import { Memory, MemoryForm } from '../../types';
import { deleteAsync } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { memoriesTable } from '../schema';
import { eq } from 'drizzle-orm';

const expo = SQLite.openDatabaseSync('db.db')
const db = drizzle(expo)

export async function getMemories(){
  try {
    const memories = await db.select().from(memoriesTable)
    return { data: memories }
  } catch (error) {
    return { data: [], error: 'Error fetching memories'}
  }
}

export async function getMemoryById(memoryId : Memory['id']){
  try {
    const memorie = await db.select().from(memoriesTable).where(eq(memoriesTable.id, memoryId))
    return { data: memorie[0] }
  } catch (error) {
    return { data: {} as Memory, error: 'Error fetching memorie'}
  }
}

export async function addMemory(mem: MemoryForm & Pick<Memory, 'category'>){
  try {
    const newMem = await db.insert(memoriesTable).values(mem)
    return { data : newMem.lastInsertRowId }
  } catch (error) {
    return { error: 'Error adding memory' }
  }
}

export async function updateMemory(memoryId: Memory['id'], data: Partial<Memory>, prevImageUri: Memory['imageUri']){    
  try {
    await db.update(memoriesTable).set(data).where(eq(memoriesTable.id, memoryId))

    if(data.imageUri === ''){
      await deleteAsync(prevImageUri, {idempotent: true})
    }

  } catch (error) {
    return { error: 'Error updating data' }
  }
}

export async function deleteMemory(memoryId: Memory['id']){
  try {
    const memorie = await db.select().from(memoriesTable).where(eq(memoriesTable.id, memoryId))

    const imageUri = memorie[0].imageUri

    if(imageUri !== ''){
      await deleteAsync(imageUri!, {idempotent: true})
    }

    await db.delete(memoriesTable).where(eq(memoriesTable.id, memoryId))
  } catch (error) {
    return { message: 'Error deleting memory' }
  }
}

export async function addImage(memoryId: Memory['id'], imageUri : Memory['imageUri']){
  try {
    await db.update(memoriesTable).set({imageUri}).where(eq(memoriesTable.id, memoryId))
  } catch (error) {
    return { error: 'Error adding image' }
  }
}