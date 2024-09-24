"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import html2canvas from "html2canvas";
import { Input } from "./ui/input";

interface Meme {
  id: string;
  name: string;
  url: string;
}

interface Position {
  x: number;
  y: number;
}

const MemeGenerator = () => {
  const [memes, setMemes] = useState<Meme[] | null>(null);
  const [visibleMemes, setVisibleMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [textPosition, setTextPosition] = useState<Position>({ x: 0, y: 0 });
  const [err, setErr] = useState<string | null>(null);
  const memesPerLoad = 10;
  const memeRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const loadMeme = async () => {
    setLoading(true);
    try {
      let fetchData = await fetch("https://api.imgflip.com/get_memes");
      let res = await fetchData.json();
      if (res.success === true) {
        setLoading(false);
        setMemes(res.data.memes);
        setVisibleMemes(res.data.memes.slice(0, memesPerLoad));
      setErr(null);
      } else {
        setErr("Failed to Fetch");
      }
    } catch (err) {
      setErr("Failed to Fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeme();
  }, []);

  const loadMoreMemes = () => {
    setLoading(true);
    const newMoreMemes = memes!.slice(0, visibleMemes.length + memesPerLoad);
    setVisibleMemes(newMoreMemes);
    setLoading(false);
  };

  const handleDownload = async (): Promise<void> => {
    if (memeRef.current) {
      const canvas = await html2canvas(memeRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      link.click();
    }
  };


  const onDrag = () => {
    isDraggingRef.current = true;
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setTextPosition({ x: data.x, y: data.y });
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Meme Generator</h1>
        <p className="text-muted-foreground font-semibold">
          Create custom memes with our easy-to-use generator.
        </p>

        <div className="flex flex-col justify-center items-center">
      {err && (
        <div className="text-red-600 text-4xl font-bold mt-4">
          {err}
        </div>
      )}

          {loading ? (
            <ClipLoader className="w-12 h-12 text-blue-500" />
          ) : (
            <>
              <div className="meme columns-2 lg:columns-3 gap-4">
                {visibleMemes.map((meme) => (
                  <div
                    key={meme.id}
                    className="mb-4 cursor-pointer"
                    onClick={() => setSelectedMeme(meme)}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <Image
                          src={meme.url}
                          alt={meme.name}
                          width={300}
                          height={300}
                          layout="responsive"
                          objectFit="cover"
                          className="rounded"
                        />
                      </CardContent>
                      <CardFooter className="bg-gray-200">
                        <p className="text-center w-full">{meme.name}</p>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>

              {memes && visibleMemes.length < memes.length && (
                <Button onClick={loadMoreMemes} className="w-fit mt-6">
                  Load More
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {selectedMeme && (
        <Dialog
          open={!!selectedMeme}
          onOpenChange={() => setSelectedMeme(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customize Your Meme</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-[40%_auto] gap-4 items-center">
              {selectedMeme && (
                <div>
                  <div className="relative flex justify-center overflow-hidden">
                    <img
                      src={selectedMeme.url}
                      alt={selectedMeme.name}
                      className="object-contain w-full"
                    />

                    <Draggable onDrag={handleDrag}>
                      <div
                        className="absolute cursor-pointer font-bold"
                        style={{
                          left: `${textPosition.x}px`,
                          top: `${textPosition.y}px`,
                          color: textColor,
                        }}
                      >
                        {text}
                      </div>
                    </Draggable>
                  </div>
                </div>
              )}
              <div className="mt-4 space-y-3">
                <div>
                  <Label htmlFor="meme-text">Add your text</Label>
                  <Textarea
                    id="meme-text"
                    placeholder="Enter your meme text"
                    className="mt-1 w-full"
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="color">Pick your text color</Label>
                  <Input
                    id="color"
                    type="color"
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>

                <Button className="w-full mt-4" onClick={handleDownload}>
                  Download Meme
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MemeGenerator;
