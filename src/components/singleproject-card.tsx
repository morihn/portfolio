"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
}

export function SingleProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-[32rem] flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          {project.demoUrl && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Git
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

