import ImageSlider from "@/components/image-slider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center min-h-screen">
      <ImageSlider />
    </main>
  );
}
