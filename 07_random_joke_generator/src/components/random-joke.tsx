"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface Jokes {
  setup: string;
  punchline: string;
}

const RandomJoke = () => {
  const [joke, setJoke] = useState<string>("Loading...");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async (): Promise<void> => {
    setLoading(true);
    const req = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    try {
      const res: Jokes = await req.json();
      setJoke(`${res.setup}\n- ${res.punchline}`);
    } catch (err) {
      console.error("Error in fetching:", err);
      setJoke("Failed to fetch joke. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="s">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4 text-[#333]">
            😂 Random Joke 👈
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg whitespace-pre-wrap">
            {isLoading ? "Loading..." : joke}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => fetchJokes()}
            disabled={isLoading}
            className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            {isLoading ? "Loading..." : "😂 Get New Joke 😂"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RandomJoke;