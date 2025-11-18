import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../app/constants/colors";
import { searchStyles } from "../../assets/images/styles/search.styles";

export default function Search() {
  const [mealData, setMealData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function getData(query: string) {
    try {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      let data = await response.json();

      if (!data.meals) {
        setMealData([]);
        return;
      }

      // extract important fields only
      let meals = data.meals.map((meal: any) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        imageAPI: meal.strMealThumb,
      }));

      setMealData(meals);
    } catch (error) {
      console.error("Error fetching meal:", error);
    }
  }

  useEffect(() => {
    getData("Arrabiata"); // initial load
  }, []);

  return (
    <View style={searchStyles.container}>
      {/* 🔍 Search Bar */}
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => getData(searchQuery)}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* 🍽️ Results List */}
      <FlatList
        data={mealData}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginHorizontal: 10,
              marginVertical: 5,
              backgroundColor: COLORS.card,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
            }}
          >
            <Image
              source={{ uri: item.imageAPI }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: COLORS.textLight,
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                {item.name}
              </Text>
              <Text style={{ color: COLORS.textLight }}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              color: COLORS.textLight,
              marginTop: 20,
            }}
          >
            No meals found
          </Text>
        }
      />
    </View>
  );
}
