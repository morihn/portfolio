"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ProficiencyBarProps {
  value: number
  label: string
  className?: string
}

export function ProficiencyBar({ value, label, className }: ProficiencyBarProps) {
  const getColorClass = (value: number) => {
    if (value >= 90) return "bg-green-500"
    if (value >= 70) return "bg-emerald-500"
    if (value >= 50) return "bg-blue-500"
    return "bg-sky-500"
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span>Proficiency</span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={cn("h-full rounded-full", getColorClass(value))}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

