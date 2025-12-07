import { DatabaseProvider } from "@/contexts/DatabaseContext";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
    useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: false,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);
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

