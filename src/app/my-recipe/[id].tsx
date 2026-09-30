import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

type Recipe = {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  image?: string | null;
};

export default function MyRecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    const saved = await AsyncStorage.getItem("myRecipes");

    if (saved) {
      const recipes: Recipe[] = JSON.parse(saved);
      const found = recipes.find((item) => item.id === id);

      if (found) {
        setRecipe(found);
      }
    }
  };

  if (!recipe) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const ingredientList = recipe.ingredients.split("\n").filter(Boolean);

  const instructionList = recipe.instructions.split("\n").filter(Boolean);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {recipe.image && (
        <Image
          source={{ uri: recipe.image }}
          style={{
            width: "100%",
            height: 250,
          }}
        />
      )}

      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {recipe.name}
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 25,
            marginBottom: 10,
          }}
        >
          Ingredients
        </Text>

        {ingredientList.map((item, index) => (
          <Text key={index} style={{ fontSize: 16, marginBottom: 8 }}>
            • {item}
          </Text>
        ))}

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 25,
            marginBottom: 10,
          }}
        >
          Instructions
        </Text>

        {instructionList.map((item, index) => (
          <Text
            key={index}
            style={{
              fontSize: 16,
              marginBottom: 12,
              lineHeight: 23,
            }}
          >
            {index + 1}. {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
