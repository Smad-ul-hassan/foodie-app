import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useRecipes } from "../context/RecipeContext";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Italian",
  "Chinese",
  "Mexican",
  "Pakistani",
  "Indian",
  "Healthy",
  "Fast Food",
  "Drinks",
];

const recipes = [
  {
    id: "1",
    name: "Chicken Biryani",
    category: "Pakistani",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c",
    ingredients: ["Rice", "Chicken", "Yogurt", "Onion", "Tomato", "Spices"],
    instructions: [
      "Marinate the chicken with yogurt and spices.",
      "Cook the rice until partially done.",
      "Cook the chicken mixture.",
      "Layer rice and chicken.",
      "Cook on low heat for 20 minutes.",
    ],
    preparationTime: "45 minutes",
    servings: 4,
    calories: 520,
    difficulty: "Medium",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    category: "Italian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Basil"],
    instructions: [
      "Prepare the pizza dough.",
      "Spread tomato sauce over the dough.",
      "Add mozzarella cheese.",
      "Bake until golden.",
      "Add fresh basil before serving.",
    ],
    preparationTime: "30 minutes",
    servings: 2,
    calories: 430,
    difficulty: "Easy",
  },
  {
    id: "3",
    name: "Pancakes",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter"],
    instructions: [
      "Mix flour, sugar and eggs.",
      "Add milk and make a smooth batter.",
      "Heat a pan.",
      "Cook pancakes on both sides.",
      "Serve with your favorite topping.",
    ],
    preparationTime: "20 minutes",
    servings: 3,
    calories: 350,
    difficulty: "Easy",
  },
  {
    id: "4",
    name: "Chocolate Cake",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    ingredients: ["Flour", "Cocoa", "Eggs", "Sugar", "Butter"],
    instructions: [
      "Mix all dry ingredients.",
      "Add eggs and butter.",
      "Pour into a baking pan.",
      "Bake for 35 minutes.",
      "Let the cake cool before serving.",
    ],
    preparationTime: "50 minutes",
    servings: 6,
    calories: 480,
    difficulty: "Medium",
  },
  {
    id: "5",
    name: "Chicken Tacos",
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    ingredients: ["Chicken", "Tortillas", "Lettuce", "Tomato", "Cheese"],
    instructions: [
      "Cook seasoned chicken.",
      "Warm the tortillas.",
      "Add chicken and vegetables.",
      "Top with cheese.",
      "Serve immediately.",
    ],
    preparationTime: "25 minutes",
    servings: 3,
    calories: 390,
    difficulty: "Easy",
  },
];

export default function HomeScreen() {
  const { toggleFavorite, isFavorite } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍴 Foodie</Text>
        <Text style={styles.subtitle}>Discover delicious recipes</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "All" && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === "All" && styles.selectedCategoryText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => router.push("/my-food" as any)}
        >
          <Text style={styles.categoryText}>🍴 My Food</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => router.push(`/recipe/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.heartText}>
                {isFavorite(item.id) ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{item.name}</Text>

              <Text style={styles.recipeCategory}>{item.category}</Text>

              <Text style={styles.recipeMeta}>
                {item.preparationTime} • {item.servings} servings
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No recipes found for this category.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: "#666",
  },
  categoryContainer: {
    maxHeight: 55,
  },
  categoryContent: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  selectedCategory: {
    backgroundColor: "#ff6b35",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  recipeList: {
    padding: 15,
  },
  recipeCard: {
    marginBottom: 18,
    borderRadius: 14,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: 190,
  },
  recipeInfo: {
    padding: 14,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  recipeCategory: {
    marginTop: 5,
    color: "#ff6b35",
    fontWeight: "600",
  },
  recipeMeta: {
    marginTop: 7,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  heartText: {
    fontSize: 22,
  },
});
