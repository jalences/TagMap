import * as Location from "expo-location";

export const requestLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Доступ к местоположению не разрешён");
  }
};

export const startLocationUpdates = async (
  onLocation: (location: Location.LocationObject) => void
) => {
  return await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000,
      distanceInterval: 5,
    },
    onLocation
  );
};
