import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../config/theme";
import { Entypo } from "@expo/vector-icons";
import { useAppContext } from "../context/useAppContext";
import { useNavigation } from "@react-navigation/native";

export default function WarningModal({ visible, setvisible }) {
  const { userData, setuserData } = useAppContext();

  const navigation = useNavigation();

  const goHome = () => {
    setuserData({
      ...userData,
      score: 0,
      userName: "",
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    navigation.navigate("HomeScreen");
  };

  return (
    <Modal
      testID={"modal"}
      isVisible={visible}
      //   backdropColor={colors.primarydark}
      backdropOpacity={0.6}
      onSwipeComplete={() => setvisible(false)}
      swipeDirection={["up", "left", "right", "down"]}
      onBackButtonPress={() => setvisible(false)}
      style={styles.view}
    >
      <View style={styles.contentview}>
        <Entypo name="warning" size={40} color={colors.primarysoft} />
        <Text style={styles.quittitle}>Quit Quiz</Text>
        <Text style={styles.warningtext}>
          By Quitting the Quiz your quiz will be abandoned and no data will be
          saved in the records!
        </Text>
        <TouchableOpacity style={styles.btn} onPress={goHome}>
          <Text style={styles.btntext}>Quit Quiz</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
    // backgroundColor: colors.secondarydark,
    height: 100,
  },
  contentview: {
    width: "100%",
    minHeight: 200,
    backgroundColor: colors.secondarydark,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  quittitle: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    color: colors.primarylight,
    marginVertical: 10,
  },
  warningtext: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: colors.primarylight,
    marginVertical: 2,
    textAlign: "justify",
  },
  btn: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primarysoft,
    marginVertical: 10,
  },
  btntext: {
    fontSize: 18,
    color: colors.primarylight,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
