import { openDatabaseAsync } from 'expo-sqlite'

export async function useDB(){
  return await openDatabaseAsync('selfVaultDB')
}

export async function initDB(){
  const db = await useDB()
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS memories (
        id INTEGER NOT NULL,
        title TEXT NOT NULL, 
        description TEXT NOT NULL, 
        category TEXT NOT NULL,
        date TEXT,
        imageUri TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS favsAndOthers (
        id INTEGER NOT NULL,
        entry TEXT NOT NULL,
        category TEXT NOT NULL,
        section TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `)
    return { error: false }
  } catch (error) {
    return { error: true, message: 'Error initializing the database' }
  }
}

export async function cleanDB(){
  const db = await useDB()
  
  try {
    await db.runAsync('DELETE FROM memories')
    await db.runAsync('DELETE FROM favsAndOthers')
  } catch (error) {
    return { error: true, message: 'Error cleaning memories' }
  }
}