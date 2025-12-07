import { Marker as MarkerType } from '@/types';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapProps {
  markers: MarkerType[];
  onMapLongPress: (e: any) => void;
  onMarkerPress: (id: number) => void;
  userLocation?: { latitude: number; longitude: number } | null;
}

export default function Map({ markers, onMapLongPress, onMarkerPress, userLocation }: MapProps) {
  const [loading, setLoading] = useState(true);
  const markerIcon = require('../assets/images/kitten150.png');

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.container}>
          <Text style={styles.text}>Загрузка карты...</Text>
        </View>
      )}

      <MapView
        style={styles.map}
        showsUserLocation={true}    
        followsUserLocation={true}   
        initialRegion={{
          latitude: userLocation?.latitude ?? 57.962143,
          longitude: userLocation?.longitude ?? 56.187184,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onLongPress={onMapLongPress}
        onMapReady={() => setLoading(false)}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => onMarkerPress(marker.id!)}
            image={markerIcon}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  text: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
