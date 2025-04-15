import { Stack, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function AppLayout() {
  const { user, session, loading } = useAuth();

  console.log('AppLayout render - user:', !!user, 'session:', !!session, 'loading:', loading);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AppLayout effect - checking auth');
      if (!session && !loading) {
        console.log('AppLayout - no session, redirecting to auth...');
        try {
          await router.replace('/(auth)');
        } catch (error: unknown) {
          console.error('AppLayout - navigation error:', error);
        }
      }
    };

    checkAuth();
  }, [session, loading]);

  if (loading) {
    console.log('AppLayout - showing loading state');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (!user || !session) {
    console.log('AppLayout - no user or session, returning null');
    return null;
  }

  console.log('AppLayout - rendering app stack');
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: 'white' },
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            <Text onPress={() => router.replace('/(auth)')} style={{ marginRight: 10, color: '#007AFF' }}>
              Logout
            </Text>
          ),
        }}
      />
    </Stack>
  );
} 