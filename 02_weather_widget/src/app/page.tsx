import WeatherWidget from "@/components/weather-widget";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black/80">
      <WeatherWidget />
    </main>
  );
}
