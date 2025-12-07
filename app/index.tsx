import Map from '@/components/Map';
import { useDatabase } from '@/contexts/DatabaseContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { requestLocationPermissions, startLocationUpdates } from "@/services/location";
import { notificationManager } from "@/services/notifications";
import { calculateDistance } from "@/utils/distance";
import * as Location from "expo-location";


export default function MapScreen() {
  const router = useRouter();
  const { markers, addMarker, isLoading } = useDatabase();

  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);


  useEffect(() => {
  let locationSub: Location.LocationSubscription | null = null;

  const initLocation = async () => {
      try {
        await requestLocationPermissions();
        console.log("Доступ к геолокации разрешен");
      } catch (err) {
        console.warn("Нет доступа к геолокации:", err);
      }

      try {
        await notificationManager.requestPermissions();
        console.log("Разрешение на уведомления получено");
      } catch (err) {
        console.warn("Нет разрешения на уведомления:", err);
      }

      const locationStatus = await Location.getForegroundPermissionsAsync();
      if (locationStatus.granted) {
        locationSub = await startLocationUpdates((location) => {
          setUserLocation(location);
        });
      } else {
        console.warn("Подписка на GPS не создана: разрешение не выдано");
      }
    };

    initLocation();

    return () => {
      if (locationSub) locationSub.remove();
    };
  }, []);

  useEffect(() => {
    if (!userLocation || markers.length === 0) return;

    markers.forEach((marker) => {
      const distance = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        marker.latitude,
        marker.longitude
      );

      if (distance <= 100) {
        notificationManager.showNotification(marker, distance);
      } else {
        notificationManager.removeNotification(marker.id!);
      }
    });
  }, [userLocation, markers]);

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
    <Map
      markers={markers}
      onMapLongPress={onMapLongPress}
      onMarkerPress={onMarkerPress}
      userLocation={
        userLocation
          ? {
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }
          : null
      }
    />
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
