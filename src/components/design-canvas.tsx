"use client"

import { useRef } from "react"
import { useDrop } from "react-dnd"
import type { CanvasComponent } from "@/app/page"
import DraggableComponent from "@/components/draggable-component"

interface DesignCanvasProps {
  components: CanvasComponent[]
  moveComponent: (id: string, position: { x: number; y: number }) => void
  selectComponent: (id: string) => void
  removeComponent: (id: string) => void
  resizeComponent: (id: string, width: number, height: number) => void
  rotateComponent: (id: string, rotation: number) => void
  isEditing: boolean
}

export default function DesignCanvas({
  components,
  moveComponent,
  selectComponent,
  removeComponent,
  resizeComponent,
  rotateComponent,
  isEditing,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  // Set up drop target
  const [, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item: any, monitor) => {
      if (!canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const dropOffset = monitor.getSourceClientOffset()

      if (dropOffset) {
        const x = dropOffset.x - canvasRect.left
        const y = dropOffset.y - canvasRect.top

        if (item.isNew) {
          // New component being added - handled by parent
        } else {
          // Existing component being moved
          moveComponent(item.id, { x, y })
        }
      }
    },
  })

  // Connect drop ref to canvas ref
  drop(canvasRef)

  return (
    <div
      ref={canvasRef}
      className={`flex-1 relative overflow-auto min-h-[calc(100vh-8rem)] ${isEditing ? "bg-gray-100 dark:bg-gray-900" : ""}`}
      style={{
        backgroundImage: isEditing
          ? "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)"
          : "none",
        backgroundSize: "20px 20px",
      }}
    >
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
          moveComponent={moveComponent}
          selectComponent={selectComponent}
          removeComponent={removeComponent}
          resizeComponent={resizeComponent}
          rotateComponent={rotateComponent}
          isEditing={isEditing}
        />
      ))}

      {isEditing && components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <p>Drag components from the panel on the left to add them to your canvas</p>
        </div>
      )}
    </div>
  )
}

