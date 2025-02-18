import { useDB } from ".."
import { FavAndOther, FavAndOtherSchema, FavsAndOthersSchema } from "../../types"

export async function getFavsAndOthers(){
  const db = await useDB()
  try {
    const allRows = await db.getAllAsync('SELECT * FROM favsAndOthers')
    const result = FavsAndOthersSchema.safeParse(allRows)
    if(result.success){
      return {data: result.data, error: false}
    }else{
      return {data: [], error: true, message: 'Error fetching data' }
    }
  } catch (error) {
    return { data: [], error: true, message: 'Error fetching data' }
  }
}

export async function getFavAndOtherById(favAndOtherId : FavAndOther['id']){
  const db = await useDB()
  try {
    const response = await db.getFirstAsync('SELECT * FROM favsAndOthers WHERE id = ?', favAndOtherId!);
    const result = FavAndOtherSchema.safeParse(response)
    if(result.success){
      return {data: result.data, error: false}
    }else{
      return {data: {} as FavAndOther, error: true, message: 'Error fetching data' }
    }
  } catch (error) {
    return { data: {} as FavAndOther, error: true, message: 'Error fetching data' }
  }
}


export async function addFavAndOther(favAndOther: FavAndOther){
  const db = await useDB()
  
  try {
    const result = FavAndOtherSchema.safeParse(favAndOther)

    if(!result.success){
      return { error: true, message: 'Error adding entry' }
    }
    console.log(favAndOther)
    await db.runAsync('INSERT INTO favsAndOthers (id, entry, category, section) VALUES (?, ?, ?, ?)', 
      favAndOther.id!, favAndOther.entry, favAndOther.category, favAndOther.section
    )

    return {error: false}

  } catch (error) {
    return { error: true, message: 'Error adding entry' }
  }
}

export async function updateFavAndOther(favAndOtherId: FavAndOther['id'], entry: FavAndOther['entry']){
  const db = await useDB()
  
  try {
    if (!favAndOtherId) {
      return { error: true, message: 'Error deleting data' }
    }
  
    await db.runAsync('UPDATE favsAndOthers SET entry = ? WHERE id = ?', entry, favAndOtherId)

    return { error: false }
  } catch (error) {
    return { error: true, message: 'Error deleting data' }
  }
}

export async function deleteFavAndOther(FavAndOtherId: FavAndOther['id']){
  const db = await useDB()
  
  try {
    if (!FavAndOtherId) {
      return { error: true, message: 'Error deleting data' }
    }
  
    await db.runAsync('DELETE FROM favsAndOthers WHERE id = ?', FavAndOtherId)

    return { error: false }
  } catch (error) {
    return { error: true, message: 'Error deleting data' }
  }
}