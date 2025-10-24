import { UserMarker } from '@/types';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


interface MapProps {
  markers: UserMarker[];
  onMapLongPress: (e: any) => void;
  onMarkerPress: (id: string) => void;
}

const markerImage = require('../assets/images/kitten150.png');

export default function Map({ markers, onMapLongPress, onMarkerPress }: MapProps) {
  const [mapError, setMapError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  return (
     <View style={{ flex: 1 }}>
      {mapError ? (
        <Text style={styles.text}>Карта не загрузилась. Приносим свои глубочайшие извинения!</Text>
        
      ) : (
       <>
          {loading && (
            <View style={styles.text}>
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
            coordinate={marker.coordinate}
            title={marker.title || 'Маркер'}
            description={marker.description}
            onPress={() => onMarkerPress(marker.id)}
            image={markerImage}
            
          />
        ))}
      </MapView>
      </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  text: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});


