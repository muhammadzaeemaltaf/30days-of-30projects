import Numberguessing from "@/components/number-guessing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      <Numberguessing />
    </main>
  );
}
