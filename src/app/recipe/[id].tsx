import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
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
];

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        onPress={() => router.back()}
        style={{
          fontSize: 18,
          fontWeight: "bold",
          padding: 15,
        }}
      >
        ← Back
      </Text>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>

        <Text style={styles.category}>{recipe.category}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.info}>⏱ {recipe.preparationTime}</Text>
          <Text style={styles.info}>👥 {recipe.servings} servings</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.info}>🔥 {recipe.calories} calories</Text>
          <Text style={styles.info}>⭐ {recipe.difficulty}</Text>
        </View>

        <Text style={styles.heading}>Ingredients</Text>

        {recipe.ingredients.map((ingredient) => (
          <Text key={ingredient} style={styles.listItem}>
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.heading}>Instructions</Text>

        {recipe.instructions.map((instruction, index) => (
          <Text key={instruction} style={styles.instruction}>
            {index + 1}. {instruction}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  category: {
    marginTop: 5,
    color: "#ff6b35",
    fontSize: 16,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  heading: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  listItem: {
    marginBottom: 8,
    fontSize: 16,
  },
  instruction: {
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 23,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
