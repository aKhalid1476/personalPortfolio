import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export const metadata = {
  title: "Experience — Abdullah Khalid",
  description: "A curated timeline of roles, teams, and problems that have shaped how I build software.",
};

export default function ExperiencePage() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-28 pb-24">
      <ExperienceTimeline />
    </main>
  );
}
