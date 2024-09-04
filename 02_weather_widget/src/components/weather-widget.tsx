"use client";

import React, { FormEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { env } from "process";
import Image from "next/image";
import { WiCloudy, WiCloudyWindy, WiHumidity } from "react-icons/wi";

interface WeatherData {
  name: string;
  country: string;
  localTime: string;
  text: string;
  icon: string;
  temp_C: number;
  feelslike_c: number;
  cloud: number;
  humidity: number;
  wind_mph: number;
}

const WeatherWidget = () => {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchWeather = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    console.log(trimmedLocation);

    if (trimmedLocation === "") {
      setError("Please enter a valid location");
      return;
    }

    setIsLoading(true);
    setError(null);
    setWeather(null)

    const fetchWeather = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${trimmedLocation}`
    );
    try {
      const res = await fetchWeather.json();
      console.log(res);
      const weatherData: WeatherData = {
        name: res.location.name,
        country: res.location.country,
        localTime: res.location.localtime,
        text: res.current.condition.text,
        icon: res.current.condition.icon,
        temp_C: res.current.temp_c,
        feelslike_c: res.current.feelslike_c,
        cloud: res.current.cloud,
        humidity: res.current.humidity,
        wind_mph: res.current.wind_mph,
      };

      setWeather(weatherData);
      setError(null);
      setIsLoading(false);
      getTemperature();
      console.log(weatherData);
    } catch (error){
      console.log("An error:", error)
      setError("City not found. Please try again!");
      setIsLoading(false);
    }
  };
  // const arr = weather?.text.split(" ")
  const getTemperature = () => {
    return (
      <div className="mt-4">
        <p className="text-center font-semibold">{`${weather?.name}, ${weather?.country}`}</p>
        <div className="flex justify-between items-center px-4 py-2 rounded-xl bg-white/20 my-2">
          <div>
            <h1 className="font-bold text-5xl font-serif">{`${weather?.temp_C}°C`}</h1>
            <p className="text-start mt-4 mb-1 font-semibold">
              Feel Like{" "}
              <strong className="font-bold font-serif">
                {weather?.feelslike_c}°C
              </strong>
            </p>
          </div>
          <div className="">
            <Image
              className="w-[10rem] h-32"
              src={`https:${weather?.icon}`}
              alt="weather_icon"
              height={1000}
              width={1000}
            />
            
            <div className="flex justify-end">
            <p
    className={`text-center font-semibold text-md -mt-3 ${
      weather?.text &&  weather.text.split(" ").length < 2 ? "pe-5" : "w-11/12"
    }`}
  >
                {weather?.text}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around my-3 gap-3">
          <div className="flex flex-col justify-center items-center rounded-xl bg-white/20 px-2 py-4 w-1/3">
            <div className="flex justify-center items-center gap-1">
              Cloud <WiCloudy className="text-3xl" />
            </div>
            <p>{weather?.cloud}%</p>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl bg-white/20 px-2 py-4 w-1/3">
            <div className="flex justify-center items-center gap-1">
              Humidity <WiHumidity className="text-3xl" />
            </div>
            <p>{weather?.humidity}%</p>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl bg-white/20 px-2 py-4 w-1/3">
            <div className="flex justify-center items-center gap-1">
              Wind <WiCloudyWindy className="text-3xl" />
            </div>
            <p>{weather?.wind_mph} mph</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md">
      <Card className="text-center bg-white/50 backdrop-blur-xl rounded-lg border border-white/20 shadow-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Weather Widget</CardTitle>
          <CardDescription className="text-white">
            Search for the current weather conditions in your city.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex items-center gap-2" onSubmit={searchWeather}>
            <Input
              className="bg-white/50"
              type="text"
              placeholder="Enter a city name"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <Button type="submit"  className={`${isLoading ? "cursor-not-allowed opacity-50" : ""}`}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>

          {error && <div className="mt-4 text-red-500">{error}</div>}

          {weather && <div className="text-white">{getTemperature()}</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;
