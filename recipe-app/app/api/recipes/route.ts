import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipesApiResponse {
  meals: Recipe[];
}

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get<RecipesApiResponse>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return NextResponse.json(response.data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recipes for the category" },
      { status: 500 }
    );
  }
}
