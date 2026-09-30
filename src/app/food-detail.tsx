import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  // Agar route params se data nahi mila toh default fallback show hoga
  const item = route?.params?.item || {
    name: 'Cheesy BBQ Burger',
    price: '$9.99',
    description: 'Delicious cheesy burger with fresh lettuce, tomatoes, and smoky BBQ sauce.',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Food Image Placeholder */}
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholderText}>Food Item Image</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>

        <Text style={styles.sectionHeader}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.button} onPress={() => alert('Added to cart!')}>
          <Text style={styles.buttonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { width: '100%', height: 250, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { color: '#888', fontSize: 16 },
  detailsContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 20, color: '#007BFF', fontWeight: '600', marginBottom: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 30 },
  button: { backgroundColor: '#007BFF', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
