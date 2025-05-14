import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, ScrollView, Alert } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MAX_PLAYERS = 10;
const MAX_ROUNDS = 20;
const MAX_ROUND_TIME = 120;

const GameScreen: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState('2');
  const [numRounds, setNumRounds] = useState('5');
  const [roundTime, setRoundTime] = useState('60');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const params = useLocalSearchParams<{
    returnedTheme?: string;
    p_players?: string;
    p_rounds?: string;
    p_time?: string;
  }>();

  useEffect(() => {
    if (params.p_players) setNumPlayers(params.p_players);
    if (params.p_rounds) setNumRounds(params.p_rounds);
    if (params.p_time) setRoundTime(params.p_time);
    if (params.returnedTheme) setSelectedTheme(params.returnedTheme);

  }, [params.p_players, params.p_rounds, params.p_time, params.returnedTheme]);


  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    max: number,
    min: number = 1
  ) => {
    const numericValue = parseInt(value, 10);
    if (value === '') {
      setter('');
    } else if (!isNaN(numericValue)) {
      if (numericValue >= min && numericValue <= max) {
        setter(value);
      } else if (numericValue > max) {
        setter(max.toString());
      } else if (numericValue < min && value !== '0') { 
        setter(min.toString());
      } else {
        setter(value); 
      }
    }
  };

  const ensureValidNumber = (
    currentValue: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    min: number = 1
  ) => {
    if (currentValue === '' || parseInt(currentValue, 10) < min) {
      setter(min.toString());
    }
  };


  const handleNavigateToThemeSelection = () => {
    router.push({
      pathname: '/themeSelection',
      params: {
        currentPlayers: numPlayers,
        currentRounds: numRounds,
        currentTime: roundTime,
        currentSelectedTheme: selectedTheme || '', 
      },
    });
  };

  const handleStartMatch = () => {
    if (!numPlayers || parseInt(numPlayers) < 1 ||
        !numRounds || parseInt(numRounds) < 1 ||
        !roundTime || parseInt(roundTime) < 1) {
      Alert.alert("Configuração Incompleta", "Por favor, preencha todas as configurações numéricas corretamente.");
      return;
    }
    if (!selectedTheme) {
      Alert.alert("Tema não selecionado", "Por favor, selecione um tema para o jogo.");
      return;
    }

    router.push({
      pathname: '/match',
      params: {
        players: numPlayers,
        rounds: numRounds,
        time: roundTime,
        theme: selectedTheme,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerLeft: () => null }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.onScreenBackButton}>
          <Ionicons name="arrow-back" size={30} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Configure sua partida</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Número de jogadores:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numPlayers}
            onChangeText={(text) => handleInputChange(text, setNumPlayers, MAX_PLAYERS)}
            onBlur={() => ensureValidNumber(numPlayers, setNumPlayers)}
            maxLength={2}
          />
        </View>
        <Text style={styles.hintText}>(1-{MAX_PLAYERS})</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Número de Rodadas:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numRounds}
            onChangeText={(text) => handleInputChange(text, setNumRounds, MAX_ROUNDS)}
            onBlur={() => ensureValidNumber(numRounds, setNumRounds)}
            maxLength={2}
          />
        </View>
        <Text style={styles.hintText}>(1-{MAX_ROUNDS})</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Tempo por Rodada (s):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={roundTime}
            onChangeText={(text) => handleInputChange(text, setRoundTime, MAX_ROUND_TIME)}
            onBlur={() => ensureValidNumber(roundTime, setRoundTime)}
            maxLength={3}
          />
        </View>
        <Text style={styles.hintText}>(1-{MAX_ROUND_TIME} segundos)</Text>

        <TouchableOpacity
          style={[styles.actionButtonBase, styles.themeButton]}
          onPress={handleNavigateToThemeSelection}
        >
          <Text style={styles.themeButtonText}>
            {selectedTheme ? `Tema: ${selectedTheme}` : "Escolher Tema do Jogo"}
          </Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.themeButtonIconColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButtonBase, styles.startMatchButton]}
          onPress={handleStartMatch}
        >
          <Text style={styles.startMatchButtonText}>Iniciar Partida</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
export default GameScreen;

const COLORS = {
  background: '#E8EAF6',
  primary: '#3F51B5',
  secondary: '#5C6BC0',
  accent: '#7161EF',
  themeButtonBackground: '#B79CED',
  themeButtonTextColor: '#FFFFFF',    
  themeButtonIconColor: '#FFFFFF',   
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
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  onScreenBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 20,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
    marginTop: 50,
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
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 18,
    width: 80,
    textAlign: 'center',
    color: COLORS.inputText,
    backgroundColor: '#FFF',
  },
  hintText: {
    fontSize: 12,
    color: COLORS.hintText,
    width: '90%',
    textAlign: 'right',
    marginBottom: 20,
  },
  actionButtonBase: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  themeButton: {
    backgroundColor: COLORS.themeButtonBackground,
    justifyContent: 'space-between',
  },
  themeButtonText: {
    color: COLORS.themeButtonTextColor, 
    fontSize: 18,
    fontWeight: 'bold',
  },
  startMatchButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
  },
  startMatchButtonText: {
    color: COLORS.textWhite,
    fontSize: 20,
    fontWeight: 'bold',
  },
});