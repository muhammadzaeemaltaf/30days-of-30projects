import BirthdayWish from "@/components/birthday-wish";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-col-1 items-center justify-items-center min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <BirthdayWish />
    </div>
  );
}
