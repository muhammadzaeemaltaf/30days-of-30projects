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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import {
  ExternalLinkIcon,
  ForkliftIcon,
  GitForkIcon,
  GithubIcon,
  LocateIcon,
  RecycleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Profile {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
}

interface Repos {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

const GithubProfile = () => {
  const [username, setUsername] = useState<string>("");
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [userRepos, setUserRepos] = useState<Repos[]>([]);
  const [visibleRepos, setVisibleRepos] = useState<Repos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const reposPerLoad = 6;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileFetching = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!profileFetching.ok) {
        setError("User not found");
        throw new Error("User not found");
      }

      const profilesRes = await profileFetching.json();

      if (profilesRes) {
        const reposFetching = await fetch(
          `https://api.github.com/users/${username}/repos`
        );

        if (!reposFetching.ok) {
          setError("Repositories not found");
          throw new Error("Repositories not found");
        }

        const reposRes = await reposFetching.json();

        setUserProfile(profilesRes);
        setUserRepos(reposRes);
        setVisibleRepos(reposRes.slice(0, reposPerLoad));
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setUserProfile(null);
      setUserRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError(null);
    fetchData();
  };

  const loadMoreRepos = () => {
    setLoading(true);
    const newMoreRepos = userRepos!.slice(
      0,
      visibleRepos.length + reposPerLoad
    );
    setVisibleRepos(newMoreRepos);
    setLoading(false);
  };
  return (
    <div className="w-full max-w-3xl">
      <Card className="md:p-5">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">GitHub Profile Viewer</CardTitle>
          <CardDescription className="text-muted-foreground">
            Search for a GitHub username and view their profile and
            repositories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center flex-col min-[320px]:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter a Github username"
                className="rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button disabled={loading} type="submit">
                {loading ? <ClipLoader size={20} color="#ffffff" /> : "Search"}
              </Button>
            </div>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {loading ? (
            <div className="mt-4 flex justify-center">
              <ClipLoader className="w-12 h-12" />
            </div>
          ) : (
            !error &&
            userProfile && (
              <>
                <div className="my-5 grid  sm:grid-cols-[120px_1fr] md:gap-8 md:px-4">
                  <Avatar className="h-28 w-28 md:h-32 md:w-32 border">
                    <AvatarImage src={userProfile.avatar_url} />
                    <AvatarFallback>
                      {userProfile.login.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-between items-start gap-2 py-3">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-2xl font-bold">
                        {userProfile.login}
                      </h2>
                      <Link
                        aria-label="View GitHub profile"
                        href={userProfile.html_url}
                        target="_blank"
                        className="text-black"
                        prefetch={false}
                      >
                        <ExternalLinkIcon className="w-5 h-5" />
                      </Link>
                    </div>
                    <p className="text-gray-600">{userProfile.bio}</p>
                    <div className="flex items-center flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>{userProfile.followers} Followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>{userProfile.following} Following</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LocateIcon className="w-4 h-4" />
                        <span>{userProfile.location || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* // user repositories section */}
                <div>
                  <h3 className="text-xl font-bold">Repositories</h3>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {visibleRepos.length > 0
                      ? visibleRepos.map((repo) => (
                          <Card
                            key={repo.id}
                            className="shadow-md bg-white border flex flex-col justify-between w-[86vmin] mx-auto sm:mx-0 sm:w-auto"
                          >
                            <CardHeader>
                              <div className="flex items-center gap-2">
                                <RecycleIcon className="w-6 h-6" />
                                <CardTitle className="w-11/12 truncate">
                                  <Link
                                    href={repo.html_url}
                                    target="_blank"
                                    className="hover:underline"
                                    prefetch={false}
                                  >
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger className="truncate w-full text-start">
                                          {repo.name}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{repo.name}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </Link>
                                </CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 line-clamp-3 sm:line-clamp-2 px-4 sm:px-0">
                                {repo.description || "No description"}
                              </p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <StarIcon className="w-4 h-4" />
                                <span>{repo.stargazers_count}</span>
                                {/* <ForkliftIcon className="w-4 h-4" /> */}
                                <GitForkIcon className="w-4 h-4" />
                                <span>{repo.forks_count}</span>
                              </div>
                              <Link
                                href={repo.html_url}
                                target="_blank"
                                className="hover:underline flex items-center gap-2 text-sm group"
                                prefetch={false}
                              >
                                <span className="hidden min-[300px]:inline">
                                  View on Github
                                </span>
                                <GitHubLogoIcon className="w-5 h-5 mb-1 duration-100 transition-all group-hover:text-[#6e5494]" />
                              </Link>
                            </CardFooter>
                          </Card>
                        ))
                      : visibleRepos.length === 0 && (
                          <p className="font-bold">No repositories found.</p>
                        )}
                  </div>
                  {userRepos && visibleRepos.length < userRepos.length && (
                    <div className="flex justify-center mt-6">
                      <Button onClick={loadMoreRepos} className="w-fit">
                        {loading ? (
                          <ClipLoader size={20} color="#fffff" />
                        ) : (
                          "Load More"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GithubProfile;
