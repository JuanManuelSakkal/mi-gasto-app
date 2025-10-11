import React, { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import AuthStack from '@/app/navigation/AuthStack';
import { useNavigation } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

function RootNavigation() {
  const navigation = useNavigation();
  const { session, loading } = useAuth(); // 👈 acá obtenemos el estado global de auth

  useEffect(() => {  
    if (session) {
      navigation.navigate('(tabs)' as never);
    }
  }, [session, navigation]);

  // 1️⃣ Mientras estamos chequeando si hay sesión guardada en Supabase...
  if (loading) {
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
  
    );
  }

  // 2️⃣ Si hay sesión, significa que el usuario está logueado
  // Mostramos las pantallas principales (tabs, gastos, etc.)

    return <AuthStack />;
  }

export default function App() {
  return (
    <AuthProvider>
        <RootNavigation />
    </AuthProvider>
  );
}