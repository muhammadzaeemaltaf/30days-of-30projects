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
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { predefinedHtml } from "./predefinedHtml";

const HtmlPreviewer = () => {
  const [htmlCode, setHtmlCode] = useState<string>(" ");
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center min-h-screen" >
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center ">
            <CardTitle className="text-2xl">HTML Previewer</CardTitle>
            <CardDescription className="text-base">Enter your HTML code and see the preview.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              rows={8}
              placeholder="Enter your HTML code here..."
            ></Textarea>
            <div className="flex justify-center gap-3">
              <Button onClick={() => setPreviewHtml(htmlCode)}>
                Generate Preview
              </Button>
              <Button onClick={() => setHtmlCode(predefinedHtml)}>
                Paste HTML
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div
              className="border w-full rounded-xl overflow-hidden"
              style={{ height: previewHtml === null ? "2rem" : "auto" }}
            >
              <div>
                {previewHtml && (
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HtmlPreviewer;
