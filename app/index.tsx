import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import { MarkerList } from '../components/MarkerList';
import { UserMarker } from '../types';

export default function MapScreen() {
  const [markers, setMarkers] = useState<UserMarker[]>(MarkerList);
  const router = useRouter();

  const onMapLongPress = (e: any) => {
    const newMarker: UserMarker = {
      id: String(markers.length),
      coordinate: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      title: `Маркер ${markers.length}`,
      description: 'Новый маркер',
      images: [],
    };

    setMarkers([...markers, newMarker]);
    MarkerList.push(newMarker); 
  };

  const onMarkerPress = (id: string) => {
    router.push({
      pathname: '/marker/[id]',
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <Map markers={markers} onMapLongPress={onMapLongPress} onMarkerPress={onMarkerPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
