import axios from "axios";
import { NextResponse } from "next/server";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface RecipeApiResponse {
  categories: Category[];
}

export async function GET() {
  try {
    const response = await axios.get<RecipeApiResponse>(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    return NextResponse.json(response.data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
