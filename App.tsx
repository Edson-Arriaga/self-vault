import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import "./global.css"
import HomeScreen from './screens/HomeScreen';
import { Fragment, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { RootStackParamList } from './types/navigation';
import ErrorScreen from './screens/ErrorScreen';
import { Colors } from './constants/Colors';
import MemoryFormScreen from './screens/MemoryFormScreen';
import { getMemories } from './db/memories';
import Toast from 'react-native-toast-message';
import { useMemoryStore } from './stores/memoryStore';
import FavAndOtherFormScreen from './screens/FavAndOtherFormScreen';
import { useFavAndOtherStore } from './stores/favAndOtherStore';
import { getFavsAndOthers } from './db/favsAndOthers';
import DisplayMemoryScreen from './screens/DisplayMemoryScreen';
import MemoryListScreen from './screens/MemoryListScreen';
import FavAndOtherListScreen from './screens/FavAndOtherListScreen';
import { deleteAsync, documentDirectory, readDirectoryAsync } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { memoriesTable, favsAndOthersTable } from './db/schema';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

const stackScreenOptions : NativeStackNavigationOptions = {
  headerShown: false,
  headerStyle: { backgroundColor: Colors.aqua },
  headerTintColor: Colors.lightCream,
  contentStyle: { backgroundColor: Colors.cream },
  animation: 'slide_from_right'
}

const Stack = createNativeStackNavigator<RootStackParamList>()
SplashScreen.preventAutoHideAsync()

const expo = SQLite.openDatabaseSync('db.db')
const db = drizzle(expo)

export default function App() {
  const { success } = useMigrations(db, migrations)

  const {setMemories} = useMemoryStore()
  const {setFavsAndOthers} = useFavAndOtherStore()
  
  useEffect(() => {
    (async () => {
      // await db.delete(memoriesTable)
      // await db.delete(favsAndOthersTable)

      const resMem = await getMemories()
      const resFao = await getFavsAndOthers()

      if (resMem.error || resFao.error || !success) {
        Toast.show({
          type: 'error',
          text1: 'Error fetching data',
        })
      }

      setMemories(resMem.data)
      setFavsAndOthers(resFao.data)

      //const directory = documentDirectory
      //const files = await readDirectoryAsync(documentDirectory!)
      //console.log('Archivos almacenados:', files)

      //for (const file of files) {
        //await deleteAsync(directory + file)
      //}
      })()
  }, [])

  const [loaded, error] = useFonts({
    'edu-auvicwant-hand-regular': require('./assets/fonts/EduAUVICWANTHand-Regular.ttf'),
    'edu-auvicwant-hand-medium': require('./assets/fonts/EduAUVICWANTHand-Medium.ttf'),
    'edu-auvicwant-hand-semibold': require('./assets/fonts/EduAUVICWANTHand-SemiBold.ttf'),
    'edu-auvicwant-hand-bold': require('./assets/fonts/EduAUVICWANTHand-Bold.ttf')
  })

  useEffect(() => {
    if ((loaded || error)) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded) {
    return null
  }

  if(error){
    return <ErrorScreen />
  }
  
  return (
    <Fragment>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackScreenOptions}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='MemoryListScreen' component={MemoryListScreen} />
          <Stack.Screen name='FavAndOtherListScreen' component={FavAndOtherListScreen} />
          <Stack.Screen name='MemoryFormScreen' component={MemoryFormScreen} />
          <Stack.Screen name='FavAndOtherFormScreen' component={FavAndOtherFormScreen} />
          <Stack.Screen name='DisplayMemoryScreen' component={DisplayMemoryScreen} />
          <Stack.Screen name='ErrorScreen' component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Fragment>
  )
}