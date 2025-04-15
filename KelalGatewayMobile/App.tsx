import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { Slot } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Tell the splash screen to hide
    SplashScreen.hideAsync();
  }, []);

  return <Slot />;
} 