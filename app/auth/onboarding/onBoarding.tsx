import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnBoarding() {
  const router = useRouter(); // initialize router

  return (
    <ImageBackground
      source={require("../../images/onboarding.png")}
      style={styles.bg}
      imageStyle={styles.bgImage}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Invest in Global Equities</Text>
        <Text style={styles.subtitle}>7 Years Ahead</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/onboarding/ProfileCheck")} // navigate to next screen
      >
        <Text style={styles.buttonText}> GET STARTED</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    opacity: 0.5, // fade background if needed
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 18,
    color: "black",
    marginTop: 10,
    textAlign: "center", // centers the text horizontally
  },
  button: {
    position: "absolute",
    backgroundColor: "#8863E4", // blue color
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 20,
    bottom: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,

    fontWeight: "bold",
  },
});
