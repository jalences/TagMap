import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#25292e",  
        },
        headerShadowVisible: false,
        headerTintColor: "#ffffff",      
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>    
      <Stack.Screen  name="index" options={{ headerShown: false}} />
      <Stack.Screen name="marker/[id]" options={{ title: "Детали маркера" }} />
    </Stack>
    
    
  );
}

