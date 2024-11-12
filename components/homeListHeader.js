import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { colors } from "../config/theme";

const { width, height } = Dimensions.get("window");

export default function HomeListHeader() {
  return (
    <>
      <View style={{ position: "relative" }}>
        <View style={styles.parent}>
          <View style={styles.child}>
            <Text style={styles.headertext}>Hi there</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.box}>
            <Image
              source={require("../assets/trophy.png")}
              style={{ width: 140, height: 140, marginBottom: 8 }}
            />
            <View style={styles.textbox}>
              <Text style={styles.textboxmain}>Play And Score</Text>
              <Text style={styles.textboxsecond}>Start a quiz today</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.categoriesview}>
        <Text style={styles.categoriestext}>Quiz Categories</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    height: height / 3.3,
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: "hidden",
  },
  child: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: colors.primarymedium,
    padding: 20,
  },
  headertext: {
    color: colors.primarylight,
    fontSize: 28,
    // fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
  },
  box: {
    width: width / 1.06,
    borderRadius: 8,
    minHeight: 220,
    backgroundColor: colors.secondarydark,
    marginTop: -height / 6,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  textbox: {
    padding: 2,
    marginLeft: 12,
  },
  textboxmain: {
    fontSize: 26,
    color: colors.primarylight,
    width: 140,
    fontFamily: "Poppins_600SemiBold",
  },
  textboxsecond: {
    fontSize: 16,
    color: colors.primarylight,
    fontFamily: "Poppins_400Regular",
  },
  categoriesview: {
    paddingHorizontal: height / 40,
    paddingVertical: 5,
    marginTop: 15,
    marginBottom: 5,
    width: width,
  },
  categoriestext: {
    fontSize: 20,
    textTransform: "capitalize",
    color: colors.primarylight,
    // fontWeight: "600",
    marginLeft: 5,
    marginBottom: 8,
    fontFamily: "Poppins_500Medium",
  },
});
