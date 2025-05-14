import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';

const themes = ["Geral", "Filmes", "Animais", "Comida", "Esportes", "Profissões", "Objetos"];

const ThemeSelectionScreen: React.FC = () => {
  const params = useLocalSearchParams<{
    currentPlayers?: string;
    currentRounds?: string;
    currentTime?: string;
    currentSelectedTheme?: string; 
  }>();

  const handleSelectTheme = (theme: string) => {
    router.replace({ // Or router.push, replace might be better to not add to history stack unnecessarily
      pathname: '/game',
      params: {
        p_players: params.currentPlayers,
        p_rounds: params.currentRounds,
        p_time: params.currentTime,

        returnedTheme: theme,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: 'Selecionar Tema',
          headerLeft: () => (
            Platform.OS !== 'web' ? (
              <TouchableOpacity onPress={() => {
                router.replace({
                  pathname: '/game',
                  params: {
                    p_players: params.currentPlayers,
                    p_rounds: params.currentRounds,
                    p_time: params.currentTime,
                    returnedTheme: params.currentSelectedTheme || '', 
                  }
                });
              }} style={{ marginLeft: 10, padding: 5 }}>
                <Ionicons name="arrow-back" size={25} color="#fff" />
              </TouchableOpacity>
            ) : null
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Escolha o Tema</Text>
        {themes.map((themeName) => (
          <TouchableOpacity
            key={themeName}
            style={styles.button}
            onPress={() => handleSelectTheme(themeName)}
          >
            <Text style={styles.buttonText}>{themeName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ThemeSelectionScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8EAF6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#7161EF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});