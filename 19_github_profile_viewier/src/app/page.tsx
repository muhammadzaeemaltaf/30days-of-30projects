import GithubProfile from "@/components/github-profile";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <GithubProfile />
  </main>
  );
}
