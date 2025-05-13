// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // This targets your app/index.tsx file
        options={{
          headerShown: false, // Hides the header
        }}
      />
      {/* Add other screens here if you have them */}
    </Stack>
  );
}