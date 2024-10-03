import SnakeGame from "@/components/snake-game";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]">
      <SnakeGame />
    </main>
  );
}
