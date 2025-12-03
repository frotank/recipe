import { useRouter } from "expo-router";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineGraph } from "../../components/LineGraph";

// Sample data for the stock cards
const stockData = [
  {
    name: "Apple",
    price: "$573.54",
    change: "▲ 2.37%",
    color: "#4CAF50", // Green
    data: [550, 155, 545, 234, 538, 565, 573.54], // Sample price history
  },
  {
    name: "Amazon",
    price: "$249.98",
    change: "▼ 2.42%",
    color: "#F44336", // Red
    data: [210, 555, 545, 210, 518, 565, 53.54], // Sample price history
  },
  {
    name: "Tesla",
    price: "$695.50",
    change: "▲ 1.15%",
    color: "#4CAF50", // Green
    data: [30, 955, 545, 560, 558, 565, 13.54], // Sample price history
  },
  {
    name: "Microsoft",
    price: "$299.12",
    change: "▼ 0.85%",
    color: "#F44336", // Red
    data: [550, 555, 545, 560, 558, 565, 573.54], // Sample price history
  },
];

// Type for StockCard props
type StockCardProps = {
  name: string;
  price: string | number;
  change: string | number;
  color: string;
  data: number[] | any;
};

// StockCard Component

const StockCard: React.FC<StockCardProps> = ({
  name,
  price,
  change,
  color,
  data,
}) => {
  return (
    <View style={styles.stockCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.stockIcon}>{name.charAt(0)}</Text>
        <Text style={styles.stockName}>{name}</Text>
      </View>
      <Text style={styles.stockPrice}>{price}</Text>
      <Text style={[styles.stockChange, { color }]}>{change}</Text>

      {/* Replace placeholder with LineGraph */}
      <View style={styles.graphContainer}>
        <LineGraph
          data={data}
          color={color}
          label={name}
          stat={String(price)}
        />
      </View>
    </View>
  );
};

export default function OnBoarding() {
  const router = useRouter();
  setTimeout(() => {
    console.log("10 seconds have passed!");
    router.push("/tabs/MainPage");
  }, 10000);

  return (
    <ImageBackground
      source={require("../../images/onboarding.png")}
      style={styles.bg}
      imageStyle={styles.bgImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Status Bar Placeholder */}

          <View style={styles.content}>
            {/* Verification Status */}
            <View style={styles.verificationContainer}>
              <Text style={styles.verificationTitle}>
                Your Account is being Verified. {"\n"}
                Please wait for 10 seconds
              </Text>
              <Text style={styles.verificationSubtitle}>
                We have curated stocks for you to watch!
              </Text>
            </View>

            {/* Stocks Section */}
            <Text style={styles.stocksTitle}>Stocks for you</Text>

            {/* Stock Cards Grid */}
            <View style={styles.stockGrid}>
              {stockData.map((stock, index) => (
                <StockCard key={index} {...stock} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Fixed 'Need Help?' Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/tabs/MainPage")}
      >
        <Text style={styles.buttonText}>Need Help?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    marginTop: 40,
    // Note: The background image in the Figma has a large scale/design element,
    // which may require careful positioning or using a different background approach.
    // For now, flex: 1 covers the screen.
  },
  bgImage: {
    opacity: 0.2, // Adjust background opacity as needed
    // You may need to use 'contain' or 'cover' and specific dimensions/positioning
    // to match the exact look of the Figma background image.
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 150, // Ensures space above the fixed button
  },

  // --- Header and Status Bar ---
  statusBarPlaceholder: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  timeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    opacity: 0.3, // Match the grey, faded 'Onboarding' title
    paddingHorizontal: 20,
    marginTop: -40, // Pull it up closer to the status bar
    marginBottom: 20,
  },

  content: {
    paddingHorizontal: 20,
  },

  // --- Verification Section ---
  verificationContainer: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  verificationSubtitle: {
    fontSize: 16,
    color: "#666",
  },

  // --- Stocks Section ---
  stocksTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 15,
  },
  stockGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  stockCard: {
    width: "48%", // Approx half the width to fit two per row
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stockIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
    // You could replace this with an actual image/icon view
  },
  stockName: {
    fontSize: 16,
    color: "black",
  },
  stockPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  stockChange: {
    fontSize: 14,
    fontWeight: "600",
  },
  graphPlaceholder: {
    height: 50,
    marginTop: 10,
    backgroundColor: "transparent",
    // In a real app, this would be a charting library component
    // We're leaving it blank as a visual placeholder for the line graph
    // The visual look in the Figma image is a purple line graph.
  },

  // --- Button ---

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  lineChart: { height: 50, marginTop: 10 },
  button: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#8863E4",
    borderRadius: 30,
    zIndex: 20, // THIS MAKES IT CLICKABLE
  },
  graphContainer: {
    height: 80,
    marginTop: 8,
  },
});
