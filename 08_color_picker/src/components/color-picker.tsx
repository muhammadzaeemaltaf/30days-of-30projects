/* eslint-disable */

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
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ColorPicker = () => {
  const [color, setColor] = useState<string>("#000000");
  const [isCopied, setCopied] = useState<boolean>(false);

  const RGBColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopied(false);
    }
  };
  return (
    <div className="w-full max-w-md text-center">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Color Picker</CardTitle>
          <CardDescription>
            Select a color and copy the hex and RGB values.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div
            className="h-44 rounded-lg w-full border-4 border-gray-200"
            style={{ backgroundColor: color }}
          ></div>
          <h2 className="font-bold text-3xl my-2">{color}</h2>
          <h2 className="text-md text-gray-500">RBG: {RGBColor(color)}</h2>
          <Button
            onClick={copyToClipboard}
            className="w-full py-1 rounded-full mt-4"
          >
            {isCopied ? "Copied" : "Copy to Clipboard"}
          </Button>
        </CardContent>
        <CardFooter>
          <Input
            type="color"
            className="py-0 px-1 cursor-pointer w-full h-14 border-0"
            onChange={(e) => {
              setColor(e.target.value);
              setCopied(false);
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ColorPicker;
