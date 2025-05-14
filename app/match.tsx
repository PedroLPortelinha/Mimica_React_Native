import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MatchScreen: React.FC = () => {

  const params = useLocalSearchParams<{ players?: string; rounds?: string; time?: string; theme?: string }>();

  const { players, rounds, time, theme } = params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: 'Partida em Andamento',
          headerLeft: () => (
            Platform.OS !== 'web' ? (
              <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10, padding: 5 }}>
                <Ionicons name="arrow-back" size={25} color="#fff" />
              </TouchableOpacity>
            ) : null
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Detalhes da Partida</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Jogadores: <Text style={styles.infoValue}>{players || 'N/A'}</Text></Text>
          <Text style={styles.infoText}>Rodadas: <Text style={styles.infoValue}>{rounds || 'N/A'}</Text></Text>
          <Text style={styles.infoText}>Tempo/Rodada: <Text style={styles.infoValue}>{time || 'N/A'} segundos</Text></Text>
          <Text style={styles.infoText}>Tema: <Text style={styles.infoValue}>{theme || 'N/A'}</Text></Text>
        </View>

        <Text style={styles.placeholder}>Lógica do jogo aqui...</Text>
        {/* Add your game logic, timers, displays, etc. here */}

        <TouchableOpacity
          style={styles.endMatchButton}
          onPress={() => router.replace('/')} // Example: Go back to home screen
        >
          <Text style={styles.endMatchButtonText}>Finalizar Partida</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default MatchScreen;

const COLORS = { // Define or import colors
    background: '#F5F5F5', // A slightly different background for the match screen
    primaryText: '#212121',
    secondaryText: '#757575',
    accent: '#D32F2F', // For end match button or critical actions
    infoValueText: '#0D47A1',
    buttonText: '#FFFFFF',
    containerBackground: '#FFFFFF',
    accentButton: '#7161EF',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    // justifyContent: 'center', // Adjust as per your match screen layout
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: COLORS.containerBackground,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '95%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 18,
    color: COLORS.secondaryText,
    marginBottom: 8,
  },
  infoValue: {
    fontWeight: 'bold',
    color: COLORS.infoValueText,
  },
  placeholder: {
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginVertical: 40,
  },
  endMatchButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto', // Push to bottom if container has flex: 1 and alignItems: 'center'
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  endMatchButtonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});