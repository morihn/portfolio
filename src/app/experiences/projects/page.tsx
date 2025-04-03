import { ProjectsShowcase } from "@/components/projects-showcase"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        <div className="space-y-2 text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Portfolio</h1>
          <p className="mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 max-w-[700px]">
            Showcasing my professional work and creative concepts
          </p>
        </div>
        <ProjectsShowcase />
      </div>
    </main>
  )
}

