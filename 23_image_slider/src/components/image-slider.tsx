"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";

interface ImageData {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
}

const ImageSlider = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const interval = 5000;

  const fetchImages = async () => {
    try {
      const data = await fetch(
        `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&orientation=landscape`
      );
      const res = await data.json();
      console.log(res)
      setImages(res);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const nextImage = useCallback((): void => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(nextImage, interval);
      return () => clearInterval(id);
    }
  }, [isPlaying, nextImage]);

  const togglePlayPause = (): void => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };


  return (
    <div className="w-full max-w-2xl pt-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-bold text-3xl">Image Slider</h1>
        <p >A simple dynamic image slider/carousel with Unsplash.</p>

        <Carousel className="relative w-full mt-4">
          <CarouselContent>
            {images.map((val, index) => (
              <CarouselItem
                key={val.id}
                className={index === currentIndex ? "block" : "hidden"}
              >
                <div className="p-2 border rounded-lg">
                  <div className="border rounded-lg overflow-hidden h-[70vh] flex items-center justify-center">
                    <Image
                      src={val.urls.regular}
                      alt={val.alt_description}
                      width={800}
                      height={400}
                      className="object-cover center w-full h-full md:h-auto"
                    />
                  </div>
                  <div className="p-2 bg-white/75 text-center">
                    <h2 className="text-lg font-bold">{val.user.name}</h2>
                    <p className="text-sm">
                      {val.description || val.alt_description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-gray-800" />
              ) : (
                <PlayIcon className="w-6 h-6 text-gray-800" />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ImageSlider;
