import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const foodItems = [
  { id: '1', name: 'Cheesy BBQ Burger', price: '$9.99' },
  { id: '2', name: 'Spicy Pepperoni Pizza', price: '$12.50' },
  { id: '3', name: 'Sushi Combo Platter', price: '$15.00' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Text style={styles.logoText}>FOODIE-APP</Text>
      </View>

      <Text style={styles.sectionTitle}>Featured Foods</Text>

      {/* List of food items */}
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 20 },
  header: { height: 60, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 20 },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#007BFF' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  foodName: { fontSize: 16, fontWeight: '600' },
  foodPrice: { color: '#888', marginTop: 5 },
});
