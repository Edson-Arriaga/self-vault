import { useDB } from '..';
import { MemoriesSchema, Memory, MemorySchema } from '../../types';
import { deleteAsync } from 'expo-file-system';

export async function getMemories(){
  const db = await useDB()
  try {
    const allRows = await db.getAllAsync('SELECT * FROM memories')
    const result = MemoriesSchema.safeParse(allRows)
    if(result.success){
      return {data: result.data, error: false}
    }else{
      return {data: [], error: true, message: 'Error fetching memories' }
    }
  } catch (error) {
    return { data: [], error: true, message: 'Error fetching memories' }
  }
}

export async function getMemoryById(memoryId : Memory['id']){
  const db = await useDB()
  try {
    const response = await db.getFirstAsync('SELECT * FROM memories WHERE id = ?', memoryId!);
    const result = MemorySchema.safeParse(response)
    if(result.success){
      return {data: result.data, error: false}
    }else{
      return {data: {} as Memory, error: true, message: 'Error fetching Memory' }
    }
  } catch (error) {
    return { data: {} as Memory, error: true, message: 'Error fetching Memory' }
  }
}


export async function addMemory(mem: Memory){
  const db = await useDB()
  
  try {
    const result = MemorySchema.safeParse(mem)
    if(!result.success){
      return { error: true, message: 'Error adding memory' }
    }

    await db.runAsync('INSERT INTO memories (id, title, description, category, date, imageUri) VALUES (?, ?, ?, ?, ?, ?)', 
      mem.id!, mem.title, mem.description, mem.category, mem.date, mem.imageUri
    )

    return { error: false }

  } catch (error) {
    return { error: true, message: 'Error adding memory' }
  }
}

export async function updateMemory(memoryId: Memory['id'], data: Partial<Memory>){
  const db = await useDB()
  
  try {
    if (!memoryId || Object.keys(data).length === 0) {
      return { error: true, message: 'Error updating data' }
    }
    
    const keys = Object.keys(data)
    const values = Object.values(data)
  
    const setClause = keys.map(key => `${key} = ?`).join(', ')

    await db.runAsync(`UPDATE memories SET ${setClause} WHERE id = ?`, ...values, memoryId)

    return { error: false }
  } catch (error) {
    return { error: true, message: 'Error updating data' }
  }
}

export async function deleteMemory(memoryId: Memory['id']){
  const db = await useDB()
  
  try {
    if (!memoryId) {
      return { error: true, message: 'Error deleting memory' }
    }
    
    const result = await db.getFirstAsync<{ imageUri: string }>('SELECT imageUri FROM memories WHERE id = ?', memoryId)
    const imageUri = result?.imageUri
  
    if(imageUri !== ''){
      await deleteAsync(imageUri!, {idempotent: true})
    }
    
    await db.runAsync('DELETE FROM memories WHERE id = ?', memoryId)
    return { error: false }
  } catch (error) {
    return { error: true, message: 'Error deleting memory' }
  }
}

export async function addImage(memoryId: Memory['id'], imageUri : string){
  const db = await useDB()
  
  try {
    if (!imageUri || !memoryId) {
      return { error: true, message: 'Error adding image' }
    }
    
    await db.runAsync('UPDATE memories SET imageUri = ? WHERE id = ?', imageUri, memoryId)
    return { error: false }
  } catch (error) {
    return { error: true, message: 'Error adding image' }
  }
}