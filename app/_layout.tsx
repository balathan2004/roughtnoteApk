import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import ReplyHolder from "@/components/context/reply_context";
import UserContextHolder from "@/components/context/user_context";
import LoadingHolder from "@/components/context/loading_context";
import LoadingProgress from "@/components/elements/loading";
import ReplyPopUp from "@/components/elements/replyPopup";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { styles } from "@/styles/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <SafeAreaView style={styles.safearea}>
          <UserContextHolder>
            <ReplyHolder>
              <LoadingHolder>
                <ReplyPopUp />
                <LoadingProgress />
                <Stack>
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                </Stack>
              </LoadingHolder>
            </ReplyHolder>
          </UserContextHolder>
          <StatusBar style="auto" />
        </SafeAreaView>
      </PaperProvider>
    </ThemeProvider>
  );
}
