import React from "react";

interface RecipeModalProps {
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  title,
  image,
  description,
  ingredients,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full overflow-y-auto">
        <div className="relative mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside mb-4">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RecipeModal;
