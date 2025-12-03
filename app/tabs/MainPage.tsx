import { jwtDecode, JwtPayload } from "jwt-decode";
import React, { useContext } from "react";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../auth/context/authcontext"; // adjust path if needed
import { LineGraph } from "../components/LineGraph";

// Type for stock list items
type StockListItem = {
  id: string;
  name: string;
  company: string;
  logo: any; // for require() images
  price: string;
  change: string;
  changePercent: number;
  chartColor: string;
};

// Stock list data matching the screenshot
const stockListData: StockListItem[] = [
  {
    id: "1",
    name: "Figma",
    company: "Figma Pvt Ltd",
    logo: require("../images/figma.png"),
    price: "2,000",
    change: "▼ 3.10%",
    changePercent: -3.1,
    chartColor: "#9C27B0",
  },
  {
    id: "2",
    name: "Nvidia",
    company: "Nvidia pvt ltd",
    logo: require("../images/nvidia.png"),
    price: "188",
    change: "▲ 2.44%",
    changePercent: 2.44,
    chartColor: "#4CAF50",
  },
  {
    id: "3",
    name: "Tesla",
    company: "td",
    logo: require("../images/Tesla.png"),
    price: "3,480",
    change: "▼ 1.23%",
    changePercent: -1.23,
    chartColor: "#F44336",
  },
  {
    id: "4",
    name: "Apple",
    company: "Apple Inc",
    logo: require("../images/apple logo.png"),
    price: "175",
    change: "▲ 1.85%",
    changePercent: 1.85,
    chartColor: "#4CAF50",
  },
  {
    id: "5",
    name: "Microsoft",
    company: "Microsoft Corp",
    logo: require("../images/microsoft logo.png"),
    price: "378",
    change: "▲ 0.92%",
    changePercent: 0.92,
    chartColor: "#4CAF50",
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

const stockData = [
  {
    name: "Apple",
    price: "$573.54",
    change: "▲ 2.37%",
    color: "#4CAF50",
    data: [250, 453, 945, 160, 5858, 565, 573.54], // Sample price history
  },
  {
    name: "Amazon",
    price: "$249.98",
    change: "▼ 2.42%",
    color: "#F44336",
    data: [550, 255, 245, 960, 158, 965, 873.54], // Sample price history
  },
  {
    name: "Tesla",
    price: "$695.50",
    change: "▲ 1.15%",
    color: "#4CAF50",
    data: [110, 5255, 535, 560, 558, 5965, 9073.54], // Sample price history
  },
  {
    name: "Microsoft",
    price: "$299.12",
    change: "▼ 0.85%",
    color: "#F44336",
    data: [5250, 2555, 545, 5260, 5528, 5265, 5731.54], // Sample price history
  },
];

// StockCard Component for horizontal scroll
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

// Type for StockListCard props
type StockListCardProps = {
  item: StockListItem;
};

// StockListCard Component for vertical scrollable list
const StockListCard: React.FC<StockListCardProps> = ({ item }) => {
  const isPositive = item.changePercent > 0;

  return (
    <View style={styles.stockListCard}>
      <View style={styles.stockListLeft}>
        <Image
          source={item.logo}
          style={styles.stockLogo}
          resizeMode="contain"
        />
        <View style={styles.stockInfo}>
          <Text style={styles.stockListName}>{item.name}</Text>
          <Text style={styles.stockListCompany}>{item.company}</Text>
        </View>
      </View>

      <View style={styles.stockChart}>
        {/* Placeholder for mini chart */}
        {/* <Text style={styles.chartLine}>📈</Text> */}
      </View>

      <View style={styles.stockListRight}>
        <Text style={styles.stockListPrice}>{item.price}</Text>
        <Text
          style={[
            styles.stockListChange,
            { color: isPositive ? "#4CAF50" : "#F44336" },
          ]}
        >
          {item.change}
        </Text>
      </View>
    </View>
  );
};
interface MyJwtPayload extends JwtPayload {
  emailUser: string;
  id: string;
  role: string;
}
export default function MainPage() {
  const { login, token } = useContext(AuthContext);
  let userEmail = "";

  const decoded = jwtDecode<MyJwtPayload>(token);
  // emailUser = decoded.email;
  console.log("hey i am decoded from mainpage", userEmail);
  console.log("hey", decoded.id);
  console.log("User email:", decoded.emailUser);
  const FinalEmail = decoded.emailUser;

  console.log("i am login", login.email);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Image
            style={styles.logoContainer}
            source={require("../images/logouser.png")}
            resizeMode="contain"
          />
          <View style={styles.greetingContainer}>
            <Text style={styles.textContainer}>Welcome </Text>
            <Text style={styles.userName}>{FinalEmail}</Text>
          </View>
        </View>

        {/* PORTFOLIO */}
        <View style={styles.portfolio}>
          <View style={styles.portfolioBox}>
            <Text style={styles.label}>Portfolio</Text>
            <Text style={styles.value}>$0</Text>
            <Text style={styles.subValue}>▲ 0</Text>
          </View>
          <View style={styles.portfolioBox}>
            <Text style={styles.label}>Profit Today</Text>
            <Text style={styles.value}>0</Text>
            <Text style={styles.subValue}>▲ 0</Text>
          </View>
        </View>

        {/* MY ASSETS - HORIZONTAL SCROLL */}
        <Text style={styles.assetsTitle}>Trending Stocks</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.MyAssets}
          nestedScrollEnabled={true}
        >
          {stockData.map((stock, index) => (
            <StockCard
              key={index}
              name={stock.name}
              price={stock.price}
              change={stock.change}
              color={stock.color}
              data={stock.data}
            />
          ))}
        </ScrollView>

        {/* STOCKS LIST SECTION */}
        <View style={styles.stocksListHeader}>
          <Text style={styles.stocksListTitle}>Stocks</Text>
          <Text style={styles.stocksListPriceLabel}>Price</Text>
        </View>

        <View style={styles.stocksListContainer}>
          {stockListData.map((item) => (
            <StockListCard key={item.id} item={item} />
          ))}
        </View>

        {/* Bottom spacing for safe area */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5FF",
  },
  mainScroll: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  greetingContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  textContainer: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  portfolio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  portfolioBox: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 18,
    paddingHorizontal: 14,
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 4,
  },
  subValue: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 2,
  },
  assetsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#111",
  },
  MyAssets: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  stockCard: {
    width: 150,
    height: 180,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stockIcon: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  stockName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stockPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 14,
  },
  graphPlaceholder: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginTop: 8,
  },

  // STOCKS LIST STYLES
  stocksListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  stocksListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  stocksListPriceLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  stocksListContainer: {
    paddingHorizontal: 16,
  },
  stockListCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  stockListLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stockLogo: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 12,
  },
  stockInfo: {
    justifyContent: "center",
  },
  stockListName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  stockListCompany: {
    fontSize: 13,
    color: "#6b7280",
  },
  stockChart: {
    marginHorizontal: 8,
  },
  chartLine: {
    fontSize: 18,
  },
  stockListRight: {
    alignItems: "flex-end",
  },
  stockListPrice: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  graphContainer: {
    height: 80,
    marginTop: 8,
  },
  stockListChange: {
    fontSize: 13,
    fontWeight: "600",
  },
});

// API KEY
// sk-live-UDYpVms8oSkOJ1e2EwSdYBtK35XLtJNsbR7JUXee
// STOCKDATA.ORG = 4VjURmEw2jQ4qIA9bZifPKNatQnsUdRVrJzgTZOJ
// FINhub- d4msg69r01qsn6g85g90d4msg69r01qsn6g85g9g
// https://finnhub.io/api/v1/quote?symbol=TSLA&token=d4msg69r01qsn6g85g90d4msg69r01qsn6g85g9g
