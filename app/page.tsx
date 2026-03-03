import { Hero } from "@/components/Hero";
import { Bio } from "@/components/Bio";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <Hero />
      <Bio />
    </main>
  );
}
