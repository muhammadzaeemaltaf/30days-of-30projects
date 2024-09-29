import WordCounter from "@/components/word-counter";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center bg-black min-h-screen">
   <WordCounter />
  </main>
  );
}
