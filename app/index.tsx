import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Added screenHeight for potential use

const COLORS = {
  background: '#B79CED',
  jogarButton: '#7161EF',
  opcoesButton: '#957FEF',
  textWhite: '#FFFFFF',
  imageOvalBackground: '#EFD9CE',
  imageOvalBorder: '#796C8C',
};

// Calculate base dimensions based on screen width
const imageContainerBaseWidth = screenWidth * 0.65;
const imageContainerBaseHeight = screenWidth * 0.75; // Or screenHeight * 0.4, etc. depending on desired aspect

// --- Define Maximum dimensions for the image container ---
const MAX_IMAGE_CONTAINER_WIDTH = 350; // Example: Max 350px wide
const MAX_IMAGE_CONTAINER_HEIGHT = imageContainerBaseHeight * (MAX_IMAGE_CONTAINER_WIDTH / imageContainerBaseWidth); // Maintain aspect ratio, or set a fixed max height like 450

// --- Define Maximum dimensions for buttons ---
const MAX_BUTTON_WIDTH = 320; // Example: Max 320px wide for main button
const MAX_OPCOES_BUTTON_WIDTH = 280; // Example: Max 280px wide for options button

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={ Platform.OS === 'android' ? COLORS.background : undefined } // Set for Android
        translucent={Platform.OS === 'android' ? true : false}
      />
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => console.log('Theme button pressed')}
        activeOpacity={0.7}
      >
        <Image
          source={require('../assets/images/pierrot.png')}
          style={styles.mainImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonBase, styles.jogarButton]}
        onPress={() => console.log('Jogar pressed')}
      >
        <Text style={styles.buttonText}>Jogar</Text>
      </TouchableOpacity>

      <View style={styles.opcoesContainer}>
        <Ionicons name="settings-sharp" size={30} color={COLORS.textWhite} style={styles.settingsIcon} />
        <TouchableOpacity
          style={[styles.buttonBase, styles.opcoesButton]}
          onPress={() => console.log('Opções pressed')}
        >
          <Text style={styles.buttonTextSmall}>opções</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 20, // Adjust padding considering status bar
  },
  imageContainer: {
    width: imageContainerBaseWidth,    // Base width (responsive for smaller screens)
    height: imageContainerBaseHeight,  // Base height
    maxWidth: MAX_IMAGE_CONTAINER_WIDTH,  // Capped maximum width
    maxHeight: MAX_IMAGE_CONTAINER_HEIGHT, // Capped maximum height
    backgroundColor: COLORS.imageOvalBackground,
    borderTopLeftRadius: imageContainerBaseWidth / 2,
    borderTopRightRadius: imageContainerBaseWidth / 2,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: COLORS.imageOvalBorder,
    marginBottom: 18,
  },
  mainImage: {
    width: '116%', 
    height: '100%',
    resizeMode: 'contain',
  },
  buttonBase: {
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.6, // Base width
    maxWidth: MAX_BUTTON_WIDTH, // Capped maximum width
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jogarButton: {
    backgroundColor: COLORS.jogarButton,
    marginBottom: 18,
  },
  opcoesButton: {
    backgroundColor: COLORS.opcoesButton,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: screenWidth * 0.5, // Base width
    maxWidth: MAX_OPCOES_BUTTON_WIDTH, // Capped maximum width
    // Removed minWidth for similar reasons as buttonBase
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonTextSmall: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: '600',
  },
  opcoesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    marginRight: 15,
  },
});