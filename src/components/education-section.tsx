"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Award,
  Calendar,
  FileText,
 } from "lucide-react";
import Image from "next/image";
import { cn } from '@/lib/utils'; 


export default function EducationSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const educationData = [
    {
      degree: "Bachelor of Electrical Engineering",
      major: "Power Systems",
      institution: "University of Mazandaran",
      location: "Mazandaran, Iran",
      year: "2016 - 2020",
      thesis: "Viola–Jones Object Detection Framework",
      achievements: [
        "Graduated with honors",
        "Third place in the Startup Weekend competition at the Tehran Niroo Institution",
      ],
      coverImage: "/umz2.jpg?height=200&width=600",

      logo: "/umz.png?height=80&width=80",

      color: "#0057b8", // University brand color
    },

    {
      degree: "UX Design Professional Certificate",
      institution: "Google Career Certificates",
      year: "2021",
      skills_gained: [
        "User research methods",
        "Wireframing & prototyping",
        "Accessibility standards",
      ],
      coverImage: "/goggle.png?height=200&width=600",
      logo: "/googlelogo.jpg?height=80&width=80",
      color: "#4285F4", // Google blue
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
          >
            {educationData.length} Credentials
          </Badge>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {educationData.map((education, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={`overflow-hidden border-gray-200 hover:shadow-md transition-shadow duration-300 ${
                  expandedId === index ? "ring-1 ring-blue-400" : ""
                }`}
              >
                <CardContent className="p-0">
                  {/* Cover Image */}
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={education.coverImage || "/placeholder.svg"}
                      alt={`${education.institution} campus`}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={cn('absolute inset-0 opacity-30', `bg-${education.color}`)}                    ></div>
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 text-white font-medium text-sm">
                      {education.location}
                    </div>
                  </div>

                  <div className="p-5 pt-12 relative">
                    {/* Logo */}
                    <div className="absolute -top-8 left-5 h-16 w-16 rounded-lg overflow-hidden border-4 border-white shadow-md bg-white">
                      <Image
                        src={education.logo || "/placeholder.svg"}
                        alt={`${education.institution} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {education.degree}
                          </h3>
                          <div className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">{education.year}</span>
                          </div>
                        </div>

                        {education.major && (
                          <p className="text-blue-600 font-medium mb-1">
                            {education.major}
                          </p>
                        )}

                        <p className="text-gray-700 font-medium">
                          {education.institution}
                        </p>

                        <motion.div
                          initial={false}
                          animate={{
                            height: expandedId === index ? "auto" : 0,
                            opacity: expandedId === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-3">
                            {education.thesis && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <FileText className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium text-gray-700">
                                    Thesis
                                  </span>
                                </div>
                                <p className="text-gray-600 ml-6">
                                  {education.thesis}
                                </p>
                              </div>
                            )}

                            {education.achievements &&
                              education.achievements.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Award className="h-4 w-4 text-blue-600" />
                                    <span className="font-medium text-gray-700">
                                      Achievements
                                    </span>
                                  </div>
                                  <ul className="list-disc list-inside ml-6 text-gray-600 space-y-1">
                                    {education.achievements.map(
                                      (achievement, i) => (
                                        <motion.li
                                          key={i}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.1 }}
                                        >
                                          {achievement}
                                        </motion.li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                            {education.skills_gained &&
                              education.skills_gained.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Award className="h-4 w-4 text-blue-600" />
                                    <span className="font-medium text-gray-700">
                                      Skills Gained
                                    </span>
                                  </div>
                                  <ul className="list-disc list-inside ml-6 text-gray-600 space-y-1">
                                    {education.skills_gained.map((skill, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                      >
                                        {skill}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </motion.div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium"
                          onClick={() => toggleExpand(index)}
                        >
                          {expandedId === index ? (
                            <span className="flex items-center">
                              Show less <ChevronUp className="ml-1 h-4 w-4" />
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Show details{" "}
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center text-gray-500 text-sm"
      ></motion.div>
    </div>
  );
}
