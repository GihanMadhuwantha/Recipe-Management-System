import { useState } from "react";
import { Heart } from "lucide-react";
import RecipeModal from "./RecipeModal"; // Adjust the path based on your folder structure

interface RecipeCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  ingredients?: string[];
  isFavorite?: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const RecipeCard = ({
  id,
  title,
  category,
  image,
  description = "",
  ingredients = [],
  isFavorite = false,
  onFavoriteToggle,
}: RecipeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col" onClick={openModal}>
        <div className="aspect-square bg-gray-200 rounded-2xl mb-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm">{category}</p>
            <h3 className="text-gray-900 font-medium">{title}</h3>
          </div>
          <Heart
            className={`w-5 h-5 cursor-pointer ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(id);
            }}
          />
        </div>
      </div>

     
      {isModalOpen && (
        <RecipeModal
          title={title}
          image={image}
          description={description}
          ingredients={ingredients}
          onClose={closeModal}
        />
      )}
    </>
  );
};
