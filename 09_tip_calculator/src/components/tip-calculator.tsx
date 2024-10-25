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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TipCalculator = () => {
  const [bill, setBill] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculate = () => {
    if (bill !== null && tipPercentage !== null) {
      const amount = (tipPercentage / 100) * bill;
      setTip(amount);
      setTotal(bill + amount);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="rounded-xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm">Tip Calculator</CardTitle>
          <CardDescription className="text-sm">
            Enter the bill amount and tip percentage to calculate the tip and
            total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-bold">Bill Amount</Label>
              <Input
                type="number"
                placeholder="Enter Bill Amount"
                value={bill!}
                onChange={(e) => setBill(parseFloat(e.target.value))}
                className="border border-gray-400 rounded-xl text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Tip Percentage</Label>
              <Input
                type="number"
                placeholder="Enter Tip Percentage"
                value={tipPercentage!}
                onChange={(e) => setTipPercentage(parseFloat(e.target.value))}
                className="border border-gray-400 rounded-xl text-sm"
              />
            </div>
            <Button className="rounded-xl py-1.5" onClick={calculate}>
              Calculate
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col justify-between items-center gap-2 w-full ">
            <div className="flex justify-between items-center w-full">
              <span>Tip Amount</span>
              <span className="font-bold">${tip.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span>Total Amount</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TipCalculator;
