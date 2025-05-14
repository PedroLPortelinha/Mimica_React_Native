import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Checkbox from 'expo-checkbox';

const OptionsScreen: React.FC = () => {
  const [masterVolume, setMasterVolume] = useState(0.75);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [gameVolume, setGameVolume] = useState(0.6);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleVolumeTextChange = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const num = parseInt(text, 10);
    if (text === '') {
      setter(0);
    } else if (!isNaN(num) && num >= 0 && num <= 100) {
      setter(num / 100);
    }
  };

  const renderVolumeControl = (
    label: string,
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{label}: {Math.round(value * 100)}%</Text>
          <TextInput
            style={styles.webVolumeInput}
            keyboardType="numeric"
            value={String(Math.round(value * 100))}
            onChangeText={(text) => handleVolumeTextChange(text, setter)}
            maxLength={3}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{label}: {Math.round(value * 100)}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={value}
            onValueChange={setter}
            minimumTrackTintColor={COLORS.accent}
            maximumTrackTintColor={COLORS.inputBorder}
            thumbTintColor={COLORS.accent}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerLeft: () => null,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.onScreenBackButton}>
          <Ionicons name="arrow-back" size={30} color="#3F51B5" />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Opções</Text>

        {renderVolumeControl('Volume Principal', masterVolume, setMasterVolume)}
        {renderVolumeControl('Volume da Música', musicVolume, setMusicVolume)}
        {renderVolumeControl('Volume do Jogo', gameVolume, setGameVolume)}

        {/* Vibração - Conditionally render */}
        {Platform.OS !== 'web' && (
          <View style={[styles.settingItem, styles.checkboxContainer]}>
            <Text style={styles.settingLabel}>Vibração</Text>
            <Checkbox
              style={styles.checkbox}
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              color={vibrationEnabled ? COLORS.accent : undefined}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default OptionsScreen;

const COLORS = {
  background: '#E8EAF6',
  primary: '#3F51B5',
  secondary: '#5C6BC0',
  accent: '#7161EF',
  textWhite: '#FFFFFF',
  inputBorder: '#C5CAE9',
  checkboxBorder: '#B0BEC5',
  webInputText: '#333',
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
  settingItem: {
    width: '90%',
    marginBottom: 25,
  },
  settingLabel: {
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  webVolumeInput: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.webInputText,
    backgroundColor: '#FFF',
    width: '100%',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    margin: 8,
    width: 24,
    height: 24,
    borderColor: COLORS.checkboxBorder,
  },
});