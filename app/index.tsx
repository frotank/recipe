import { Redirect } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Redirect href={"/auth/sign-up" as const} />
      <StatusBar hidden={true} />
    </SafeAreaView>
  );
}
