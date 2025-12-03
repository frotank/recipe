import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type NewsItem = {
  id: number;
  datetime: number;
  headline: string;
  source: string;
  url: string;
  summary?: string;
  image?: string;
};

export default function NewsScreen() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "d4msg69r01qsn6g85g90d4msg69r01qsn6g85g9g";

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`
      );
      const data = await res.json();
      setNews(data || []);
    } catch (err) {
      console.log("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Loading latest news...</Text>
      </View>
    );
  }

  const breakingNews = news[0];
  const regularNews = news.slice(1);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Market News</Text>
          <Text style={styles.headerSubtitle}>
            Stay updated with latest headlines
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Breaking News Section */}
          {breakingNews && (
            <View style={styles.breakingSection}>
              <View style={styles.breakingBadge}>
                <Text style={styles.breakingBadgeText}>🔴 BREAKING NEWS</Text>
              </View>
              <TouchableOpacity
                style={styles.breakingCard}
                onPress={() => openLink(breakingNews.url)}
                activeOpacity={0.9}
              >
                {breakingNews.image ? (
                  <Image
                    source={{ uri: breakingNews.image }}
                    style={styles.breakingImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.breakingImagePlaceholder}>
                    <Text style={styles.placeholderIcon}>📰</Text>
                  </View>
                )}
                <View style={styles.breakingOverlay} />
                <View style={styles.breakingContent}>
                  <Text style={styles.breakingHeadline} numberOfLines={3}>
                    {breakingNews.headline}
                  </Text>
                  <View style={styles.breakingMeta}>
                    <Text style={styles.breakingSource}>
                      {breakingNews.source}
                    </Text>
                    <Text style={styles.breakingTime}>
                      {formatTime(breakingNews.datetime)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Latest News Section */}
          <View style={styles.latestSection}>
            <Text style={styles.sectionTitle}>Latest Updates</Text>
            {regularNews.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => openLink(item.url)}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardLeft}>
                    {item.image ? (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.thumbnailPlaceholder}>
                        <Text style={styles.thumbnailIcon}>📄</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.cardRight}>
                    <Text style={styles.headline} numberOfLines={3}>
                      {item.headline}
                    </Text>
                    <View style={styles.cardMeta}>
                      <Text style={styles.source} numberOfLines={1}>
                        {item.source}
                      </Text>
                      <Text style={styles.time}>
                        {formatTime(item.datetime)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {news.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No news available</Text>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={fetchNews}
              >
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </>
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  breakingSection: {
    padding: 20,
    paddingBottom: 12,
  },
  breakingBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  breakingBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#DC2626",
    letterSpacing: 0.5,
  },
  breakingCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1F2937",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    height: 280,
  },
  breakingImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  breakingImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    fontSize: 64,
  },
  breakingOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  breakingContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  breakingHeadline: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 30,
    marginBottom: 12,
  },
  breakingMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breakingSource: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E0E7FF",
  },
  breakingTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB",
  },
  latestSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
  },
  cardLeft: {
    marginRight: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  thumbnailPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailIcon: {
    fontSize: 32,
  },
  cardRight: {
    flex: 1,
    justifyContent: "space-between",
  },
  headline: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 21,
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  source: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6366F1",
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
