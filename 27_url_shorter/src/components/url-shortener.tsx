"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import axios from "axios";

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleShortURL = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const response = await axios.post(
        BITLY_API_URL,
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response)
      setShortUrl(response.data.link); 
    } catch (error) {
      console.log(error)
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Successfully Copied the Short URL!");
  };

  return (
    <div className="w-full max-w-md">
      <div className="w-full bg-white rounded-xl shadow-lg p-7 space-y-5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          <p className="text-muted-foreground">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        <form onSubmit={handleShortURL}>
          <div className="grid grid-cols-[80%_auto] gap-2">
            <Input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="rounded-xl"
              required
            />
            <Button type="submit" className="rounded-xl ab">
              Shorten
            </Button>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}

          {shortUrl && (
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted/50"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UrlShortener;
