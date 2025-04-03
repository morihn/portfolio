"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Award, BookOpen } from "lucide-react"

interface Language {
  language: string
  proficiency: string
  level: number
  certification?: string
  status?: string
}

export default function LanguageProficiency() {
  const [languages] = useState<Language[]>([
    {
      language: "Persian (Farsi)",
      proficiency: "Native",
      level: 100,
    },
    {
      language: "English",
      proficiency: "Professional",
      level: 75,
    },
    {
      language: "French",
      proficiency: "Basic",
      level: 20,
      status: "Learning",
    },
  ])

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Color mapping for different proficiency levels
  const getColorClass = (proficiency: string) => {
    switch (proficiency) {
      case "Native":
        return "text-emerald-500"
      case "Professional":
        return "text-blue-500"
      case "Basic":
        return "text-amber-500"
      default:
        return "text-gray-500"
    }
  }

  const getColor = (proficiency: string) => {
    switch (proficiency) {
      case "Native":
        return "#10b981" // emerald-500
      case "Professional":
        return "#3b82f6" // blue-500
      case "Basic":
        return "#f59e0b" // amber-500
      default:
        return "#6b7280" // gray-500
    }
  }

  const getIconForLanguage = (language: Language) => {
    if (language.status === "Learning") {
      return <BookOpen className="h-5 w-5 text-amber-500" />
    } else if (language.certification) {
      return <Award className="h-5 w-5 text-blue-500" />
    } else {
      return <Globe className="h-5 w-5 text-emerald-500" />
    }
  }

  // Create data for pie chart
  const createPieData = (level: number) => {
    return [
      { name: "Proficiency", value: level },
      { name: "Remaining", value: 100 - level },
    ]
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-8 text-center">Language Proficiency</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <Card className="w-full h-full">
                <CardHeader className="pb-2 text-center">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    {getIconForLanguage(lang)}
                    <CardTitle>{lang.language}</CardTitle>
                  </div>
                  <CardDescription>
                    {lang.proficiency}
                    {lang.status && (
                      <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                        {lang.status}
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {isClient && (
                    <div className="relative w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={createPieData(lang.level)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={0}
                            dataKey="value"
                            isAnimationActive={true}
                            animationBegin={200 * index}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >
                            <Cell key={`cell-0`} fill={getColor(lang.proficiency)} />
                            <Cell key={`cell-1`} fill="#f3f4f6" /> {/* Light gray for remaining */}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Percentage text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          className={`text-4xl font-bold ${getColorClass(lang.proficiency)}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                        >
                          {lang.level}%
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {lang.certification && (
                    <motion.div
                      className="mt-4 flex items-center text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    >
                      <Award className="h-4 w-4 mr-1 text-blue-500" />
                      {lang.certification}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

