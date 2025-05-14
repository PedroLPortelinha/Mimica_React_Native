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
          headerShown: false,
          headerLeft: () => null,
          title: 'Jogo',
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="options"
        options={{
          headerShown: false,
          headerLeft: () => null,
          title: 'Opções',
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="themeSelection"
        options={{
          headerShown: false,
          title: 'Escolher Tema',
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
        name="match"
        options={{
          headerShown: false,
          title: 'Partida', 
          headerStyle: { backgroundColor: '#7161EF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}