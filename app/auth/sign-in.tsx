import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useContext, useState } from "react";

import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../auth/context/authcontext"; // adjust path if needed
import { COLORS } from "../constants/colors"; //
import { authStyles } from "../images/styles/auth.styles";
export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const { login } = useContext(AuthContext);
  const handleSignIn = async () => {
    try {
      const response = await fetch("http://192.168.1.41:3000/accept/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("heelo", data);
      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("TOKEN:", data.token);
      alert("Logged in!. ");
      //save the token globally
      login(data.token);
      console.log("i am data dot token", data.token);

      router.push("/auth/onboarding/ProfileCheck");
    } catch (error) {
      console.log("Login error:", error);
      alert("Network error");
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 🖼 Top Image */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../images/finalplane.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* ✉️ Form Container */}
          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={authStyles.signInButton}
              onPress={handleSignIn}
            >
              <Text style={authStyles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
