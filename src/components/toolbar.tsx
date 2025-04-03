"use client"

import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Grid,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ToolbarComponent() {
  return (
    <div className="w-full border-b bg-background p-2 flex items-center gap-2 overflow-x-auto">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom In</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom Out</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Grid className="h-4 w-4" />
          <span className="sr-only">Toggle Grid</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Layers className="h-4 w-4" />
          <span className="sr-only">Layers</span>
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Rotate 45° Left">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Rotate Left</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Rotate 45° Right">
            <RotateCw className="h-4 w-4" />
            <span className="sr-only">Rotate Right</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>
      </div>
    </div>
  )
}

