import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#25292e",  
        },
        headerShadowVisible: false,
        headerTintColor: "#ffffffff",      
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>    
      <Stack.Screen name="index" options={{ title: "SuperMegaUltraMap" }} />
      <Stack.Screen name="marker/[id]" options={{ title: "Детали маркера" }} />
    </Stack>
    
    
  );
}

