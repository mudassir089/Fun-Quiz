import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../config/theme";

export default function OptionsBox({ value, onpress, selectedAnswer }) {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={[styles.optbox, { borderColor: colors.primarylight }]}
      activeOpacity={0.4}
    >
      <Text style={styles.optboxtext}>{value}</Text>

      {selectedAnswer !== value ? (
        <View style={styles.circle} />
      ) : (
        <View style={styles.circlemarked} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optbox: {
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    fontFamily: "Poppins_400Regular",
    color: colors.primarylight,
    marginVertical: 8,
  },
  optboxtext: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: colors.primarylight,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderColor: colors.primarylight,
    borderWidth: 1,
  },
  circlemarked: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderColor: colors.primarysoft,
    backgroundColor: colors.primarysoft,
    borderWidth: 1,
  },
});
