import MemeGenerator from "@/components/meme-generator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <MemeGenerator />
    </main>
  );
}
