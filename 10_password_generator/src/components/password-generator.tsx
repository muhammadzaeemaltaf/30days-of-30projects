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
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const generatePassword = () => {
    setIsCopied(false);

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let pass = "";

    if (includeUppercase) pass += uppercaseChars;
    if (includeLowercase) pass += lowercaseChars;
    if (includeNumbers) pass += numberChars;
    if (includeSymbols) pass += symbolChars;

    if (pass === "") {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomPassword = Math.floor(Math.random() * pass.length);
      generatedPassword += pass[randomPassword];
      setPassword(generatedPassword);
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard!");
        setIsCopied(true);
      },
      (err) => {
        alert("Failed to copy password to clipboard.");
        setIsCopied(false);
      }
    );
  };

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Password Generator</CardTitle>
          <CardDescription>
            Create a secure password with just a few clicks.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Label htmlFor="input">Password Length</Label>
          <Input
            id="input"
            type="number"
            value={length}
            min={8}
            max={32}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="rounded-xl"
          />

          <div className="space-y-2 my-4">
            <Label>Include:</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={() => setIncludeUppercase(!includeUppercase)}
              />
              <Label htmlFor="uppercase">Uppercase Letters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={() => setIncludeLowercase(!includeLowercase)}
              />
              <Label htmlFor="lowercase">Lowercase Letters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <Label htmlFor="numbers">Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={() => setIncludeSymbols(!includeSymbols)}
              />
              <Label htmlFor="symbols">Symbols</Label>
            </div>
          </div>

          <Button
            className="w-full rounded-xl font-bold"
            onClick={generatePassword}
          >
            Generate Password
          </Button>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <Label htmlFor="pass">Generated Password</Label>
            <div className="flex gap-2 items-center justify-center">
              <Input
                type="text"
                placeholder="Password will show here"
                className="rounded-xl w-full"
                value={password}
                readOnly
              />
              <Button className="rounded-xl font-bold" onClick={copyPassword}
                disabled={password === ""}
              >
                {isCopied ? "Copied to Clipboard" : "Copy to Clipboard"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
