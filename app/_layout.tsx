// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          // We will control the header from within game.tsx
          // If you want NO header at all for the game screen, set headerShown: false here.
          // If you want a title but no back arrow, we'll handle it in game.tsx.
          // For now, let's assume you might still want the title "Jogo".
          headerShown: false, // Keep the title, but we'll remove the default back arrow
          headerLeft: () => null, // Remove the default back arrow from here
          title: 'Jogo', // You can set the title here or in game.tsx
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="options"
        options={{
          // Similar to game screen, manage header appearance
          headerShown: false,
          headerLeft: () => null,
          title: 'Opções',
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen // New screen for theme selection
        name="themeSelection"
        options={{
          title: 'Escolher Tema', // Or set in themeSelection.tsx
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          // It will have its own header back arrow by default or a custom one
        }}
      />
    </Stack>
  );
}