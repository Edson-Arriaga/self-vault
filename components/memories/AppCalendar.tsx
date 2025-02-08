import { useCallback, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Direction } from "react-native-calendars/src/types";
import { MemoryForm } from "../../types";

export default function AppCalendar({date, setData} : {date: string, setData: React.Dispatch<React.SetStateAction<MemoryForm>>}) {

  const onDayPress = useCallback((day : any) => {
    setData(prev => ({...prev, date: day.dateString}))
  }, [])

  const marked = useMemo(() => {
    return {
      [date]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: Colors.aqua,
        selectedTextColor: Colors.cream
      }
    };
  }, [date]);

  return (
    <Calendar
      initialDate={date}
      onDayPress={onDayPress}
      markedDates={marked}
      maxDate={new Date().toLocaleDateString('en-CA')}
      styles={{backgroundColor: '#000'}}
      renderArrow={(direction: Direction) => direction === 'right' 
        ? <AntDesign name="caretright" size={24} color={Colors.gray} />
        : <AntDesign name="caretleft" size={24} color={Colors.gray} />
      }
    />
  )
}
