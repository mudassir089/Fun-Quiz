import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../config/theme";

export default function QuizQuestion({ question }) {
  return (
    <View>
      <Text style={styles.quizquestion}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quizquestion: {
    color: colors.primarylight,
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    textAlign: "justify",
    marginTop: 25,
    minHeight: 150,
  },
});
