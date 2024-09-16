"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RefreshCwIcon,
} from "lucide-react";

type CurrentSection = "idle" | "running" | "paused";
type SessionType = "work" | "break";

interface PomodoroState {
  workDuration: number;
  breakDuration: number;
  currentTime: number;
  currentSession: SessionType;
  timerStatus: CurrentSection;
}

const PomodoroTimer = () => {
  const [state, setState] = useState<PomodoroState>({
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    currentTime: 25 * 60,
    currentSession: "work",
    timerStatus: "idle",
  });

  useEffect(() => {
    if (state.timerStatus === "running" && state.currentTime > 0) {
      timerRef.current = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          currentTime: prevState.currentTime - 1,
        }));
      }, 1000);
    } else if (state.currentTime === 0) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      handleSessionSwitch()
    }
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [state.timerStatus, state.currentTime]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
console.log(state.currentSession)

  const handleSessionSwitch = () => {
    setState((prevstate) => {
      const isWorkSession = prevstate.currentSession === "work";
      return {
        ...prevstate,
        currentSession: isWorkSession ? "break" : "work",
        currentTime: isWorkSession
          ? prevstate.breakDuration
          : prevstate.workDuration,
      };
    });
  };

  const handleStartPause = () => {
    if (state.timerStatus === "running") {
      setState((prevState) => ({
        ...prevState,
        timerStatus: "paused",
      }));
      clearInterval(timerRef.current as NodeJS.Timeout);
    } else {
      setState((prevState) => ({
        ...prevState,
        timerStatus: "running",
      }));
    }
  };

  const handleDurationChange = (
    type: SessionType,
    increment: boolean
  ): void => {
    setState((prevState) => {
      const durationChange = increment ? 60 : -60;
      if (type === "work") {
        return {
          ...prevState,
          workDuration: Math.max(60, prevState.workDuration + durationChange),
          currentTime:
            prevState.currentSession === "work"
              ? Math.max(60, prevState.workDuration + durationChange)
              : prevState.currentTime,
        };
      } else {
        return {
          ...prevState,
          breakDuration: Math.max(60, prevState.breakDuration + durationChange),
          currentTime:
            prevState.currentSession === "break"
              ? Math.max(60, prevState.breakDuration + durationChange)
              : prevState.currentTime,
        };
      }
    });
  };

  const handleReset = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setState((prevState) => ({
      ...prevState,
      currentTime: prevState.workDuration,
      currentSession: "work",
      timerStatus: "idle",
    }));
  };

  const formatTime = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSecond = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSecond
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md">
      <Card className="flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
          <CardDescription className="text-center">
            A timer for the Pomodoro Technique.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-2xl font-medium text-center">
            <span
              className={`text-${
                state.currentSession === "work" ? "primary" : "secondary"
              }`}
            >
              {state.currentSession === "work" ? "Work" : "Break"}
            </span>
          </div>
          <div className="text-8xl font-bold flex items-end">
            {formatTime(state.currentTime)} <p className="text-sm pb-4">{state.timerStatus}</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* Buttons to change duration, start/pause, and reset timer */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDurationChange("work", false)}
            >
              <MinusIcon className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDurationChange("work", true)}
            >
              <PlusIcon className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleStartPause()}
            >
              {state.timerStatus === "running" ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleReset()}>
              <RefreshCwIcon className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
