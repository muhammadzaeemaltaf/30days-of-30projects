"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type LapTime = number;

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setLapTimes([]);
    setTime(0);
  };

  const handleLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const formatedTime = (tm: number) => {
    let minutes = Math.floor(tm / 60000);
    let seconds = Math.floor((tm % 60000) / 1000);
    let milliseconds = Math.floor((tm % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };


  return (
    <div className="max-w-lg w-full">
      <Card>
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-5xl font-bold">Stopwatch</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Track your time with this stopwatch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-8xl text-center font-bold">
            {formatedTime(time)}
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={isRunning ? handleStop : handleStart}
              className="px-6 py-2 text-lg font-medium rounded-2xl"
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              onClick={handleReset}
              className="px-6 py-2 text-lg font-medium rounded-2xl"
            >
              Reset
            </Button>
            <Button
              onClick={handleLap}
              className="px-6 py-2 text-lg font-medium rounded-2xl"
            >
              Lap
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Card>
              <CardHeader className="bg-gray-200">
                <CardTitle className="text-xl font-semibold">
                  Lap Times
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-auto p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Lap</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lapTimes.map((val, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-right">
                         {formatedTime(val)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StopWatch;
