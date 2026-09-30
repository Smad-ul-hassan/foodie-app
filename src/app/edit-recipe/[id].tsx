import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditRecipeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    const saved = await AsyncStorage.getItem("myRecipes");

    if (saved) {
      const recipes = JSON.parse(saved);
      const recipe = recipes.find((item: any) => item.id === id);

      if (recipe) {
        setName(recipe.name);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
      }
    }
  };

  const updateRecipe = async () => {
    const saved = await AsyncStorage.getItem("myRecipes");

    if (!saved) return;

    const recipes = JSON.parse(saved);

    const updated = recipes.map((recipe: any) =>
      recipe.id === id
        ? {
            ...recipe,
            name,
            ingredients,
            instructions,
          }
        : recipe,
    );

    await AsyncStorage.setItem("myRecipes", JSON.stringify(updated));

    Alert.alert("Success", "Recipe updated successfully!", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Edit Recipe
      </Text>

      <Text>Recipe Name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          marginTop: 8,
          marginBottom: 15,
          borderRadius: 8,
        }}
      />

      <Text>Ingredients</Text>

      <TextInput
        value={ingredients}
        onChangeText={setIngredients}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          marginTop: 8,
          marginBottom: 15,
          minHeight: 120,
          borderRadius: 8,
        }}
      />

      <Text>Instructions</Text>

      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          marginTop: 8,
          marginBottom: 20,
          minHeight: 120,
          borderRadius: 8,
        }}
      />

      <Button title="Update Recipe" onPress={updateRecipe} />
    </ScrollView>
  );
}
