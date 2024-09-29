"use client"

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const WordCounter = () => {
  const [text, setText] = useState<string>("");



  const counter = () =>{
    const words = text.trim().split(/\s+/).filter((word) => word).length;

    const chars = text.length;

    return {
        wordCount: words,
        charCount: chars
    }
  }

  const clearText = () => {
    setText("");
  };


  const { wordCount, charCount } = counter();
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Text Analysis</CardTitle>
          <CardDescription>
            Enter text and see the word and character count.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your text here..."
            rows={5}
            value={text}
            onChange={(e)=> setText(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
            <p>{wordCount} words, {charCount} characters</p>
            <Button onClick={clearText}>Clear</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WordCounter;
