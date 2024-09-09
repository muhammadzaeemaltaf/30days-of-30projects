import DigitalClock from "@/components/digital-clock";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex h-screen items-center justify-center">
       <DigitalClock />
      </main>
  );
}
