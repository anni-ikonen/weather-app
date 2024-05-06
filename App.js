import { StatusBar } from 'expo-status-bar'
import Search from './screens/Search'
import { PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <Search />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

