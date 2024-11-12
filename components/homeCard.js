import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../config/theme";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const HomeCard = ({ animationvalue, item, navigation }) => {
  const { icon, text } = item;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("QuizInstructionsScreen", {
          quizcategory: text,
        })
      }
    >
      <Animated.View
        style={{
          opacity: animationvalue,
          transform: [
            {
              translateY: Animated.multiply(
                animationvalue,
                new Animated.Value(-10)
              ),
            },
          ],
        }}
      >
        <View style={styles.card}>
          <FontAwesome5 name={icon} size={30} color={colors.primarysoft} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primarymedium,
    // elevation: 10,
    shadowColor: colors.primarymedium,
    width: width / 3.6,
    minHeight: 110,
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.primarylight,
    opacity: 0.8,
    fontSize: 14,
    width: "90%",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: 2,
    marginTop: 4,
  },
});

export default HomeCard;
