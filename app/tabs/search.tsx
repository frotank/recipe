import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchStocks() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const API_KEY = "d4msg69r01qsn6g85g90d4msg69r01qsn6g85g9g";

  type StockSearchItem = {
    symbol: string;
    description: string;
  };

  // 🔍 SEARCH STOCKS
  const searchStocks = async (text: string) => {
    setQuery(text);
    setSelectedStock(null);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/search?q=${text}&token=${API_KEY}`
      );
      const data = await res.json();
      setResults(data.result || []);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📈 GET QUOTE FOR CLICKED STOCK
  const fetchQuote = async (symbol: string, description: string) => {
    setQuoteLoading(true);
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      const quote = await res.json();

      setSelectedStock({
        symbol,
        description,
        ...quote,
      });
    } catch (err) {
      console.log("Quote error:", err);
    } finally {
      setQuoteLoading(false);
    }
  };

  const getPriceChange = () => {
    if (!selectedStock) return { value: 0, percent: 0, isPositive: false };
    const change = selectedStock.c - selectedStock.pc;
    const percent = (change / selectedStock.pc) * 100;
    return {
      value: change,
      percent: percent,
      isPositive: change >= 0,
    };
  };

  const priceChange = getPriceChange();

  return (
    <View style={styles.container}>
      {/* 🎯 Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stock Search</Text>
        <Text style={styles.headerSubtitle}>Find real-time stock quotes</Text>
      </View>

      {/* 🔍 Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Search by symbol or company name..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={searchStocks}
          />
          {loading && (
            <ActivityIndicator
              size="small"
              color="#6366F1"
              style={styles.searchLoader}
            />
          )}
        </View>
      </View>

      {/* 📊 Selected Stock Details - Top Position */}
      {selectedStock && (
        <View style={styles.detailsCard}>
          {quoteLoading ? (
            <ActivityIndicator size="large" color="#6366F1" />
          ) : (
            <>
              <View style={styles.detailsHeader}>
                <View>
                  <Text style={styles.detailsSymbol}>
                    {selectedStock.symbol}
                  </Text>
                  <Text style={styles.detailsDesc} numberOfLines={2}>
                    {selectedStock.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedStock(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>
                  ${selectedStock.c?.toFixed(2)}
                </Text>
                <View
                  style={[
                    styles.changeBadge,
                    priceChange.isPositive
                      ? styles.changeBadgePositive
                      : styles.changeBadgeNegative,
                  ]}
                >
                  <Text
                    style={[
                      styles.changeText,
                      priceChange.isPositive
                        ? styles.changeTextPositive
                        : styles.changeTextNegative,
                    ]}
                  >
                    {priceChange.isPositive ? "+" : ""}
                    {priceChange.value.toFixed(2)} (
                    {priceChange.percent.toFixed(2)}%)
                  </Text>
                </View>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Open</Text>
                  <Text style={styles.statValue}>
                    ${selectedStock.o?.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>High</Text>
                  <Text style={styles.statValue}>
                    ${selectedStock.h?.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Low</Text>
                  <Text style={styles.statValue}>
                    ${selectedStock.l?.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Prev Close</Text>
                  <Text style={styles.statValue}>
                    ${selectedStock.pc?.toFixed(2)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      )}

      {/* 📄 List of Results */}
      {query.length >= 2 && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsHeader}>
            {results.length > 0
              ? `${results.length} Results`
              : loading
              ? "Searching..."
              : "No results found"}
          </Text>
          <FlatList<StockSearchItem>
            data={results}
            keyExtractor={(item, index) => item.symbol + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => fetchQuote(item.symbol, item.description)}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  <View style={styles.symbolBadge}>
                    <Text style={styles.symbol}>{item.symbol}</Text>
                  </View>
                  <Text style={styles.desc} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* 💡 Empty State */}
      {query.length < 2 && !selectedStock && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📈</Text>
          <Text style={styles.emptyStateTitle}>Search for Stocks</Text>
          <Text style={styles.emptyStateText}>
            Enter a stock symbol or company name to get started
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
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
  headerSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    fontWeight: "500",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  searchLoader: {
    marginLeft: 8,
  },
  resultsSection: {
    flex: 1,
    paddingTop: 16,
  },
  resultsHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    flex: 1,
  },
  symbolBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  symbol: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6366F1",
  },
  desc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  arrow: {
    fontSize: 20,
    color: "#D1D5DB",
    marginLeft: 12,
  },
  detailsCard: {
    margin: 20,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  detailsSymbol: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1F2937",
    marginBottom: 4,
  },
  detailsDesc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    maxWidth: "85%",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6B7280",
    fontWeight: "600",
  },
  priceContainer: {
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1F2937",
    marginBottom: 8,
  },
  changeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  changeBadgePositive: {
    backgroundColor: "#D1FAE5",
  },
  changeBadgeNegative: {
    backgroundColor: "#FEE2E2",
  },
  changeText: {
    fontSize: 16,
    fontWeight: "700",
  },
  changeTextPositive: {
    color: "#059669",
  },
  changeTextNegative: {
    color: "#DC2626",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
});
