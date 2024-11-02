import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  idCategory: string;
  strCategory: string;
}

interface CategoriesApiResponse {
  categories: Category[];
}

interface CategoryTabsProps {
  onCategorySelect: (category: string) => void;
}

export const CategoryTabs = ({ onCategorySelect }: CategoryTabsProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<CategoriesApiResponse>(
          "/api/categories"
        );
        const fetchedCategories = response.data.categories.slice(0, 5);
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          const firstCategory = fetchedCategories[0].strCategory;
          setActiveCategory(firstCategory);
          onCategorySelect(firstCategory);
        }
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    onCategorySelect(categoryName);
  };

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex gap-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 p-4">
      {categories.map((category) => {
        const isActive = activeCategory === category.strCategory;

        return (
          <button
            key={category.idCategory}
            onClick={() => handleCategoryClick(category.strCategory)}
            className={`
              px-6 
              py-2 
              rounded-full 
              border 
              transition-colors 
              duration-200
              ${
                isActive
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-pink-500 border-pink-500 hover:bg-pink-50"
              }
              focus:outline-none 
              focus:ring-2 
              focus:ring-pink-500 
              focus:ring-opacity-50
            `}
            aria-pressed={isActive}
          >
            {category.strCategory}
          </button>
        );
      })}
    </div>
  );
};
