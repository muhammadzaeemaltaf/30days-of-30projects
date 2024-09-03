"use client";
import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [timeval, settimeval] = useState<number>(0);
  const [timer, settimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setDuration = (timeDuration: number): void => {
    if (Number.isNaN(timeDuration)) {
      timeDuration = 0;
    }
    settimer(timeDuration);
  };

  const startTimer = () => {
    if (timer > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setDuration(timeval);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      console.log("start");

      timerRef.current = setInterval(() => {
        settimer((timeLeft) => {
          if (timeLeft <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          // Decrease the time left by one second
          return timeLeft - 1;
        });
      }, 1000);
    }
    // Cleanup function to clear the interval
  }, [isActive, isPaused]);

  const timeFormat = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-gray-800 bg-gray-100">
      <div className="flex flex-col items-center gap-5 bg-white rounded-xl p-10 shadow-lg">
        <h1 className="font-bold text-2xl">Countdown Timer</h1>
        <div className="flex items-center gap-4 text-sm">
          <input
            type="number"
            className="w-80 border border-gray-300 rounded-2xl shadow-sm outline-none px-2 py-2"
            placeholder="Enter duration in seconds"
            onChange={(e) => {
              settimeval(parseInt(e.target.value));
            }}
          />
          <button
            className="border border-gray-300 px-4 py-2 rounded-2xl text-black hover:bg-gray-100 active:bg-gray-300"
            onClick={() => {
              setDuration(timeval);
              if (isActive) {
                setIsActive(false);
              }
              if (timerRef.current) {
                clearInterval(timerRef.current);
              }
            }}
          >
            Set
          </button>
        </div>
        <div className="time font-bold text-6xl">{timeFormat(timer)}</div>
        <div className="text-sm text-black flex gap-4 pt-2">
          <button
            className="border border-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-100 active:bg-gray-300"
            onClick={startTimer}
          >
            {isPaused ? "Resume" : "Start"}
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-100 active:bg-gray-300"
            onClick={pauseTimer}
          >
            Pause
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-100 active:bg-gray-300"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
};

export default Timer;
