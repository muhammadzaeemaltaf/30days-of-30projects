import TipCalculator from "@/components/tip-calculator";
import Image from "next/image";

export default function Home() {
  return (
      <main className="h-screen flex justify-center items-center bg-gray-100">
        <TipCalculator />
      </main>

  );
}
