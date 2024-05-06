import { StatusBar } from 'expo-status-bar'
import Home from './screens/Home'
import { PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <Home />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

