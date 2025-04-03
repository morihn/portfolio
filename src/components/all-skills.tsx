"use client";

import { motion } from "framer-motion";
import SkillBar from "@/components/skill-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExtendedSkill {
  name: string;
  level: number;
  category: string;
}

interface AllSkillsProps {
  skills: ExtendedSkill[];
}

export default function AllSkills({ skills }: AllSkillsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <Card className="bg-white shadow-md border-slate-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          All Skills
        </CardTitle>
        <CardDescription className="text-slate-600">
          A comprehensive overview of all my professional skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2"
        >
          {skills.map((skill) => (
            <div key={`${skill.category}-${skill.name}`} className="relative">

              <SkillBar skill={skill} />
            </div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
