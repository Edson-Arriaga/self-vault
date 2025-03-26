import { MemoryForm } from "../types";

export function filterDifferntFields(prevData : MemoryForm, currData : MemoryForm){
  let newData = {}
  console.log(prevData)
  console.log(currData)
  const keysAndPrevValues = Object.entries(prevData)
  const newValues = Object.values(currData)
  
  keysAndPrevValues.forEach(([key, prevVal], i) => (prevVal !== newValues[i]) 
    ? newData = { ...newData, [key]: newValues[i]} 
    : newData = {...newData}
  )
  console.log(newData)
  return newData
}