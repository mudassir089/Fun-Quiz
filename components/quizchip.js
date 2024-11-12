import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../config/theme";

const { width, height } = Dimensions.get("window");

export default function Quizchip({ colorvalue }) {
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor:
            colorvalue == true
              ? "#00ff00"
              : colorvalue == false
              ? colors.primarysoft
              : colors.secondarydark,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  chip: {
    width: width / 13,
    height: 1.5,

    borderRadius: 10,
    marginHorizontal: 3,
  },
});
