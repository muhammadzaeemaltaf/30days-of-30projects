"use client";

import { PauseIcon, PlayIcon, RewindIcon, UploadIcon, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AudioPlayerProps {}

interface Track {
  title: string;
  artist: string;
  src: string;
}

const AudioPlayer = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const newTrack: Track[] = Array.from(files).map((files) => ({
        title: files.name,
        artist: "Unknown Artist",
        src: URL.createObjectURL(files),
      }));

      setTracks((prev) => [...prev, ...newTrack]);
    }
  };

  const handlePlayPause = (): void => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (audioRef.current && currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handlePrevTrack = () => {
    if (audioRef.current) {
      setCurrentTrackIndex((prev) =>
        prev === 0 ? tracks.length - 1 : prev - 1
      );
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentTracks = () => {
    if (tracks.length > 0) {
      const currentTrack = tracks.map((track, key) => {
        return (
          <DropdownMenuItem
            key={key}
            className={`${currentTrackIndex === key ? "bg-gray-300 " : ""}`}
          >
            <div className="grid grid-cols-[85%_auto] justify-center items-center gap-1 w-full">
              <p className="text-ellipsis cursor-pointer overflow-hidden pt-2">
                <span
                  className={`text-nowrap ${
                    currentTrackIndex === key
                      ? "marquee font-extrabold "
                      : "font-semibold"
                  }`}
                  onClick={() => {
                    setCurrentTrackIndex(key);
                  }}
                >
                  {track.title}
                </span>
              </p>
              <span
                onClick={() => removeTrack(track.title, key)}
                className="cursor-pointer hover:bg-red-400 hover:text-white rounded-lg flex justify-center items-center"
              >
                <X className="h-5 w-5" />
              </span>
            </div>
          </DropdownMenuItem>
        );
      });
      return currentTrack;
    } else {
      return <DropdownMenuItem> No tracks found</DropdownMenuItem>;
    }
  };

  const removeTrack = (trackName: string, index: number) => {
    const newTracks: Track[] = tracks.filter((_, i) => i !== index);
    setTracks(newTracks);
  
    if (index === currentTrackIndex) {
      if (currentTrackIndex === tracks.length - 1) {
        setCurrentTrackIndex(0);
      } else {
        setCurrentTrackIndex(currentTrackIndex);
      }
    } else if (index < currentTrackIndex) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  
    if (newTracks.length === 0) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    
  };
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = tracks[currentTrackIndex]?.src || "";
      audioRef.current.load();
      setCurrentTime(0);
      setProgress(0);

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex, tracks]);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-md rounded-xl space-y-4 px-4">
      <div className="flex items-center justify-between w-full text-white">
        <h1 className="text-2xl font-bold">Audio Player</h1>
        <label className="flex items-center cursor-pointer">
          <UploadIcon className="w-5 h-5 mr-2" />
          <span>Upload</span>
          <input
            type="file"
            accept="audio/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>
      <Card className="w-full p-6 relative bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
        <CardHeader className="absolute right-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Tracks</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Your Tracks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currentTracks()}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center justify-center pt-5 space-y-4 text-white">
          <Image
            src={isPlaying ? "/music.gif" : "/music.svg"}
            alt="Album Cover"
            width={100}
            height={100}
            className="rounded-full w-32 h-32 object-cover"
          />

          <div className="text-center w-full text-ellipsis overflow-hidden">
            <h2
              className={`text-xl font-bold  ${
                tracks[currentTrackIndex] ? "marquee" : ""
              }`}
            >
              {tracks[currentTrackIndex]?.title || "Audio Title"}
            </h2>
            <p className="text-muted-foreground">
              {tracks[currentTrackIndex]?.artist || "Person Name"}
            </p>
          </div>
          <div className="w-full">
            <Progress value={progress} className="w-full h-2 rounded-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handlePrevTrack}>
              <RewindIcon className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextTrack}>
              <RewindIcon className="w-6 h-6 rotate-180" />
            </Button>
          </div>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleNextTrack}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioPlayer;
