// api.js - Foodie App API Integration Service

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'; // Ya koi bhi backend API endpoint

export const fetchFoodData = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return [];
  }
};
