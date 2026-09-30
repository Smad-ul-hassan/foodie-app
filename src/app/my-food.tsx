import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function MyFoodScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 25 }}>
        🍴 My Food
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/add-recipe")}
        style={{
          backgroundColor: "#ff6b35",
          padding: 18,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ➕ Add New Recipe
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/my-recipes" as any)}
        style={{
          backgroundColor: "#eee",
          padding: 18,
          borderRadius: 12,
          marginTop: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          📖 My Recipes
        </Text>
      </TouchableOpacity>
    </View>
  );
}
