import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

type Recipe = {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  image?: string | null;
};

export default function MyRecipesScreen() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const saved = await AsyncStorage.getItem("myRecipes");

    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  };

  const deleteRecipe = async (id: string) => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

            await AsyncStorage.setItem(
              "myRecipes",
              JSON.stringify(updatedRecipes),
            );

            setRecipes(updatedRecipes);
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        📖 My Recipes
      </Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#eee",
              borderRadius: 12,
              marginBottom: 15,
              padding: 15,
            }}
          >
            {/* Recipe Details */}
            <TouchableOpacity
              onPress={() => router.push(`/my-recipe/${item.id}` as any)}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>

              <Text style={{ marginTop: 6 }}>Tap to view recipe</Text>
            </TouchableOpacity>

            {/* Edit and Delete */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                gap: 10,
              }}
            >
              {/* Edit */}
              <TouchableOpacity
                onPress={() => router.push(`/edit-recipe/${item.id}` as any)}
                style={{
                  backgroundColor: "#ff6b35",
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>

              {/* Delete */}
              <TouchableOpacity
                onPress={() => deleteRecipe(item.id)}
                style={{
                  backgroundColor: "#d32f2f",
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No recipes yet. Add a recipe first.</Text>}
      />
    </View>
  );
}
