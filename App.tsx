import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './utils/useCachedResources';
import { MainScreen } from "./components/MainScreen";
import Storage from "./utils/Storage";

export default function App() {
  const isCacheLoaded = useCachedResources();

  const storage = new Storage()
  const isStorageLoaded = storage.loadStorage()

  if (!isCacheLoaded || !isStorageLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <MainScreen storage={storage}/>
      </SafeAreaProvider>
    );
  }
}
