import { StyleSheet, Text, View, Platform } from "react-native";
import { colors } from "./config/theme";
import { AppNavigation } from "./navigation";
import {
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import LoaderScreen from "./screens/loadingScreen";
import { AppContextProvider } from "./context/useAppContext";

export default function App() {
  let [fontloaded] = useFonts({
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontloaded) {
    return <LoaderScreen />;
  }

  return (
    <AppContextProvider>
      <AppNavigation />
    </AppContextProvider>
  );
}
