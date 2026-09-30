import { Stack } from "expo-router";
import { RecipeProvider } from "../context/RecipeContext";

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="recipe/[id]"
          options={{ title: "Recipe Details" }}
        />
        <Stack.Screen name="favorites" options={{ title: "Favorites" }} />
        <Stack.Screen name="my-food" options={{ title: "My Food" }} />
        <Stack.Screen name="add-recipe" options={{ title: "Add New Recipe" }} />

        <Stack.Screen name="my-recipes" options={{ title: "My Recipes" }} />
        <Stack.Screen
          name="edit-recipe/[id]"
          options={{ title: "Edit Recipe" }}
        />
      </Stack>
    </RecipeProvider>
  );
}
