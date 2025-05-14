import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ThemeSelectionScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: 'Selecionar Tema',
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
        <Text style={styles.title}>Escolha o Tema</Text>
        <Text style={styles.subtitle}>Em breve: Lista de temas aqui!</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          console.log("Tema X selecionado");
          router.back(); 
        }}>
          <Text style={styles.buttonText}>Tema Padrão</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#5C6BC0',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#7161EF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});