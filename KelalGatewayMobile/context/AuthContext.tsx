import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    console.log('AuthProvider mounted');
    isMounted.current = true;
    
    const initializeAuth = async () => {
      try {
        console.log('Checking session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session check result:', session ? 'Has session' : 'No session');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (isMounted.current) {
          setTimeout(async () => {
            try {
              if (session) {
                console.log('Navigating to app...');
                await router.replace('/(app)');
              } else {
                console.log('Navigating to login...');
                await router.replace('/(auth)/login');
              }
            } catch (error: unknown) {
              console.error('Navigation error:', error);
            }
          }, 100);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (isMounted.current) {
        setTimeout(async () => {
          try {
            if (session) {
              console.log('Auth state change: navigating to app...');
              await router.replace('/(app)');
            } else {
              console.log('Auth state change: navigating to login...');
              await router.replace('/(auth)/login');
            }
          } catch (error: unknown) {
            console.error('Navigation error:', error);
          }
        }, 100);
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login...');
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting registration...');
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) throw error;
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error}</Text>
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 