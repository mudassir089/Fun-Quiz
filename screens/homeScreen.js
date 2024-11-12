import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { colors } from "../config/theme";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { homelistdata } from "../config/homelistdata";
import HomeListHeader from "../components/homeListHeader";
import HomeCard from "../components/homeCard";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  let animatedvalues = [];

  homelistdata.forEach((_, i) => {
    animatedvalues[i] = new Animated.Value(0);
  });

  function animated(toValue = 1) {
    const animations = homelistdata.map((_, i) => {
      return Animated.timing(animatedvalues[i], {
        toValue: toValue,
        duration: 400,
        useNativeDriver: true,
      });
    });

    Animated.stagger(200, animations).start();
  }

  useEffect(() => {
    animated();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primarydark }}>
      <FlatList
        ListHeaderComponent={<HomeListHeader />}
        numColumns={3}
        data={homelistdata}
        contentContainerStyle={{ backgroundColor: colors.primarydark }}
        columnWrapperStyle={{ alignItems: "center", justifyContent: "center" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <HomeCard
              animationvalue={animatedvalues[index]}
              item={item}
              navigation={navigation}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
