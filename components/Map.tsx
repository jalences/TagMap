import { Marker as MarkerType } from '@/types';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapProps {
  markers: MarkerType[];
  onMapLongPress: (e: any) => void;
  onMarkerPress: (id: number) => void;
}

export default function Map({ markers, onMapLongPress, onMarkerPress }: MapProps) {
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
        initialRegion={{
          latitude: 57.962143,
          longitude: 56.187184,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
