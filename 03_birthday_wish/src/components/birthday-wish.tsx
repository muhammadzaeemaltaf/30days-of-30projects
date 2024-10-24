/* eslint-disable */

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";
import { Button } from "./ui/button";
import ReactConfetti from "react-confetti";

const candleColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const balloonColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

interface Confetti {
  width: number;
  height: number;
}

const BirthdayWish = () => {
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [windowDimension, setDimension] = useState<Confetti>({
    width: 0,
    height: 0,
  });
  const [showConfetti, setConfetti] = useState<boolean>(false);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0);
  const [celebrating, setCelebrating] = useState<boolean>(false);

  const totalCandles: number = 5;

  const confettiFunc = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    confettiFunc();
    window.addEventListener("resize", confettiFunc);
    return () => {
      window.removeEventListener("resize", confettiFunc);
    };
  }, [windowDimension]);

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount((prev) => prev + 1);
    }
  };
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((prev) => prev + 1);
    }
  };

  const celebrate = () => {
    setCelebrating(true);
    setConfetti(true);
    const interval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
    setTimeout(() => {
    setConfetti(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-md text-center">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      )}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-5xl">Happy Birthday!</CardTitle>
          <CardDescription className="text-2xl font-semibold">
            Zaeem Altaf
          </CardDescription>
          <p className="text-lg text-gray-500">April 30th</p>
        </CardHeader>
        <CardContent>
          <div className="mb-5">
            <h4 className="text-lg font-semibold text-black mb-2">
              Light the candles:
            </h4>
            <div className="flex justify-center space-x-2">
              {candleColors.map((val, i) => {
                return (
                  <>
                      {(celebrating && i <= candlesLit) ||
                      (!celebrating && i < candlesLit) ? (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: celebrating ? i * 0.5 : 0,
                          }}
                        >
                          <FaBirthdayCake
                            key={i}
                            className={`text-3xl transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                            style={{
                              color: candleColors[i % candleColors.length],
                            }}
                            onClick={() => lightCandle(i)}
                          />
                        </motion.div>
                      ) : (
                        <FaBirthdayCake
                        key={i}
                          className={`text-3xl text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          onClick={() => lightCandle(i)}
                        />
                      )}
                  </>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black mb-2">
              Pop the balloons:
            </h4>
            <div className="flex justify-center space-x-2">
              {balloonColors.map((val, i) => {
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 1 }}
                    animate={{ scale: i < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      key={i}
                      className="text-3xl duration-300 ease-in-out cursor-pointer hover:scale-110"
                      style={{ color: val }}
                      onClick={() => popBalloon(i)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={celebrate} disabled={celebrating}>
            Celebrate <FaGift className="ml-3"/>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BirthdayWish;


