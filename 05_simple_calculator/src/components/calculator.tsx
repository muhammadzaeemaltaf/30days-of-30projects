"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CgMathDivide, CgMathMinus, CgMathPlus } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

const Calculator = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const add = (): void => setResult((parseFloat(num1) + parseFloat(num2)).toString());
  const subtract = (): void => setResult((parseFloat(num1) - parseFloat(num2)).toString());
  const multiply = (): void => setResult((parseFloat(num1) * parseFloat(num2)).toString());
  const divide = (): void => {
    if(parseFloat(num2) !== 0){
        setResult((parseFloat(num1) / parseFloat(num2)).toString());
    }else{
        setResult("Error: Division by zero");
    }
  }


  const clear = (): void => {
    setNum1("");
    setNum2("");
    setResult("");
  }
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-2xl font-bold">
          Simple Calculator
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex flex-col space-y-2 w-1/2">
              <Label htmlFor="num1" className="font-semibold text-sm">
                Number 1
              </Label>
              <Input
                type="number"
                id="num1"
                placeholder="Enter a number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 w-1/2">
              <Label htmlFor="num2" className="font-semibold text-sm">
                Number 2
              </Label>
              <Input
                type="number"
                id="num2"
                placeholder="Enter a number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="w-1/4 text-2xl rounded-xl font-bold"
              variant={"outline"}
              onClick={add}
            >
              <CgMathPlus />
            </Button>
            <Button
              className="w-1/4 text-2xl rounded-xl font-bold"
              variant={"outline"}
              onClick={subtract}
            >
              <CgMathMinus />
            </Button>
            <Button
              className="w-1/4 text-2xl rounded-xl font-bold"
              variant={"outline"}
              onClick={multiply}
            >
              <RxCross2 />
            </Button>
            <Button
              className="w-1/4 text-2xl rounded-xl font-bold"
              variant={"outline"}
              onClick={divide}
            >
              <CgMathDivide />
            </Button>
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="result" className="font-semibold text-sm">
              Result
            </Label>
            <Input
              type="text"
              id="result"
              placeholder="Result"
              defaultValue={result}
              readOnly
            />
          </div>

          <div>
            <Button
              className="w-full rounded-xl font-semibold text-white"
              variant={"destructive"}
              onClick={clear}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
