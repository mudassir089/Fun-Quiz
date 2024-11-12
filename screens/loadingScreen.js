import { SafeAreaView, ActivityIndicator } from "react-native";
import { colors } from "../config/theme";

export default function LoaderScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primarydark,
      }}
    >
      <ActivityIndicator size="large" color={colors.primarysoft} />
    </SafeAreaView>
  );
}
