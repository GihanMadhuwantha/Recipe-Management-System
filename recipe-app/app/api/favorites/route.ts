import { PrismaClient, Recipe } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
  const { userId, recipe }: { userId: string; recipe: Recipe } = await req.json(); // Change userId to string

  // Create a favorite recipe for the user
  const favorite = await prisma.recipe.create({
    data: {
      userId, // userId is now a string
      apiId: recipe.apiId,
      title: recipe.title,
      category: recipe.category,
    },
  });

  return NextResponse.json(favorite);
}

// GET method to fetch favorite recipes for a user
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId"); // Keep userId as string

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const favorites = await prisma.recipe.findMany({
    where: { userId },
  });

  return NextResponse.json(favorites);
}
