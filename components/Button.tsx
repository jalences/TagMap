import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type IconName = keyof typeof FontAwesome.glyphMap;

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  iconName?: IconName;
}

export default function Button({ title, onPress, variant = 'primary', style, iconName }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        style,
      ]}
      onPress={onPress}
    >
      <FontAwesome name={iconName} size={18} color="#fff" style={styles.buttonIcon} />
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

  buttonIcon: {
    paddingRight: 8,
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