import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomseScreenStackNavigation from "./homeScreenStackNavigation";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../config/theme";

export const AppNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer theme={{ colors: { background: colors.primarydark } }}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarStyle: {
            height: 60,
            elevation: 0,
            backgroundColor: colors.secondarydark,
            borderWidth: 0,
            borderColor: "transparent",
            margin: 0,
          },
          tabBarActiveTintColor: colors.primarysoft,
          tabBarInactiveTintColor: colors.primarylight,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomseScreenStackNavigation}
          options={{
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" color={color} size={32} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
