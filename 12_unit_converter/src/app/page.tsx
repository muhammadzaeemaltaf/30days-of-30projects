import UnitConverter from "@/components/unit_converter";
import Image from "next/image";

export default function Home() {
  return (
      <main className="flex justify-center items-center h-screen bg-gray-100">
          <UnitConverter />
      </main>
  );
}
