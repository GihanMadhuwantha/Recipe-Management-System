'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { RecipeCard } from './components/RecipeCard';
import { useRouter } from 'next/navigation'; 


interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

interface RecipesApiResponse {
  meals: Recipe[];
}

export default function Home() {
  const { data: session, status } = useSession(); 
  const router = useRouter(); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]); 

  useEffect(() => {

    console.log('status',status)
    if (status === 'loading') {
      return;
    }
    if (status === 'unauthenticated') {
      router.push('/login'); 
    } else {
      const loadFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(loadFavorites);
    }
  }, [session, status, router]);

  const fetchRecipes = async (category: string) => {
    const response = await axios.get<RecipesApiResponse>(`/api/recipes?category=${category}`); 
    setRecipes(response.data.meals);
  };

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryTabs onCategorySelect={fetchRecipes} />
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              id={recipe.idMeal}
              title={recipe.strMeal}
              category={recipe.strCategory}
              image={recipe.strMealThumb}
              isFavorite={favorites.includes(recipe.idMeal)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
