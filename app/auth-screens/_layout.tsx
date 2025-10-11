import { Stack } from 'expo-router';
import React from 'react';

export default function AuthTabsLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack>
  );
}
