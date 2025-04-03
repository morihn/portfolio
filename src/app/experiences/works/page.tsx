"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Briefcase,
  MapPin,
  Calendar,
  Award,
  Code,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Experience data
const experienceData = [
  {
    company: "DigiBrand",
    position: "UI/UX Designer",
    period: "2021 - Present",
    location: "Tehran, Iran (Remote)",
    responsibilities: ["Established design system for main product"],
    achievements: [
      "Reduced development time by implementing design system",
      "Designed and delivered multiple projects across diverse digital domains",
    ],
    projects: ["Ghalijo", "Toorang", "HNCore"],
    technologies: ["Figma", "Next.js", "Web3", "React", "Ai Tech"],
  },
  {
    company: "Kayer Agency",
    position: ["UI Developer", "-", "Technical Support Specialist "],
    period: "2022 - Present",
    location: "Mazandaran, Iran",
    responsibilities: [
      "Design Websites and Projects",
      "Collaborated with backend team",
      "Optimized frontend performance",
      "Support customers online and solve problems",
    ],
    technologies: ["WordPress", "SqlServer", "REST APIs", "HTML5", "Bootstrap"],
  },
];

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Professional Experience
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        My journey in design and development
      </motion.p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/20 z-0"></div>

        {experienceData.map((experience, index) => (
          <motion.div
            key={index}
            className={`mb-12 relative z-10 flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary z-10"></div>

            {/* Date badge - visible on mobile and on appropriate side for desktop */}
            <div
              className={`md:w-1/2 flex ${
                index % 2 === 0
                  ? "md:justify-end md:pr-8"
                  : "md:justify-start md:pl-8"
              }`}
            >
              <motion.div className="mb-4 md:mb-0" whileHover={{ scale: 1.05 }}>
                <Badge
                  variant="outline"
                  className="text-sm py-1 px-3 bg-primary/5 border-primary/20"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  {experience.period}
                </Badge>
              </motion.div>
            </div>

            {/* Card - takes full width on mobile, half width on desktop */}
            <div
              className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
            >
              <motion.div
                layout
                className="w-full"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div
                      className="p-6 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleExpand(index)}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-primary">
                          {experience.company}
                        </h3>
                        <p className="text-lg font-medium">
                          {experience.position}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {experience.location}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-border/50">
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold flex items-center mb-2">
                                <Briefcase className="w-4 h-4 mr-2 text-primary" />
                                Responsibilities
                              </h4>
                              <ul className="grid grid-cols-1 gap-2">
                                {experience.responsibilities.map((item, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: i * 0.1,
                                    }}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2 text-primary/70 mt-0.5 shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {experience.achievements && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold flex items-center mb-2">
                                  <Award className="w-4 h-4 mr-2 text-primary" />
                                  Achievements
                                </h4>
                                <ul className="grid grid-cols-1 gap-2">
                                  {experience.achievements.map((item, i) => (
                                    <motion.li
                                      key={i}
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: i * 0.1 + 0.3,
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2 text-primary/70 mt-0.5 shrink-0" />
                                      <span className="text-sm">{item}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {experience.technologies && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold flex items-center mb-2">
                                  <Code className="w-4 h-4 mr-2 text-primary" />
                                  Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {experience.technologies.map((tech, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: i * 0.1 + 0.5,
                                      }}
                                    >
                                      <Badge
                                        variant="secondary"
                                        className="font-normal"
                                      >
                                        {tech}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {experience.projects && (
                              <div>
                                <h4 className="text-sm font-semibold flex items-center mb-2">
                                  <Briefcase className="w-4 h-4 mr-2 text-primary" />
                                  Projects
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {experience.projects.map((project, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: i * 0.1 + 0.5,
                                      }}
                                    >
                                      <Badge
                                        variant="secondary"
                                        className="font-normal"
                                      >
                                        {project}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
