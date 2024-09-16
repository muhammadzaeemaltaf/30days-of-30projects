import PomodoroTimer from "@/components/pomodoro-timer";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex items-center justify-center h-screen bg-gray-100">
     <PomodoroTimer />
      </main>

  );
}
