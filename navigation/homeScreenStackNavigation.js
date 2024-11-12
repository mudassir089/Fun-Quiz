import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import QuizInstructionsScreen from "../screens/quizInstructionsScreen";
import MainQuizScreen from "../screens/mainQuizScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import { colors } from "../config/theme";
import QuizResultScreen from "../screens/quizResultScreen";

export default function HomseScreenStackNavigation({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
    if (routeName === "MainQuizScreen" || routeName === "QuizResultScreen") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          height: 60,
          elevation: 0,
          backgroundColor: colors.secondarydark,
          borderWidth: 0,
          borderColor: "transparent",
          margin: 0,
        },
      });
    }
  }, [navigation, route]);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="QuizInstructionsScreen"
        component={QuizInstructionsScreen}
      />
      <Stack.Screen
        // options={{}}
        name="MainQuizScreen"
        component={MainQuizScreen}
      />
      <Stack.Screen
        // options={{}}
        name="QuizResultScreen"
        component={QuizResultScreen}
      />
    </Stack.Navigator>
  );
}
