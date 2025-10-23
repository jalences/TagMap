import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ImageListProps {
  images: string[];
  removeImage: (uri: string) => void;
}

export default function ImageList({ images, removeImage }: ImageListProps) {
  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
          <View style={styles.imageContainer}>
          <Image source={{ uri: item }} style={styles.image} />

          <Pressable style={styles.closeButton} onPress={() => removeImage(item)}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: { 
    marginVertical: 8 
  },
  image: { 
    width: '100%',
    height: 300,
    borderRadius: 8 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
