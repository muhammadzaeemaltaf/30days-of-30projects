"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Numberguessing = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameover, setGameover] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]);

  const startGame = () => {
    setGameStarted(true);
    setGameover(false);
    setPaused(false);
    setAttempts(0);
  };

  const pauseGame = () => setPaused(true);
 

  const resumeGame = () => setPaused(false);

  const setGuess = () => {
    if (typeof userGuess === "number" && !userGuess || Number.isNaN(userGuess)) {
      alert("Please enter a valid number.");
      return;
    }

    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameover(true);
    } else {
      setAttempts(attempts + 1);
    }
  };

  const playagain = () => {
    setGameStarted(false);
    setGameover(false);
    setUserGuess("");
    setAttempts(0);
  };

  return (
    <div className="bg-white p-8 text-center rounded-2xl">
      <h1 className="font-bold text-3xl">Number Guessing Game</h1>
      <p className="font-semibold my-2">
        Try to guess the number between 1 and 10!
      </p>

      {!gameStarted && (
        <Button
          className="bg-black text-white rounded-lg my-4 hover:bg-black/60 active:bg-black/80"
          onClick={startGame}
        >
          Start Game
        </Button>
      )}

      {gameStarted && !gameover && (
        <div>
          {!paused ? (
            <Button
              className="bg-black/50 text-white rounded-lg my-2 hover:bg-black/60 active:bg-black/80"
              onClick={pauseGame}
            >
              Pause
            </Button>
          ) : (
            <Button
              className="bg-black/50 text-white rounded-lg my-2 hover:bg-black/60 active:bg-black/80"
              onClick={resumeGame}
            >
              Resume
            </Button>
          )}

          <div className="flex justify-center items-center gap-3">
            <Input
              type="number"
              value={userGuess}
              disabled={paused}
              placeholder="Enter your guess"
              className="outline-none border-gray-300 bg-gray-100 rounded-lg w-10/12"
              onChange={(e) => setUserGuess(parseInt(e.target.value))}
            />

            <Button
              className="bg-black text-white rounded-lg my-4 hover:bg-black/60 active:bg-black/80"
              onClick={setGuess}
              disabled={paused}
            >
              Guess
            </Button>
          </div>

          <div>Attempts: {attempts}</div>
        </div>
      )}

      {gameover && (
        <div>
          <h2 className="font-bold text-2xl">Game Over!</h2>
          <p className="my-2">You guessed the number in {attempts} attempts.</p>
          <Button
            className="bg-red-500 text-white rounded-lg my-2 hover:bg-red-500/60 active:bg-red-500/80"
            onClick={playagain}
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default Numberguessing;
