import { ProjectsShowcase } from "@/components/ProjectsShowcase";

export const metadata = {
  title: "Projects — Abdullah Khalid",
  description: "A selection of projects I've built.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24">
      <ProjectsShowcase />
    </main>
  );
}
