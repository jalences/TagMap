import Button from '@/components/Button';
import ImageList from '@/components/ImageList';
import { MarkerList } from '@/components/MarkerList';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function MarkerDetails() {
  
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const marker = MarkerList.find((marker) => marker.id === id);
    if (!marker) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Маркер не найден :c </Text>
        <Button title="Вернуться к карте" onPress={() => router.back()} />
        </View>
    );
    }

  
  const [images, setImages] = useState([...marker.images]);

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        marker.images.push(uri);
        setImages([...marker.images]);
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при выборе изображения');
      console.error(error);
    }
  };

  const handleRemoveImage = (uri: string) => {
    Alert.alert(
      'Подтвердите удаление',
      'Вы уверены, что хотите удалить фото?',
      [
        {
          text: 'Отменить',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            marker.images = marker.images.filter((img) => img !== uri);
            setImages([...marker.images]);
          },
        },
      ],
      { cancelable: false }
    )
      // marker.images = marker.images.filter((img) => img !== uri);
      // setImages([...marker.images]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Название</Text>
      <Text style={styles.details}>{marker.title}</Text>
      <Text style={styles.description}>Описание</Text>
      <Text style={styles.details}>{marker.description}</Text>
      <Text style={styles.description}>Координаты</Text>
      <Text style={styles.details}>{marker.coordinate.latitude.toFixed(8)}, {marker.coordinate.longitude.toFixed(8)}</Text>

      <ImageList images={images} removeImage={handleRemoveImage} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, alignSelf: 'center', marginTop: 10}}>        
        <Button style={styles.button} title="Добавить фото" variant="primary" iconName="picture-o" onPress={handleAddImage} />
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
        borderRadius: 20,
        maxWidth: '70%',
    },
});
