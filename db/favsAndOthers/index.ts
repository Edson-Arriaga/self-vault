import { FavAndOther, FavAndOtherForm } from "../../types"
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { favsAndOthersTable } from '../schema';
import { eq } from 'drizzle-orm';

const expo = SQLite.openDatabaseSync('db.db')
const db = drizzle(expo)

export async function getFavsAndOthers(){
  try {
    const FavsAndOthers = await db.select().from(favsAndOthersTable)
    return { data: FavsAndOthers }
  } catch (error) {
    return { data: [], error: 'Error fetching data'}
  }
}

export async function getFavAndOtherById(favAndOtherId : FavAndOther['id']){
  try {
      const favAndOther = await db.select().from(favsAndOthersTable).where(eq(favsAndOthersTable.id, favAndOtherId))
      return { data: favAndOther[0] }
    } catch (error) {
      return { data: {} as FavAndOther, error: 'Error fetching data'}
    }
}

export async function addFavAndOther(favAndOther: FavAndOtherForm & Pick<FavAndOther, 'category' | 'section'>){
  try {
    const newfao = await db.insert(favsAndOthersTable).values(favAndOther)
    return { data: newfao.lastInsertRowId }
  } catch (error) {
    return { error: 'Error adding entry' }
  }
}

export async function updateFavAndOther(favAndOtherId: FavAndOther['id'], entry: FavAndOther['entry']){
  try {
    await db.update(favsAndOthersTable).set({entry}).where(eq(favsAndOthersTable.id, favAndOtherId))
  } catch (error) {
    return { error: 'Error updating data' }
  }
}

export async function deleteFavAndOther(FavAndOtherId: FavAndOther['id']){
  try {
    await db.delete(favsAndOthersTable).where(eq(favsAndOthersTable.id, FavAndOtherId))
  } catch (error) {
    return { error: 'Error deleting data' }
  }
}