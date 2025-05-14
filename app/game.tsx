// app/game.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MAX_PLAYERS = 10;
const MAX_ROUNDS = 20;
const MAX_ROUND_TIME = 120; // Assuming seconds

const GameScreen: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState('2'); // Default to a string for TextInput
  const [numRounds, setNumRounds] = useState('5');
  const [roundTime, setRoundTime] = useState('60');

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    max: number
  ) => {
    const numericValue = parseInt(value, 10);
    if (value === '' || (numericValue >= 1 && numericValue <= max)) {
      setter(value);
    } else if (numericValue > max) {
      setter(max.toString());
    } else if (numericValue < 1 && value !== '') {
      setter('1');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/*
        If you want to hide the header previously defined in _layout.tsx for this screen:
        <Stack.Screen options={{ headerShown: false }} />
        Or, if you kept headerShown: true in _layout, but want to customize title here:
      */}
      <Stack.Screen
        options={{
          // title: 'Configurar Jogo', // You can override title here if needed
          headerLeft: () => null, // Explicitly remove header left (back button)
                                  // The header itself is controlled by _layout.tsx or can be hidden here
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.onScreenBackButton}>
          <Ionicons name="arrow-back" size={30} color="#3F51B5" />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Configure sua partida</Text>

        {/* Número de jogadores */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Número de jogadores:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numPlayers}
            onChangeText={(text) => handleInputChange(text, setNumPlayers, MAX_PLAYERS)}
            maxLength={2} // Max 10
          />
        </View>
        <Text style={styles.hintText}>(1-{MAX_PLAYERS})</Text>

        {/* Número de Rodadas */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Número de Rodadas:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numRounds}
            onChangeText={(text) => handleInputChange(text, setNumRounds, MAX_ROUNDS)}
            maxLength={2} // Max 20
          />
        </View>
        <Text style={styles.hintText}>(1-{MAX_ROUNDS})</Text>


        {/* Tempo por Rodada */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Tempo por Rodada:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={roundTime}
            onChangeText={(text) => handleInputChange(text, setRoundTime, MAX_ROUND_TIME)}
            maxLength={3} // Max 120
          />
        </View>
        <Text style={styles.hintText}>(1-{MAX_ROUND_TIME})</Text>


        {/* Tema do jogo */}
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => router.push('/themeSelection')}
        >
          <Text style={styles.themeButtonText}>Escolher Tema do Jogo</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>

        {/* This button is no longer needed as we have the on-screen back arrow
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.back()}
        >
          <Text style={styles.actionButtonText}>Voltar</Text>
        </TouchableOpacity>
        */}
      </ScrollView>
    </SafeAreaView>
  );
}
export default GameScreen;

const COLORS = { // Define COLORS locally or import if you have a central theme file
  background: '#E8EAF6',
  primary: '#3F51B5',
  secondary: '#5C6BC0',
  accent: '#7161EF',
  textWhite: '#FFFFFF',
  inputBorder: '#C5CAE9',
  inputText: '#333333',
  hintText: '#757575',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: 'center', // Remove this if you want content to start from top
    alignItems: 'center',
    padding: 20,
  },
  onScreenBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 20, // Adjust as needed based on status bar
    left: 20,
    zIndex: 1, // Ensure it's above other content
    padding: 5, // Increase touchable area
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
    marginTop: 50, // Add margin to avoid overlap with back button
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 5,
    marginTop: 15,
  },
  settingLabel: {
    fontSize: 18,
    color: COLORS.secondary,
    flex: 1, // Allow label to take space
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    width: 80, // Adjust width as needed
    textAlign: 'center',
    color: COLORS.inputText,
    backgroundColor: '#FFF',
  },
  hintText: {
    fontSize: 12,
    color: COLORS.hintText,
    width: '90%',
    textAlign: 'right', // Align with the input field
    marginBottom: 20,
  },
  themeButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 30,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  themeButtonText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Styles for the old button, can be removed
  // actionButton: {
  //   backgroundColor: '#7161EF',
  //   paddingVertical: 15,
  //   paddingHorizontal: 30,
  //   borderRadius: 25,
  //   marginTop: 20,
  // },
  // actionButtonText: {
  //   color: '#FFFFFF',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
});