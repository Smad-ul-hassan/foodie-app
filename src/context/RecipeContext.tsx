import React, { createContext, useContext, useState } from "react";

type RecipeContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <RecipeContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipes must be used inside RecipeProvider");
  }

  return context;
}
