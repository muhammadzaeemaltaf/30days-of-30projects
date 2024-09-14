"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const conversionRates: Record<string, Record<string, number>> = {
    length: {
      "Millimeters (mm)": 1,
      "Centimeters (cm)": 10,
      "Meters (m)": 1000,
      "Kilometers (km)": 1000000,
      "Inches (in)": 25.4,
      "Feet (ft)": 304.8,
      "Yards (yd)": 914.4,
      "Miles (mi)": 1609344,
    },
    weight: {
      "Grams (g)": 1,
      "Kilograms (kg)": 1000,
      "Ounces (oz)": 28.3495,
      "Pounds (lb)": 453.592,
    },
    volume: {
      "Milliliters (ml)": 1,
      "Liters (l)": 1000,
      "Fluid Ounces (fl oz)": 29.5735,
      "Cups (cup)": 240,
      "Pints (pt)": 473.176,
      "Quarts (qt)": 946.353,
      "Gallons (gal)": 3785.41,
    },
  };

  const unitTypes: Record<string, string[]> = {
    length: [
      "Millimeters (mm)",
      "Centimeters (cm)",
      "Meters (m)",
      "Kilometers (km)",
      "Inches (in)",
      "Feet (ft)",
      "Yards (yd)",
      "Miles (mi)",
    ],
    weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
    volume: [
      "Milliliters (ml)",
      "Liters (l)",
      "Fluid Ounces (fl oz)",
      "Cups (cup)",
      "Pints (pt)",
      "Quarts (qt)",
      "Gallons (gal)",
    ],
  };

  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };

  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };

  const convertValue = () => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;
  
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          console.log(unitCategory)
          break;
        }
      }
  
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields.");
    }
  };
  

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Unit Converter</CardTitle>
          <CardDescription>
            Convert values between different units.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Select for input unit */}
            <div className="space-y-2">
              <Label htmlFor="input-unit">From</Label>
              <Select onValueChange={handleInputUnitChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select for output unit */}
            <div className="space-y-2">
              <Label htmlFor="output-unit">To</Label>
              <Select onValueChange={handleOutputUnitChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              type="number"
              id="value"
              placeholder="Enter value"
              onChange={(e) => setInputValue(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Button className="w-full" onClick={convertValue}>
              Convert
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold font-mono">
              {convertedValue !== null ? convertedValue.toFixed(2) : 0}
            </h1>
            <p className="text-muted-foreground">
              {convertedValue !== null && outputUnit ? outputUnit : "Unit"}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnitConverter;
