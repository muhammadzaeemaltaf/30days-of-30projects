/* eslint-disable */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
  amPm: string;
}


const DigitalClock = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeFormat = useMemo<Time | null>(() => {
    if (!mounted) return null;

    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    const amPm = is24Hour ? "" : time.getHours() >= 12 ? "PM" : "AM";

    return { hours, minutes, seconds, amPm };
  }, [time, is24Hour, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Card className="flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Digital Clock</CardTitle>
          <CardDescription className="font-semibold">
            Display current time in hours, minutes, and seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-6xl tracking-tighter">
            {timeFormat!.hours}:{timeFormat!.minutes}:{timeFormat!.seconds}{" "}
            {!is24Hour && (
              <span className="text-3xl -ml-2">{timeFormat!.amPm}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button
            variant={is24Hour ? "default" : "outline"}
            onClick={() => setIs24Hour(true)}
          >
            24-Hour Format
          </Button>
          <Button
            variant={!is24Hour ? "default" : "outline"}
            onClick={() => setIs24Hour(false)}
          >
            12-Hour Format
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DigitalClock;
