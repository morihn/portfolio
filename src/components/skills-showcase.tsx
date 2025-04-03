"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Figma,
  Framer,
  Github,
  Layers,
  Palette,
  Trello,
  Computer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolCard } from "@/components/tool-card";
import { ProficiencyBar } from "@/components/proficiency-bar";
import { ToolGrid } from "@/components/tool-grid";

const skillsData = {
  design_tools: [
    {
      name: "Figma",
      proficiency: "Expert",
      usage: "Primary design tool for UI/UX work",
      icon: <Figma className="h-6 w-6" />,
      color: "#F24E1E",
    },

    {
      name: "Spline",
      proficiency: "Intermediate",
      usage: "3D design and prototyping",
      icon: <Palette className="h-6 w-6" />,
      color: "#0066FF",
    },
    {
      name: "WordPress",
      proficiency: "Intermediate",
      usage: "3D design and prototyping",
      icon: <Computer className="h-6 w-6" />,
      color: "#0066FF",
    },
  ],
  prototyping_tools: [
    {
      name: "Framer",
      icon: <Framer className="h-6 w-6" />,
      color: "#0055FF",
    },
    {
      name: "ProtoPie",
      icon: <Layers className="h-6 w-6" />,
      color: "#00C2FF",
    },
    {
      name: "Principle",
      icon: <Layers className="h-6 w-6" />,
      color: "#ED1C24",
    },
  ],
  development_tools: [
    {
      name: "React",
      extensions: ["Next.js", "Vite", "CRA","Remix","React-Router v7"],
      icon: <Code className="h-6 w-6" />,
      color: "#007ACC",
    },
    {
      name: "Git/GitHub",
      icon: <Github className="h-6 w-6" />,
      color: "#181717",
    },
    {
      name: "Chrome DevTools",
      icon: <Code className="h-6 w-6" />,
      color: "#4285F4",
    },
    {
      name: "Design Libraries",
      extensions: ["Ant Design", "Chakra UI", "Material-UI","Bootstrap","Styled Components","Shadcn","TailWind"],
      icon: <Code className="h-6 w-6" />,
      color: "#8DD6F9",
    },
  ],
  other_tools: [
    {
      name: "CRM",
      icon: <Trello className="h-6 w-6" />,
      color: "#0052CC",
    },
    {
      name: "SEO",
      icon: <Computer className="h-6 w-6" />,
      color: "#000000",
    },
    {
      name: "Microsoft",
      icon: <Layers className="h-6 w-6" />,
      extensions: ["Excel","Word","PowerPoint"],
      color: "#FFD02F",
    },
    
  ],
};

export default function SkillsShowcase() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCategory, setActiveCategory] = useState("design_tools");

  const getProficiencyValue = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return 100;
      case "Advanced":
        return 80;
      case "Intermediate":
        return 60;
      case "Beginner":
        return 40;
      default:
        return 50;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          My Toolkit
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          A showcase of the tools and technologies I use to bring ideas to life
        </p>
      </motion.div>

      <Tabs
        defaultValue="design_tools"
        className="mb-12"
        onValueChange={setActiveCategory}
      >
        <div className="flex justify-center">
          <TabsList className="w-full max-w-md grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="design_tools">Design</TabsTrigger>
            <TabsTrigger value="development_tools">Development</TabsTrigger>
            <TabsTrigger value="other_tools">Other</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="design_tools" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Design Tools</CardTitle>
              <CardDescription>
                Tools I use for UI/UX design and visual creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {skillsData.design_tools.map((tool) => (
                  <motion.div key={tool.name} variants={item}>
                    <ToolCard
                      name={tool.name}
                      icon={tool.icon}
                      color={tool.color}
                      usage={tool.usage}
                    >
                      <ProficiencyBar
                        value={getProficiencyValue(tool.proficiency)}
                        label={tool.proficiency}
                      />
                    </ToolCard>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prototyping_tools" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Prototyping Tools</CardTitle>
              <CardDescription>
                Tools I use for creating interactive prototypes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToolGrid tools={skillsData.prototyping_tools} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development_tools" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Development Tools</CardTitle>
              <CardDescription>
                Tools I use for coding and development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToolGrid tools={skillsData.development_tools} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other_tools" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Other Tools</CardTitle>
              <CardDescription>
                Additional tools I use in my workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToolGrid tools={skillsData.other_tools} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 flex justify-center"
      >
       
      </motion.div>
    </div>
  );
}
