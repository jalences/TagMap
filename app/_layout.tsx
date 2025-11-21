import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DatabaseProvider>
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
        <Stack.Screen  name="index" options={{ headerShown: false}} />
        <Stack.Screen name="marker/[id]" options={{ title: "Детали маркера" }} />
      </Stack>
    </DatabaseProvider>
    
    
  );
}

