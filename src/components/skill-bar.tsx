"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/skills-data";
import { useState } from "react";

interface SkillBarProps {
  skill: Skill & { category?: string };
}

export default function SkillBar({ skill }: SkillBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine skill level category
  const getSkillLevel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  // Determine color based on skill level
  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-emerald-500 to-emerald-400";
    if (level >= 80) return "from-blue-500 to-blue-400";
    if (level >= 70) return "from-violet-500 to-violet-400";
    if (level >= 60) return "from-amber-500 to-amber-400";
    return "from-rose-500 to-rose-400";
  };

  return (
    <motion.div
      className="relative"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-slate-800">{skill.name}</h3>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-slate-800">
            {skill.level}%
          </span>
          <motion.span
            className="ml-2 text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.2 }}
          >
            {getSkillLevel(skill.level)}
          </motion.span>
        </div>
      </div>
      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getSkillColor(
            skill.level
          )} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Animated dots for visual interest */}
    </motion.div>
  );
}
