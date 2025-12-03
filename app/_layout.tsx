import { Stack } from "expo-router";
import { AuthProvider } from "./auth/context/authcontext"; // adjust path if needed

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}
