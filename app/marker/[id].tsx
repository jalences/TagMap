import Button from '@/components/Button';
import ImageList from '@/components/ImageList';
import { useDatabase } from '@/contexts/DatabaseContext';
import { MarkerImage } from '@/types';
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

  // useEffect(() => {
  //   const load = async () => {
  //     const all = await getMarkers();
  //     const found = all.find(m => m.id === Number(id));
  //     if (found) {
  //       setMarker(found);
  //       setTitle(found.title ?? '');
  //       setDescription(found.description ?? '');
  //     }
  //   };
  //   load();
  // }, [id]);
   useEffect(() => {
    if (marker) {
      setTitle(marker.title ?? '');
      setDescription(marker.description ?? '');
      const loadImages = async () => {
      const imgs = await getImages(marker.id!);
      setImages(imgs);
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
    await updateMarker(marker.id!, title || null, description || null);
    router.back();
  };

  const handleDelete = async () => {
    await deleteMarker(marker.id!);
    router.back();
  };

const handleAddImage = async () => {
  if (!marker?.id) return;
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      // добавляем в базу через контекст
      await addImage(marker.id, uri);
      // получаем обновлённый список изображений
      const imgs = await getImages(marker.id);
      setImages(imgs); // обновляем локальный state
    }
  } catch (error) {
    Alert.alert('Ошибка', 'Произошла ошибка при выборе изображения');
    console.error(error);
  }
};
  const handleRemoveImage = async (imageId: number) => {
  if (!marker?.id) return;              // убедимся, что маркер существует
  try {
    await deleteImage(imageId);          // удаляем изображение из базы
    const imgs = await getImages(marker.id); // получаем свежие изображения для маркера
    setImages(imgs);                     // обновляем локальный state
  } catch (error) {
    console.error('Ошибка при удалении изображения:', error);
  }
};

  return (
    // <View style={styles.container}>
//       <Text style={styles.description}>Название</Text>
//       <Text style={styles.details}>{marker.title}</Text>
//       <Text style={styles.description}>Описание</Text>
//       <Text style={styles.details}>{marker.description}</Text>
//       <Text style={styles.description}>Координаты</Text>
//       <Text style={styles.details}>{marker.coordinate.latitude.toFixed(8)}, {marker.coordinate.longitude.toFixed(8)}</Text>

//       <ImageList images={images} removeImage={handleRemoveImage} />
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, alignSelf: 'center', marginTop: 10}}>        
//         <Button style={styles.button} title="Добавить фото" variant="primary" iconName="picture-o" onPress={handleAddImage} />
//       </View>
//     </View>
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
          if (imgToRemove?.id) handleRemoveImage(imgToRemove.id);
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




// import Button from '@/components/Button';
// import ImageList from '@/components/ImageList';
// import { MarkerList } from '@/components/MarkerList';
// import * as ImagePicker from 'expo-image-picker';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { Alert, StyleSheet, Text, View } from 'react-native';

// export default function MarkerDetails() {
  
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();

//   const marker = MarkerList.find((marker) => marker.id === id);
//     if (!marker) {
//     return (
//         <View style={styles.container}>
//         <Text style={styles.title}>Маркер не найден :c </Text>
//         <Button title="Вернуться к карте" onPress={() => router.back()} />
//         </View>
//     );
//     }

  
//   const [images, setImages] = useState([...marker.images]);

//   const handleAddImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const uri = result.assets[0].uri;
//         marker.images.push(uri);
//         setImages([...marker.images]);
//       }
//     } catch (error) {
//       Alert.alert('Ошибка', 'Произошла ошибка при выборе изображения');
//       console.error(error);
//     }
//   };

//   const handleRemoveImage = (uri: string) => {
//       Alert.alert(
//         'Подтвердите удаление',
//         'Вы уверены, что хотите удалить фото?',
//         [
//           {
//             text: 'Отменить',
//             style: 'cancel',
//           },
//           {
//             text: 'Удалить',
//             onPress: () => {
//               marker.images = marker.images.filter((img) => img !== uri);
//               setImages([...marker.images]);
//             },
//           },
//         ],
//         { cancelable: false }
//       )
//       // marker.images = marker.images.filter((img) => img !== uri);
//       // setImages([...marker.images]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.description}>Название</Text>
//       <Text style={styles.details}>{marker.title}</Text>
//       <Text style={styles.description}>Описание</Text>
//       <Text style={styles.details}>{marker.description}</Text>
//       <Text style={styles.description}>Координаты</Text>
//       <Text style={styles.details}>{marker.coordinate.latitude.toFixed(8)}, {marker.coordinate.longitude.toFixed(8)}</Text>

//       <ImageList images={images} removeImage={handleRemoveImage} />
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, alignSelf: 'center', marginTop: 10}}>        
//         <Button style={styles.button} title="Добавить фото" variant="primary" iconName="picture-o" onPress={handleAddImage} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: { 
//         flex: 1, 
//         paddingTop: 20,
//         paddingHorizontal: 20,
//         backgroundColor: '#25292e',     
//         },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#ffffffff',
//         alignSelf: 'center',
//         paddingVertical: 100,
//     },
//     details: {
//         fontSize: 16,
//         marginBottom: 15,
//         color: '#ffffffff',
//     },
//     description : { 
//         fontSize: 16,
//         marginBottom: 5,
//         fontWeight: 200,
//         color: '#c3c3c3ff',
//     },
//     button: {
//         borderRadius: 20,
//         maxWidth: '70%',
//     },
// });
