import Toast, {
  BaseToast,
  ErrorToast,
  SuccessToast,
} from "react-native-toast-message";
import { colors } from "./theme";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#00ff00" }}
      contentContainerStyle={{ backgroundColor: colors.secondarydark }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        color: colors.primarylight,
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.primarysoft, height: 75 }}
      contentContainerStyle={{
        backgroundColor: colors.secondarydark,
      }}
      text1Style={{
        fontSize: 18,
        fontFamily: "Poppins_500Medium",
        color: colors.primarylight,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: colors.primarylight,
      }}
    />
  ),
};
