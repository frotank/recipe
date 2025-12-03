import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../auth/context/authcontext"; // adjust path if needed

export default function StockOrderScreen() {
  const { token } = useContext(AuthContext);

  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const handlePlaceOrder = async () => {
    if (!stockSymbol.trim() || !quantity || parseInt(quantity) <= 0) {
      Alert.alert("Error", "Please enter stock symbol and quantity");
      return;
    }

    console.log("hey i am login token", token);
    try {
      const response = await fetch("http://192.168.1.41:3000/accept/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⬅️ IMPORTANT!
        },
        body: JSON.stringify({
          stockSymbol,
          quantity,
          orderType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Order failed");
        return;
      }

      Alert.alert(
        "Order Placed",
        `${orderType.toUpperCase()} ${quantity} shares of ${stockSymbol}\n\nConfirmation sent to your email.`,
        [
          {
            text: "OK",
            onPress: () => {
              setStockSymbol("");
              setQuantity("");
            },
          },
        ]
      );
    } catch (error) {
      console.log("Order error:", error);
      Alert.alert("Error", "Network issue");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Place Order</Text>
        <Text style={styles.headerSubtitle}>Quick stock trading</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Stock Symbol</Text>
          <TextInput
            style={styles.input}
            value={stockSymbol}
            onChangeText={(text) => setStockSymbol(text.toUpperCase())}
            placeholder="e.g., AAPL"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter number of shares"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Order Type</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                orderType === "buy" && styles.buyActive,
              ]}
              onPress={() => setOrderType("buy")}
            >
              <Text
                style={[styles.typeText, orderType === "buy" && styles.buyText]}
              >
                Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                orderType === "sell" && styles.sellActive,
              ]}
              onPress={() => setOrderType("sell")}
            >
              <Text
                style={[
                  styles.typeText,
                  orderType === "sell" && styles.sellText,
                ]}
              >
                Sell
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.placeButton,
            orderType === "buy" ? styles.buyButton : styles.sellButton,
          ]}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeButtonText}>
            {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#6366F1",
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: { fontSize: 16, color: "#E0E7FF", fontWeight: "500" },
  content: { padding: 20 },
  section: { marginBottom: 24 },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  buttonGroup: { flexDirection: "row", gap: 12 },
  typeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  buyActive: { backgroundColor: "#D1FAE5", borderColor: "#059669" },
  sellActive: { backgroundColor: "#FEE2E2", borderColor: "#DC2626" },
  typeText: { fontSize: 18, fontWeight: "800", color: "#6B7280" },
  buyText: { color: "#059669" },
  sellText: { color: "#DC2626" },
  placeButton: {
    marginTop: 32,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  buyButton: { backgroundColor: "#059669" },
  sellButton: { backgroundColor: "#DC2626" },
  placeButtonText: { fontSize: 20, fontWeight: "800", color: "#FFFFFF" },
});
