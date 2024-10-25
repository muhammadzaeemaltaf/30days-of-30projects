import RandomJoke from "@/components/random-joke";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-br from-[#ffa500] to-[#ff6b6b]">
      <RandomJoke />
    </main>
  );
}
