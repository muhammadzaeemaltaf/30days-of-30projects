"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

interface BmiResult {
  bmi: string;
  category: string;
}

const BmiCalculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [err, setErr] = useState<string>("");

  const calculateBMI = () => {
    if (!height || !weight) {
      setErr("Please enter both height and weight.");
      setResult(null); 
      return;
    }

    const heightInMeter = parseFloat(height) / 100;

    if (heightInMeter <= 0) {
      setErr("Height must be a positive number.");
      setResult(null); 
      return;
    }

    const weightInKg = parseFloat(weight);

    if (weightInKg <= 0) {
      setErr("Weight must be a positive number.");
      setResult(null); 
      return;
    }

    const BMI = weightInKg / (heightInMeter * heightInMeter);

    let category = "";

    if (BMI < 18.5) {
      category = "Underweight";
    } else if (BMI >= 18.5 && BMI < 25) {
      category = "Normal";
    } else if (BMI >= 25 && BMI < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: BMI.toFixed(1), category: category });
    setErr(""); 
  };

  return (
    <div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <br />
            </div>
            <Button onClick={calculateBMI}>Calculate</Button>
          </div>
        </CardContent>

        <CardFooter>
          {/* Error Display */}
            {err && (
              <div className="flex justify-center w-full" style={{ color: "red" }}>
                {err}
              </div>
            )}

          {/* BMI Result Display */}
          {result && (
            <div className="flex justify-center items-center w-full flex-col">
              <div style={{ fontSize: "1.5rem" , fontWeight: 600}}>
                {result.bmi}
              </div>
              <div className="text-muted-foreground">{result.category}</div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BmiCalculator;
