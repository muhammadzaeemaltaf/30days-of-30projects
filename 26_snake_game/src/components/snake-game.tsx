"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon, RefreshCcwIcon } from "lucide-react";

enum GameState {
  START,
  PAUSE,
  RUNNING,
  GAME_OVER,
}

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface Position {
  x: number;
  y: number;
}

const initialSnake: Position[] = [{ x: 0, y: 0 }];
const initialFood: Position = { x: 5, y: 5 };

const SnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(initialFood);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  const moveSnake = useCallback(() => {
    setSnake((prev) => {
      const newSnake = [...prev];
      const head = newSnake[0];
      let newHead: Position;

      switch (direction) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 };
          break;

        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y };
          break;

        default:
          return newSnake;
      }

      if (
        newHead.x < 0 ||
        newHead.x >= 10 ||
        newHead.y < 0 ||
        newHead.y >= 10
      ) {
        setGameState(GameState.GAME_OVER);

        return prev;
      }

      if (
        newSnake.some((part) => part.x === newHead.x && part.y === newHead.y)
      ) {
        setGameState(GameState.GAME_OVER);

        return prev;
      }

      newSnake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 10),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== Direction.DOWN) setDirection(Direction.UP);
          break;
        case "ArrowDown":
          if (direction !== Direction.UP) setDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
          break;
      }
    },
    [direction]
  );

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      const speed = Math.max(100, 300 - score * 6);
      console.log(speed)
      gameInterval.current = setInterval(moveSnake, speed);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, moveSnake, handleKeyPress]);

  const startGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setDirection(Direction.RIGHT);
    setGameState(GameState.RUNNING);
  };

  const pauseGame = () => {
    setGameState(
      gameState === GameState.RUNNING ? GameState.PAUSE : GameState.RUNNING
    );
  };

  const resetGame = () => {
    setGameState(GameState.START);
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    if (savedScore) {
      setHighScore(parseInt(savedScore));
    }

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("score", score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="max-w-md w-full bg-[#1E1E1E] rounded-lg shadow-lg p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#FF00FF]">Snake Game</h1>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#00FFFF]"
            onClick={startGame}
          >
            <PlayIcon className="w-6 h-6" />
            <span className="sr-only">Start</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#00FFFF]"
            onClick={pauseGame}
          >
            <PauseIcon className="w-6 h-6" />
            <span className="sr-only">Pause/Resume</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#00FFFF]"
            onClick={resetGame}
          >
            <RefreshCcwIcon className="w-6 h-6" />
            <span className="sr-only">Reset</span>
          </Button>
        </div>
      </div>

      <div className="bg-[#0F0F0F] rounded-xl p-4 grid grid-cols-10 gap-1 place-items-center mx-4">
        {gameState === GameState.GAME_OVER ? (
          <h1 className="col-span-10 text-center text-red-500 text-3xl font-bold">
            Game Over
          </h1>
        ) : (
          Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10;
            const y = Math.floor(i / 10);
            const isSnakePart = snake.some(
              (part) => part.x === x && part.y === y
            );
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={i}
                className={`w-5 h-5 rounded-full ${
                  isSnakePart ? "bg-[#FF00FF]" : isFood ? "bg-[#00FFFF]" : ""
                }`}
              />
            );
          })
        )}
      </div>

      <div className="flex justify-between items-center text-[#00FFFF] mt-6">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
    </div>
  );
};

export default SnakeGame;
