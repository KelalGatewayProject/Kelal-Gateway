import { Stack, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { session, loading } = useAuth();

  console.log('AuthLayout render - session:', !!session, 'loading:', loading);

  // Redirect to app if already authenticated
  useEffect(() => {
    const redirectIfAuthenticated = async () => {
      console.log('AuthLayout effect - checking auth state');
      if (session && !loading) {
        console.log('AuthLayout - session found, redirecting to app...');
        try {
          await router.replace('/(app)');
        } catch (error) {
          console.error('AuthLayout - navigation error:', error);
        }
      } else {
        console.log('AuthLayout - no session or still loading');
      }
    };

    redirectIfAuthenticated();
  }, [session, loading]);

  if (loading) {
    console.log('AuthLayout - showing loading state');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('AuthLayout - rendering auth stack');
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: 'white' },
      }}
      initialRouteName="login"
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  );
} 