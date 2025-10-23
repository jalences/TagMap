import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UserMarker } from '../types';

interface MapProps {
  markers: UserMarker[];
  onMapLongPress: (e: any) => void;
  onMarkerPress: (id: string) => void;
}

export default function Map({ markers, onMapLongPress, onMarkerPress }: MapProps) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 57.962143,
        longitude: 56.187184,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onLongPress={onMapLongPress}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title || 'Маркер'}
          description={marker.description}
          onPress={() => onMarkerPress(marker.id)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
