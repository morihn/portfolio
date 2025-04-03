"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SkillsData } from "@/data/skills-data";
import SkillCategory from "./skill-category";
import AllSkills from "./all-skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SkillsSectionProps {
  skillsData: SkillsData;
}

export default function SkillsSection({ skillsData }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Get all skills from all categories
  const allSkills = skillsData.categories.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.name,
    }))
  );

  // Sort all skills by level (highest first)
  const sortedSkills = [...allSkills].sort((a, b) => b.level - a.level);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="relative mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap md:justify-center bg-white shadow-md p-1 rounded-full">
            <TabsTrigger
              value="all"
              className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Skills
            </TabsTrigger>
            {skillsData.categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AllSkills skills={sortedSkills} />
          </motion.div>
        </TabsContent>

        {skillsData.categories.map((category) => (
          <TabsContent
            key={category.name}
            value={category.name}
            className="mt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SkillCategory
                category={category}
                isActive={category.name === activeTab}
              />
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
