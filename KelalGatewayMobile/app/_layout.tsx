import { Stack, SplashScreen } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { View } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Add any custom fonts here if needed
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
          initialRouteName="(auth)"
        >
          <Stack.Screen 
            name="(auth)" 
            options={{ 
              headerShown: false,
              gestureEnabled: false 
            }} 
          />
          <Stack.Screen 
            name="(app)" 
            options={{ 
              headerShown: false,
              gestureEnabled: false 
            }} 
          />
        </Stack>
      </AuthProvider>
    </View>
  );
} 