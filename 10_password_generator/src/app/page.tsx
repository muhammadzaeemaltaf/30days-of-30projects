import PasswordGenerator from "@/components/password-generator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <PasswordGenerator />
    </main>
  );
}
