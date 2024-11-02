"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Header } from "../components/Header";
import { Heart } from "lucide-react";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

const RecipeCard = ({
  id,
  title,
  category,
  image,
  isFavorite,
  onFavoriteToggle,
}: {
  id: string;
  title: string;
  category: string;
  image: string;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-600 text-sm">{category}</p>
      </div>
      <div className="px-6 pb-4">
        <button
          onClick={() => onFavoriteToggle(id)}
          className={`transition-colors ${
            isFavorite
              ? "text-red-500 hover:text-red-700"
              : "text-gray-400 hover:text-gray-600"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
};

//Main favorites page component
export default function Favorites() {
  const { status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    fetchFavoriteRecipes();
  }, [status, router]);

  const fetchFavoriteRecipes = async () => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favoriteIds.length === 0) {
      setFavorites([]);
      return;
    }

    try {
      const recipePromises = favoriteIds.map(async (id: string) => {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        return response.data.meals?.[0];
      });

      const recipes = await Promise.all(recipePromises);
      setFavorites(recipes.filter(Boolean));
    } catch (err) {
      setError("Failed to fetch favorite recipes");
      console.error(err);
    }
  };

  const handleFavoriteToggle = (recipeId: string) => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favoriteIds.filter(
      (id: string) => id !== recipeId
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setFavorites((currentFavorites) =>
      currentFavorites.filter((recipe) => recipe.idMeal !== recipeId)
    );
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="text-center mt-8">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="text-red-500 text-center mt-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold my-8">Favorite Recipes</h1>

        {favorites.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            <p>No favorite recipes yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-6">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                title={recipe.strMeal}
                category={recipe.strCategory}
                image={recipe.strMealThumb}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
