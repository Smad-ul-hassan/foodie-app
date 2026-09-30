import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useRecipes } from "../context/RecipeContext";

const recipes = [
  { id: "1", name: "Chicken Biryani" },
  { id: "2", name: "Margherita Pizza" },
  { id: "3", name: "Pancakes" },
  { id: "4", name: "Chocolate Cake" },
  { id: "5", name: "Chicken Tacos" },
];

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useRecipes();

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id),
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        ❤️ Favorites
      </Text>

      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/recipe/${item.id}`)}
            style={{
              padding: 18,
              marginBottom: 12,
              backgroundColor: "#eee",
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text>No favorite recipes yet. Tap 🤍 to add one.</Text>
        }
      />
    </View>
  );
}
