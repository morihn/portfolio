"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectProps {
  project: {
    name: string
    description: string
    type: string
    designFile: string
    liveUrl?: string
    image: string
    technologies: string[]
    features: string[]
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  const [showFeatures, setShowFeatures] = useState(false)

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          fill
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project.name}</CardTitle>
          <Badge variant="outline">{project.type}</Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 p-0 h-auto"
          onClick={() => setShowFeatures(!showFeatures)}
        >
          {showFeatures ? (
            <>
              Hide features <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show features <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
        {showFeatures && (
          <ul className="mt-2 space-y-1 text-sm">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Design
        </Button>
        {project.liveUrl && (
          <Button size="sm" asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit Site <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

