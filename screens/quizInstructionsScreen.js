import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../config/theme";
import { toastConfig } from "../config/toastConfig";
import { useAppContext } from "../context/useAppContext";
import Toast from "react-native-toast-message";
import { useState } from "react";

export default function QuizInstructionsScreen({ navigation, route }) {
  const { quizcategory } = route.params;

  const { userData, setuserData } = useAppContext();

  const [name, setname] = useState("");

  const navigatetoquiz = () => {
    if (name.length === 0) {
      return Toast.show({
        type: "error",
        text1: "Empty Field",
        text2: "Please enter your name to continue",
      });
    }
    setuserData({
      ...userData,
      userName: name,
    });

    navigation.navigate("MainQuizScreen", {
      quizcategory: quizcategory,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primarydark,
        paddingHorizontal: 15,
        paddingVertical: 10,
        display: "flex",

        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={styles.headermaintext}>Quiz Instructions</Text>
        <Text style={styles.instructionstext}>
          The Quiz Will have 10 Questions Each Question is of 1 point On
          answering correct answer 1 point will be added to your score and on
          answering wrong no points will be added . The timeline of the quiz is
          5 minutes If the time finishes your quiz will be ended . Note: On
          quitting the quiz will be abandoned
        </Text>
      </View>
      <KeyboardAvoidingView>
        <TextInput
          value={name}
          onChangeText={(value) => setname(value)}
          style={styles.input}
          selectionColor={colors.primarysoft}
        />
        <TouchableOpacity onPress={navigatetoquiz} style={styles.button}>
          <Text style={styles.btntext}>Start Quiz</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} position="top" topOffset={10} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headermaintext: {
    color: colors.primarylight,
    fontSize: 32,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
  },
  instructionstext: {
    color: colors.primarylight,
    fontSize: 16,
    textAlign: "justify",
    fontFamily: "Poppins_400Regular",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 10,
    borderColor: colors.primarylight,
    borderWidth: 2,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: colors.primarylight,
    marginVertical: 8,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primarysoft,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  btntext: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: colors.primarylight,
    textAlign: "center",
  },
});
