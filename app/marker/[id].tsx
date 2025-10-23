import Button from '@/components/Button';
import ImageList from '@/components/ImageList';
import { MarkerList } from '@/components/MarkerList';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MarkerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const index = parseInt(id, 10);
  const router = useRouter();

    const marker = MarkerList.find((m) => m.id === index.toString());
    console.log(MarkerList);
    if (!marker) {
    return (
        <View style={styles.container}>
        <Text>Маркер не найден</Text>
        <Button title="Назад к карте" onPress={() => router.back()} />
        </View>
    );
    }

if (!marker.images) marker.images = [];
const [images, setImages] = useState([...marker.images]);
    useEffect(() => {
        setImages(marker.images);   
    }, []);

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        marker.images.push(uri);
        setImages([...marker.images]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = (uri: string) => {
    if (!marker) return;
        marker.images = marker.images.filter((img) => img !== uri);
        setImages([...marker.images]);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Маркер {index}</Text>
      <Text style={styles.description}>Описание: {marker.description}</Text>
      <Text style={styles.coordinate}>Координаты: {marker.coordinate.latitude.toFixed(8)}, {marker.coordinate.longitude.toFixed(8)}</Text>
     

      <ImageList images={images} removeImage={handleRemoveImage} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, alignSelf: 'center', marginTop: 10}}>        
        <Button style={styles.button} title="Добавить фото" variant="primary" onPress={handleAddImage} />
        {/* <Button style={styles.button} variant="secondary" title="Назад к карте" onPress={() => router.back()} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 20,
        paddingHorizontal: 30,
        backgroundColor: '#25292e',     
        },
    title: { 
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10, 
        color: '#ffffffff',
    },
    coordinate: {
        fontSize: 16,
        marginBottom: 10,
        color: '#ffffffff',
    },
    description : { 
        fontSize: 16,
        marginBottom: 10,
        color: '#ffffffff',
    },
    button: {
        
        maxWidth: '80%',
    },
});
