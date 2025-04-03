"use client"

import { motion } from "framer-motion"
import type { SkillCategory as SkillCategoryType } from "@/data/skills-data"
import SkillBar from "./skill-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SkillCategoryProps {
  category: SkillCategoryType
  isActive: boolean
}

export default function SkillCategory({ category, isActive = true }: SkillCategoryProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <Card className="bg-white shadow-md border-slate-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{category.name}</CardTitle>
        <CardDescription className="text-slate-600">
          My proficiency in various {category.name.toLowerCase()} skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate={isActive ? "show" : "hidden"}
          className="grid gap-6 md:grid-cols-2"
        >
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}

