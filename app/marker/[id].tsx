import Button from '@/components/Button';
import ImageList from '@/components/ImageList';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Image as MarkerImage } from '@/types';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MarkerDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { markers, updateMarker, isLoading, deleteMarker, addImage, getImages,deleteImage } = useDatabase();
  const marker = markers.find((m) => m.id === Number(id));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<MarkerImage[]>([]);

  useEffect(() => {
    if (marker) {
      setTitle(marker.title ?? '');
      setDescription(marker.description ?? '');
      const loadImages = async () => {
        const images = await getImages(marker.id!);
        setImages(images);
      };
      loadImages();
    }
  }, [marker]);

  if (isLoading || !marker) {
    return (
      <View>
        <ActivityIndicator size="large" /> 
      </View>
    );
  }

  const handleSave = async () => {
    if (!marker.id) return; 

    try {
      await updateMarker(marker.id, title || null, description || null);
      console.log('Маркер успешно обновлён');
      router.back();
    } catch (error) {
      console.error('Ошибка при сохранении маркера:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить маркер');
    }
  };

  const handleDelete = async () => {
    if (!marker.id) return;

    Alert.alert(
      'Удаление маркера',
      'Вы точно хотите удалить этот маркер?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMarker(marker.id!);
              console.log('Маркер удален')
              router.back();
            } catch (error) {
              console.error('Ошибка при удалении маркера:', error);
              Alert.alert('Ошибка', 'Не удалось удалить маркер');
            }
          },
        },
      ]
    );
  };

  const handleAddImage = async () => {
    if (!marker.id) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        await addImage(marker.id, uri);
        const imgs = await getImages(marker.id);
        setImages(imgs); 
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при выборе изображения');
      console.error(error);
    }
  };

  const handleRemoveImage = async (imageId: number) => {
    if (!marker.id) return;             
    try {
      await deleteImage(imageId);          
      const imgs = await getImages(marker.id); 
      setImages(imgs);                     
    } catch (error) {
      console.error('Ошибка при удалении изображения:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Название:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Введите название"
      />

      <Text style={styles.label}>Описание:</Text>
      <TextInput
        style={[styles.input]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Введите описание"
      />
      <Text style={styles.label}>Координаты</Text>
      <Text style={styles.details}>{marker.latitude.toFixed(8)}, {marker.longitude.toFixed(8)}</Text>

      <ImageList
        images={images.map(img => img.uri)}  
        removeImage={(uri) => {
          const imgToRemove = images.find(img => img.uri === uri);
          if (imgToRemove?.id) 
            handleRemoveImage(imgToRemove.id);
        }}
        addImage={handleAddImage}
      />
      {/* <Button style={{alignSelf: 'center', marginTop: 0, marginBottom: 50}} title="Добавить фото" onPress={handleAddImage} iconName="picture-o" /> */}
      <View style={{ marginBottom: 50, alignItems: 'center', marginTop: 10}}>
        
        <Button style={{maxWidth: '90%'}} title="Сохранить" onPress={handleSave}  />
        <Button style={styles.button} title="Удалить" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      paddingTop: 20,
      paddingHorizontal: 20,
      backgroundColor: '#25292e',     
      },
  input: {
    height: 54,
    backgroundColor: '#424850ff',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    color: '#ffffffff',
    marginBottom: 20,
    marginTop: 10
  },
  label: {  
    fontSize: 16,
      fontWeight: 300,
      color: '#b1b1b1ff',

  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#ffffffff',
      alignSelf: 'center',
      paddingVertical: 100,
  },
  details: {
      fontSize: 16,
      marginBottom: 15,
      color: '#ffffffff',
  },
  description : { 
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 200,
      color: '#c3c3c3ff',
  },
  button: {
      borderRadius: 12,
      maxWidth: '70%',
      backgroundColor: 'transparent',
  },
});