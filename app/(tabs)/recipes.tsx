import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { recipeDetailStyles } from "../../assets/images/styles/recipe-detail.styles";

export default function Recipes() {
  const [mealData, setMealData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryMeals, setCategoryMeals] = useState<any[]>([]);

  // Fetch random meal on first load
  async function getData() {
    try {
      let x = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      let data = await x.json();

      if (!data.meals || !data.meals[0]) return;

      let meal = data.meals[0];

      let mealInfo = {
        name: meal.strMeal,
        category: meal.strCategory,
        imageAPI: meal.strMealThumb,
      };

      console.log("Fetched meal info:", mealInfo);
      setMealData(mealInfo);
    } catch (error) {
      console.error("Error fetching meal:", error);
    }
  }

  // Fetch category meals
  async function fetchCategoryMeals(category: string) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      console.log("I am being clicked", category);
      setCategoryMeals(data.meals || []);
    } catch (error) {
      console.log("Error fetching category items:", error);
    }
  }

  // Trigger fetch when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryMeals(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={recipeDetailStyles.container}>
      <ScrollView>
        {/* HEADER */}
        {mealData ? (
          <View style={recipeDetailStyles.headerContainer}>
            <View style={recipeDetailStyles.imageContainer}>
              <Image
                source={{ uri: mealData.imageAPI }}
                style={recipeDetailStyles.headerImage}
                contentFit="cover"
              />
            </View>
          </View>
        ) : (
          <View>
            <Text>No data is being shown. basically api is not working</Text>
          </View>
        )}

        {/* CATEGORY RESULTS */}
        <View style={{ marginTop: 20 }}>
          {categoryMeals.map((meal) => (
            <View
              key={meal.idMeal}
              style={{
                marginBottom: 20,
                alignItems: "center",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: meal.strMealThumb }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
              />
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
                {meal.strMeal}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CATEGORY SCROLL */}
      <View className="horizontalScrollCategories">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={recipeDetailStyles.scrollContainerScrollable}
        >
          {[
            { name: "Beef", img: "beef" },
            { name: "Chicken", img: "chicken" },
            { name: "Dessert", img: "dessert" },
            { name: "Lamb", img: "lamb" },
          ].map((item) => (
            <Pressable
              key={item.name}
              onPress={() => setSelectedCategory(item.name)}
              style={[
                recipeDetailStyles.categoryCard,
                {
                  backgroundColor:
                    selectedCategory === item.name ? "purple" : "white",
                },
              ]}
            >
              <Image
                source={{
                  uri: `https://www.themealdb.com/images/category/${item.img}.png`,
                }}
                style={recipeDetailStyles.categoryImage}
              />
              <Text
                style={[
                  recipeDetailStyles.categoryTextScrollable,
                  { color: selectedCategory === item.name ? "white" : "black" },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
