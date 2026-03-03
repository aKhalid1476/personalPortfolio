import { Hero } from "@/components/Hero";
import { Bio } from "@/components/Bio";

export default function Home() {
  return (
    <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-24">
      <Hero />
      <Bio />
    </main>
  );
}
