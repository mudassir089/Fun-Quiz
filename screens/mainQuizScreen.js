import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../config/theme";
import Quizchip from "../components/quizchip";
import OptionsBox from "../components/optionsBox";
import QuizQuestion from "../components/quizQuestion";
import QuizHeader from "../components/quizHeader";
import { AntDesign } from "@expo/vector-icons";
import { quizQuestions } from "../config/quizQuestions";
import { shuffle } from "../config/shuffleQuiz";
import { useAppContext } from "../context/useAppContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "../config/toastConfig";
import WarningModal from "../components/Modal";

export default function MainQuizScreen({ navigation, route }) {
  //context

  const { userData, setuserData } = useAppContext();

  const { quizcategory } = route.params;

  //quizquestions

  const [quizQuestionsshuffled, setquizQuestionsshuffled] = useState(
    quizQuestions[quizcategory.toLowerCase()]
  );

  const opacity = useRef(new Animated.Value(0)).current;
  const [loading, setloading] = useState(true);

  //starting opacity animation

  useEffect(() => {
    //shuffling quiz so thaat everytime the quiz loads the question changes

    setquizQuestionsshuffled(shuffle(quizQuestionsshuffled));

    //revealing opacity

    setTimeout(() => {
      setloading(false);
      Animated.timing(opacity, {
        duration: 500,
        toValue: 1,
        useNativeDriver: true,
        delay: 100,
      }).start();
    }, 1000);
  }, []);

  //quiz timer

  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(true);

  React.useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  //quiz timer finsihes

  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("Timer finished");
      setRunTimer(false);
      setCountDown(0);
      navigation.navigate("QuizResultScreen", {
        timeFinished: true,
      });
    }
  }, [countDown, runTimer]);

  //quiz timer minutes and seconds

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  //Al of the quiz game logic here

  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [selectedAnswer, setselectedAnswer] = useState("");
  const [questionTrack, setquestionTrack] = useState([]);

  const nextQuestion = () => {
    if (selectedAnswer.length === 0) {
      return Toast.show({
        type: "error",
        text1: "No selection",
        text2: "Please select the an answer",
      });
    }
    if (
      quizQuestionsshuffled[currentQuestion].correctAnswer === selectedAnswer
    ) {
      setuserData({
        ...userData,
        score: userData.score + 1000,
        correctAnswers: userData.correctAnswers + 1,
      });
      setquestionTrack([...questionTrack, true]);
    } else {
      setuserData({ ...userData, wrongAnswers: userData.wrongAnswers + 1 });
      setquestionTrack([...questionTrack, false]);
    }
    setselectedAnswer("");
    if (currentQuestion === quizQuestionsshuffled.length - 1) {
      return navigation.navigate("QuizResultScreen", {
        timeFinished: false,
      });
    } else {
      setcurrentQuestion((prevstate) =>
        prevstate === quizQuestionsshuffled.length - 1
          ? quizQuestionsshuffled.length - 1
          : prevstate + 1
      );
    }
  };

  //modal state

  const [visible, setvisible] = useState(false);

  //preventing back action from quitting quiz

  useEffect(() => {
    const backaction = () => {
      setvisible(true);
      return true;
    };

    const backhandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backaction
    );

    return () => backhandler.remove();
  }, []);

  return (
    <>
      {loading ? (
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primarydark,
          }}
        >
          <ActivityIndicator size="large" color={colors.primarysoft} />
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primarydark,
            // opacity: opacity,
          }}
        >
          <Animated.ScrollView
            style={{ opacity: opacity }}
            contentContainerStyle={{
              flex: 1,
              padding: 22,
              position: "relative",
            }}
          >
            <QuizHeader
              quizcategory={quizcategory}
              minutes={minutes}
              seconds={seconds}
              // question={quizQuestionsshuffled?.[currentQuestion]?.question}
              currentquestion={currentQuestion + 1}
              totalquestion={quizQuestionsshuffled?.length}
            />
            <View style={styles.chipscontainer}>
              {quizQuestionsshuffled.map((e, index) => {
                return (
                  <View key={index}>
                    <Quizchip colorvalue={questionTrack?.[index]} />
                  </View>
                );
              })}
            </View>
            <QuizQuestion
              question={quizQuestionsshuffled?.[currentQuestion]?.question}
            />
            <View>
              {Object.values(
                quizQuestionsshuffled?.[currentQuestion]?.options
              ).map((opt, i) => {
                return (
                  <View key={i}>
                    <OptionsBox
                      value={opt}
                      onpress={() => setselectedAnswer(opt)}
                      selectedAnswer={selectedAnswer}
                    />
                  </View>
                );
              })}
            </View>
            <View style={styles.quizfooter}>
              <TouchableOpacity
                onPress={() => setvisible(true)}
                style={styles.quitquizbtn}
              >
                <AntDesign
                  name="poweroff"
                  size={24}
                  color={colors.primarylight}
                />
                <Text style={styles.quitquizbtntext}>Quit Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextbutton}
                onPress={nextQuestion}
              >
                <Text style={styles.nextbtntext}>Next</Text>
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
      )}
      <Toast config={toastConfig} position="top" topOffset={10} />
      <WarningModal visible={visible} setvisible={setvisible} />
    </>
  );
}

const styles = StyleSheet.create({
  chipscontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
  },
  quizfooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // padding: 22,
    margin: "auto",
    position: "absolute",
    bottom: 15,
    width: "100%",
    marginHorizontal: 20,
  },
  quitquizbtn: {
    width: 150,
    flexDirection: "row",
    padding: 8,
    backgroundColor: "transparent",
    alignItems: "center",
    transform: [{ scale: 0.9 }],
  },
  quitquizbtntext: {
    fontSize: 18,
    color: colors.primarylight,
    fontFamily: "Poppins_400Regular",
    marginLeft: 10,
  },
  nextbutton: {
    width: 160,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primarysoft,
  },
  nextbtntext: {
    fontSize: 20,
    color: colors.primarylight,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
