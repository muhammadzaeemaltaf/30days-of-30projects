"use client";

import React, { use, useState } from "react";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { InfoIcon, MailIcon, MapPinIcon, UserIcon } from "lucide-react";
import { CSSTransition } from "react-transition-group";

interface User {
  name: string;
  email: string;
  address: string;
  image: string;
  description: string;
}

const RandomUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appreciationVisible, setAppreciationVisible] =
    useState<boolean>(false);

  const fetchRandomUser = async () => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const req = await fetch(`https://randomuser.me/api/`);
      const res = await req.json();
      console.log(res);
      const fetchedUser = res.results[0];

      const data: User = {
        name: `${fetchedUser.name.first} ${fetchedUser.name.last}`,
        email: fetchedUser.email,
        address: `${fetchedUser.location.street.number} ${fetchedUser.location.street.name}, ${fetchedUser.location.city}, ${fetchedUser.location.country}`,
        image: fetchedUser.picture.large,
        description: fetchedUser.login.uuid,
      };
      setUser(data);
    } catch (error) {
      setError("Failed to fetch user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppreciate = () => {
    setAppreciationVisible(true);
    setTimeout(() => setAppreciationVisible(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-md w-full">
      <h1 className="text-3xl font-bold mb-4">Random User Generator</h1>
      <p className="text-muted-foreground mb-6">
        Click the button below to fetch a random user profile.
      </p>
      <Button onClick={fetchRandomUser} className="mb-6" disabled={loading}>
        Fetch New User
      </Button>
      {loading && (
        <div className="flex items-center justify-center space-x-2">
          <ClipLoader className="w-6 h-6" />
          <span>Loading...</span>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {user && (
        <Card className="max-w-md w-full relative overflow-hidden">
          <CardHeader className="h-32 bg-gray-600 relative">
            <Image
              src={user.image}
              alt={`Profile picture of ${user.name}`}
              height={100}
              width={100}
              className="rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
            />
          </CardHeader>
          <CardContent className="px-6 pt-16 text-center space-y-3">
            <CardTitle className="flex items-start justify-center gap-2 text-xl">
              <UserIcon /> {user.name}
            </CardTitle>
            <CardDescription className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-end justify-center gap-2">
                <MailIcon /> {user.email}
              </div>
              <div className="flex items-end justify-center gap-2">
                <MapPinIcon /> {user.address}
              </div>
              <div className="flex items-end justify-center gap-2">
                <InfoIcon /> {user.description}
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="outline"
              className="mt-4 mx-auto"
              aria-label="Show appreciation message"
              onClick={handleAppreciate}
            >
              Appreciate
            </Button>

            <CSSTransition
              in={appreciationVisible}
              timeout={2000}
              classNames="appreciation"
              unmountOnExit
            >
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75">
                <h2 className="text-2xl font-bold text-black">
                  ❤️ Thank you ✨
                </h2>
              </div>
            </CSSTransition>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default RandomUser;
