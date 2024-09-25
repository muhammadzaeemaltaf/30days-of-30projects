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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";

type ExchangeRates = {
  [key: string]: number;
};

type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "PKR";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [sourceCurrency, setSourceCurrency] = useState<Currency>("USD");
  const [targetCurrency, setTargetCurrency] = useState<Currency>("PKR");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [error, setError] = useState<string | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<string>("0.00");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const rates = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const res = await rates.json();
      setExchangeRates(res.rates);
    } catch (err) {
      setError("Error fetching exchange rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const calculateAmount = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (amount && sourceCurrency && targetCurrency && exchangeRates) {
      const baseAmount =
        sourceCurrency === "USD"
          ? exchangeRates[targetCurrency]
          : exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
      const convertedAmount = amount * baseAmount;
      setConvertedAmount(convertedAmount.toFixed(2));
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="p-5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Currency Converter</CardTitle>
          <CardDescription>
            Convert between different currencies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader className="w-6 h-6 text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-[1fr_auto] justify-center items-center gap-3">
                <Label htmlFor="input">From</Label>
                <div className="grid grid-cols-[1fr_auto] justify-center items-center gap-2">
                  <Input
                    type="number"
                    id="input"
                    placeholder="Amount"
                    value={amount || " "}
                    autoComplete="off"
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                  <Select
                    value={sourceCurrency}
                    onValueChange={(value: Currency) =>
                      setSourceCurrency(value)
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="EUR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="PKR">PKR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] justify-center items-center gap-3">
                <Label>To</Label>
                <div className="flex justify-center items-center gap-3">
                  <div className="text-2xl font-bold">{convertedAmount}</div>
                  <Select
                    value={targetCurrency}
                    onValueChange={(value: Currency) =>
                      setTargetCurrency(value)
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="EUR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="PKR">PKR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Button
                  className="w-full rounded-2xl"
                  onClick={calculateAmount}
                >
                  Convert
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyConverter;
