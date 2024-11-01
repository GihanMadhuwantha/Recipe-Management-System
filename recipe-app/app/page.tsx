// app/page.tsx
"use client"
import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/recipes");
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Recipe Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {categories.map((category) => (
          <div key={category.idCategory} className="bg-gray-100 p-4 rounded">
            {category.strCategory}
          </div>
        ))}
      </div>
    </div>
  );
}

