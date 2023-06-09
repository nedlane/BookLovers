import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/authContext';
import { useRouter } from 'expo-router';


let IP = 'localhost';
//IP = '192.168.20.53';
global.SERVERPATH = `http://${IP}/ia3`;



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);


  return (
    <AuthProvider>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </AuthProvider>

  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { authData, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    router.push((!!authData) ? '(tabs)' : '(auth)');

  }, [authData]);

  if (loading) return <SplashScreen />;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {(!!authData) ? (<Stack.Screen name="(tabs)" options={{ headerShown: false }} />) : (<Stack.Screen name="(auth)" options={{ headerShown: false }} />)}
      </Stack>
    </ThemeProvider>
  );
}
