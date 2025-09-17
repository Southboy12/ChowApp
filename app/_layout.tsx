import { AuthProvider, useAuth } from "@/lib/auth-context";
import { MealProvider } from "@/lib/meal-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider, DefaultTheme, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";




function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {

    const inAuthGroup = segments[0] === "auth"

    if (!user && !inAuthGroup && !isLoading) {
      router.replace("/auth")
    } else if (user && inAuthGroup && !isLoading) {
      router.replace("/")
    }
  }, [user, segments]);

  return <>{children}</>
}

export default function RootLayout() {

  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <StatusBar backgroundColor="black" />
            <MealProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen

               name="(tabs)" 
               options={{ 
                headerShown: false 
                }} 
              />

              <Stack.Screen 
                name="Issues" 
                options={{ 
                  headerShown: true,
                  title: "Order Issues",
                 
                  headerTitleStyle: {
                    fontSize: 24,
                  },
                  headerStyle: {
                    backgroundColor: "#fff",
                  },                  
               }} 
              />

              <Stack.Screen 
                name="auth" 
                options={{ 
                  headerShown: false,
                }} 
              />

              <Stack.Screen 
                name="screens/Menu/AddMeal" 
                
                options={{ 
                  headerShown: false,
                
                }} 
              />

              <Stack.Screen 
                name="screens/Menu/EditMeal" 
                
                options={{ 
                  headerShown: false,
                
                }} 
              />

            </Stack>
          </RouteGuard>
          </MealProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  )
}