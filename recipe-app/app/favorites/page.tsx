'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Recipe {
  id: number;
  apiId: string;
  title: string;
  category: string;
}

export default function FavoritesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    if (session && session.user) {
      axios.get(`/api/favorites?userId=${session.user.email}`).then((response) => {
        setFavorites(response.data);
      });
    }
  }, [session]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your Favorite Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="bg-gray-100 p-4 rounded">
            {recipe.title}
          </div>
        ))}
      </div>
    </div>
  );
}
