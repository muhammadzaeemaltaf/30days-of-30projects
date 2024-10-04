import UrlShortener from "@/components/url-shortener";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-primary to-secondary">
      <UrlShortener />
    </main>
  );
}
