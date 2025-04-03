import SkillsSection from "@/components/skills-section"
import { skillsData } from "@/data/skills-data"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">My Skills</h1>
        <p className="text-lg text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          A comprehensive overview of my professional capabilities and expertise across various domains.
        </p>
        <SkillsSection skillsData={skillsData} />
      </div>
    </main>
  )
}

