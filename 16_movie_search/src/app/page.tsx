import MovieSearch from "@/components/movie-search";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex items-center justify-center bg-gray-100 min-h-screen">
        <MovieSearch />
      </main>
  );
}
