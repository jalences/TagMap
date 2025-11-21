import Map from '@/components/Map';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Marker } from '@/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export default function MapScreen() {
  const router = useRouter();
  const { markers, addMarker, isLoading } = useDatabase();

  // useEffect(() => {
  //   setMarkers(contextMarkers); // Синхронизация при любом изменении в контексте
  // }, [contextMarkers]);

//   useEffect(() => {
//   if (isLoading) return; // ждём инициализации базы
//   const load = async () => {
//     try {
//       const dbMarkers = await getMarkers();
//       setMarkers(dbMarkers);
//       console.log(dbMarkers);
//     } catch (error) {
//       console.error('Ошибка при получении маркеров:', error);
//     }
//   };
//   load();
// }, [isLoading]);

const onMapLongPress = async (e: any) => {
  const { latitude, longitude } = e.nativeEvent.coordinate;
  await addMarker({ latitude, longitude });
};

  const onMarkerPress = (id: number) => {
    router.push({
      pathname: '/marker/[id]',
      params: { id },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map markers={markers} onMapLongPress={onMapLongPress} onMarkerPress={onMarkerPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
