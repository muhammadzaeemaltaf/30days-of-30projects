import RandomUser from "@/components/random-user";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <RandomUser />
    </main>
  );
}
