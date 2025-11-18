import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Redirect href={"/sign-up" as const} />
    </SafeAreaView>
  );
}
