import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export default function Button({ title, onPress, variant = 'primary', style }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        style,
      ]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  primary: {
    backgroundColor: '#ee6b4d',
    borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 12,     
  },

  secondary: {
    backgroundColor: '#ee6b4d',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});