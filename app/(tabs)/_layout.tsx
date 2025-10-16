import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import StaticsProvider from '@/context/StaticsContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Provider } from '@react-native-material/core';
import { AuthProvider } from '../../context/AuthContext';
import { HomeProvider } from '../../context/HomeContext';
import LoadingContextProvider from '../../context/LoadingContext';
import SuccessAnimationContextProvider from '../../context/SuccessAnimationContext';
import { UserProvider } from '../../context/UserContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <AuthProvider>
      <LoadingContextProvider>
        <SuccessAnimationContextProvider>
          <UserProvider>
            <StaticsProvider>
              <HomeProvider>
                <Provider>
                  <Tabs
                    screenOptions={{
                      tabBarActiveTintColor: Colors['light'].tint,
                      headerShown: false,
                      tabBarButton: HapticTab,
                    }}>
                    <Tabs.Screen
                      name="Home"
                      options={{
                        title: 'Hogar',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                      }}
                    />
                    <Tabs.Screen
                      name="Expenses"
                      options={{
                        title: 'Gastos',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="dollarsign" color={color} />,
                      }}
                    />
                    <Tabs.Screen
                      name="invite"
                      options={{
                        title: 'Invitar',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                      }}
                    />
                    <Tabs.Screen
                      name="Profile"
                      options={{
                        title: 'Perfil',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                      }}
                      
                    />
                  </Tabs>
                </Provider>
              </HomeProvider>
            </StaticsProvider>
          </UserProvider>
        </SuccessAnimationContextProvider>
      </LoadingContextProvider>
    </AuthProvider>
  );
}
