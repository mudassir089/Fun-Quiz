import {
  BackHandler,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../config/theme";
import { useAppContext } from "../context/useAppContext";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

export default function QuizResultScreen({ navigation }) {
  const { userData, setuserData } = useAppContext();

  console.log(userData, "userdata");

  const viewshotref = useRef();

  useEffect(() => {
    const backaction = () => {
      //    AsyncStorage.setItem("leaderboard", JSON.stringify(leaderboard))
      //      .then(() => console.log("leaderboard saved"))
      //      .catch((err) => alert(err));
      setuserData({
        ...userData,
        score: 0,
        userName: "",
        correctAnswers: 0,
        wrongAnswers: 0,
      });
      navigation.navigate("HomeScreen");
      return true;
    };

    const backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backaction
    );

    return () => backhandler.remove();
  }, []);

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

  const captureAndShareScreenshot = () => {
    viewshotref.current.capture().then((uri) => {
      Sharing.shareAsync("file://" + uri);
    }),
      (error) => console.error("Oops, snapshot failed", error);
  };

  return (
    <ViewShot
      style={{
        flex: 1,
        backgroundColor: colors.primarydark,
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={viewshotref}
      options={{ format: "jpg", quality: 0.9 }}
    >
      <SafeAreaView
        style={{
          //   flex: 1,
          width: "100%",
          backgroundColor: colors.primarydark,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.resultheading}>Quiz Result</Text>

        {userData?.correctAnswers == 10 ? (
          <Image
            source={require("../assets/award.png")}
            style={{ width: 160, height: 160 }}
          />
        ) : (
          <Text style={{ fontSize: 70 }}>😉</Text>
        )}

        <Text style={styles.remarksheading}>Congratulations</Text>
        <Text style={styles.yourscore}>
          <Text style={{ fontFamily: "Poppins_700Bold" }}>
            {userData?.userName}
          </Text>{" "}
          Score
        </Text>
        <Text style={styles.scoretext}>
          <Text style={{ color: colors.primarysoft }}>{userData?.score}</Text>
        </Text>
        <Text style={styles.yourscore}>Correct Answers</Text>
        <Text style={styles.scoretext}>
          <Text style={{ color: colors.primarysoft }}>
            {userData?.correctAnswers}
          </Text>{" "}
          / 10
        </Text>

        <View style={styles.btndiv}>
          <TouchableOpacity
            onPress={captureAndShareScreenshot}
            style={[styles.btn, { backgroundColor: colors.primarylight }]}
          >
            <Text style={[styles.btntext, { color: colors.secondarydark }]}>
              Share Results
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={goHome}>
            <Text style={styles.btntext}>Take New Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  resultheading: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    color: colors.primarylight,
    marginVertical: 12,
  },
  remarksheading: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
    color: colors.primarylight,
    marginVertical: 15,
  },
  yourscore: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: colors.primarylight,
    marginVertical: 8,
  },
  scoretext: {
    fontSize: 40,
    fontFamily: "Poppins_700Bold",
    color: colors.primarylight,
  },
  btndiv: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginVertical: 20,
    marginHorizontal: "auto",
    alignSelf: "center",
  },
  btn: {
    width: 160,
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.primarysoft,
  },
  btntext: {
    fontSize: 16,
    color: colors.primarylight,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
