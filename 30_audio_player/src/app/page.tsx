import AudioPlayer from "@/components/audio-player";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-black">
   <AudioPlayer />
  </main>
  );
}
