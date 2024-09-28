"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {SearchIcon } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  uri: string;
  label: string;
  image: string;
  ingredientLines: string[];
  ingredients: { text: string }[];
  url: string;
}

const examples = [
  "Biryani",
  "Chicken Karahi",
  "Nihari",
  "Haleem",
  "Chapli Kabab",
];
const RecipeSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

  const searchData = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setSearched(true);
      setRecipes([]);

      const fetchData = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM__APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_APP_KEY}`
      );

      const res = await fetchData.json();

      setRecipes(res.hits.map((hits: { recipe: Recipe }) => hits.recipe));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl py-10 px-5 md:p-10">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-bold">Recipe Search</h1>
        <p className="text-lg text-center">
          Find delicious recipes by ingredients you have at home.
        </p>
        <div className="mt-4 ">
          <p>Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {examples.map((example) => (
              <span
                key={example}
                className="px-2 py-1 bg-gray-200 rounded-xl cursor-pointer text-black"
                onClick={() => setQuery(example)}
              >
                {example}
              </span>
            ))}
          </div>
          <form
            className="relative w-full max-w-md mb-6 mt-4"
            onSubmit={searchData}
          >
            <Input
              type="search"
              placeholder="Search by ingredient..."
              className="pr-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-start items-center w-full h-full">
          <ClipLoader className="w-10 h-10 mb-4" color="#ffffff" />
          <p className="text-white">Loading recipes, please wait...</p>
        </div>
      ) : (
        <div>
          {searched && recipes.length === 0 && (
            <p className="text-center text-red-400">
              No recipes found. Try searching with different ingredients.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <Card className="group relative overflow-hidden" key={recipe.uri}>
                <div className="rounded-t-lg overflow-hidden w-full h-48 ">
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  height={300}
                  width={400}
                  className="group-hover:scale-110 group-hover:opacity-85 transition-all duration-150 object-cover h-full w-full"
                />

                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">{recipe.label}</h3>
                  <p className="text-muted-foreground line-clamp-2">{recipe.ingredientLines.join(", ")}</p>
                </CardContent>
                <Link href={recipe.url}
                    target="_blank"
                className="absolute inset-0 z-10">
                  <span className="sr-only">View recipe</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
