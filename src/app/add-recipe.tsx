import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function AddRecipeScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveRecipe = async () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert("Missing Information", "Please fill all fields.");
      return;
    }

    const oldRecipes = await AsyncStorage.getItem("myRecipes");

    const recipes = oldRecipes ? JSON.parse(oldRecipes) : [];

    const newRecipe = {
      id: Date.now().toString(),
      name,
      ingredients,
      instructions,
      image,
    };

    recipes.push(newRecipe);

    await AsyncStorage.setItem("myRecipes", JSON.stringify(recipes));

    Alert.alert("Success", "Recipe saved successfully!", [
      {
        text: "OK",
        onPress: () => router.push("/my-recipes" as any),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Recipe</Text>

      <Text style={styles.label}>Recipe Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Recipe Image</Text>

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>📷 Upload Image</Text>
      </TouchableOpacity>

      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}

      <Text style={styles.label}>Ingredients</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Enter ingredients, one per line"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <Text style={styles.label}>Step-by-Step Instructions</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Enter instructions, one step per line"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Button title="Save Recipe" onPress={saveRecipe} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 15,
    borderRadius: 10,
  },
});
