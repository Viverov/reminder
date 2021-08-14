import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/utils/useCachedResources';
import MainScreen from './src/components/MainScreen';
import Storage from './src/utils/Storage';

export default function App() {
  const isCacheLoaded = useCachedResources();

  const storage = new Storage();
  const isStorageLoaded = storage.loadStorage();

  if (!isCacheLoaded || !isStorageLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <MainScreen storage={storage} />
    </SafeAreaProvider>
  );
}
