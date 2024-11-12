import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../config/theme";

export default function QuizHeader({
  quizcategory,
  seconds,
  minutes,
  currentquestion,
  totalquestion,
}) {
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.quiztitle}>{quizcategory} Quiz</Text>
        <Text style={styles.quiztimer}>
          {minutes}:{seconds}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Text style={styles.questiontitle}>Question </Text>
        <Text style={styles.currentquestion}>
          {currentquestion < 10 ? `0${currentquestion}` : currentquestion}
        </Text>
        <Text style={styles.totalquestions}>/ {totalquestion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quiztitle: {
    color: colors.primarylight,
    fontSize: 20,
    fontFamily: "Poppins_500Medium_Italic",
    opacity: 0.7,
    marginVertical: 5,
  },
  quiztimer: {
    color: colors.primarylight,
    fontSize: 20,
    fontFamily: "Poppins_500Medium_Italic",
    opacity: 0.9,
    marginVertical: 5,
    transform: [{ scale: 1.3 }],
  },
  questiontitle: {
    color: colors.primarylight,
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
  },
  currentquestion: {
    color: colors.primarylight,
    fontSize: 25,
    marginLeft: 12,
    marginBottom: 5,
    transform: [{ scale: 1.5 }],
    fontFamily: "Poppins_700Bold",
  },
  totalquestions: {
    color: colors.primarylight,
    fontSize: 25,
    marginLeft: 15,
    marginBottom: 5,
    transform: [{ scale: 1.1 }],
    fontFamily: "Poppins_600SemiBold",
    opacity: 0.6,
  },
});
