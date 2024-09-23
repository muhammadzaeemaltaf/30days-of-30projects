"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import Image from "next/image";
import { Calendar, Clock4, StarIcon } from "lucide-react";

interface Details {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
  Language: string;
  Type: string;
}

const MovieSearch = () => {
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<Details | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(err);

  const search = async () => {
    setLoading(true);
    setErr(null);
    setMovieDetails(null);
    try {
      const fetchData = await fetch(
        `http://www.omdbapi.com/?t=${searchMovie}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const res = await fetchData.json();
      console.log(res);
      setMovieDetails(res);
      if (res.Response === "False") {
        setErr(res.Error);
      }
    } catch (err: any) {
      setErr(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl text-center">Movie Search</CardTitle>
          <CardDescription className="text-center">
            Search for any movies and display details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Enter movie name"
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
            />
            <Button onClick={search}>
              {!loading ? "Search" : <Spinner className="w-6 h-6 text-white" />}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {/* Loading spinner */}
          {loading && (
            <div className="w-full ">
              <Spinner className="w-10 h-10 text-blue-500" />
            </div>
          )}
          {/* Error message */}
          {err && (
            <div className="text-red-500 w-full text-center mb-4">
              {err}. Please try searching for another movie.
            </div>
          )}
          {/* Movie details */}
          {!err && movieDetails && (
            <div className="w-full grid sm:grid-cols-[35%_auto] grid-rows-1 items-center gap-4 border rounded-xl overflow-hidden p-3 bg-[#ebe8e8]">
              <div className="h-full">
                <Image
                  src={
                    movieDetails.Poster !== "N/A"
                      ? movieDetails.Poster
                      : "/placeholder.png"
                  }
                  alt={movieDetails.Title}
                  width={200}
                  height={300}
                  className="rounded-md shadow-md h-full object-cover mx-auto sm:mx-0"
                />
              </div>
              <div className="text-center sm:text-start">
                <div className="flex items-end gap-3 justify-center sm:justify-start">
                  <h2 className="text-2xl font-bold">
                    {movieDetails.Title}{" "}
                    <span className="text-sm text-balance">
                      ({movieDetails.Type})
                    </span>
                  </h2>
                </div>
                <p className="flex text-sm items-center justify-center sm:justify-start gap-2 py-2">
                  <Calendar className="w-4 h-4 mb-1" /> {movieDetails.Year} | <Clock4 className="w-4 h-4" /> {movieDetails.Runtime}
                </p>
                <p className="flex text-sm items-center gap-2 border-b-2 border-gray-300 pb-2 justify-center sm:justify-start">
                {movieDetails.Genre} | {movieDetails.Released}{" "}
                </p>
               
                <div className="py-2 border-b-2 border-gray-300 space-y-2 w-full">
                  <div className="flex gap-2 items-center justify-center sm:justify-start">
                    <StarIcon className="w-8 h-8 mr-1 fill-yellow-500" />
                    <p>
                      {movieDetails.imdbRating} / 10 on <strong>IMDB</strong>
                    </p>
                  </div>
                  <p className="text-sm line-clamp-none sm:line-clamp-3 ">{movieDetails.Plot}</p>
                </div>

                <div className="pt-2 space-y-0.5">
                  <p className="text-sm">
                    <strong>Director:</strong> {movieDetails.Director}
                  </p>
                  <p className="text-sm">
                    <strong>Actors:</strong> {movieDetails.Actors}
                  </p>
                  <p className="text-sm">
                    <strong>Language:</strong> {movieDetails.Language}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieSearch;
