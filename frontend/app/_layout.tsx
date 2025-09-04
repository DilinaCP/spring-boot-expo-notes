import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import './globals.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#F2F2F7' },
        }}
      />
    </Provider>
  );
}