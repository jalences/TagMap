import Map from '@/components/Map';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Marker } from '@/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export default function MapScreen() {
  const router = useRouter();
  const { markers, addMarker, isLoading } = useDatabase();


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
