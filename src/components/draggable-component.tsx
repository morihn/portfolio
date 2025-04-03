"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useDrag } from "react-dnd"
import { Move, CornerRightDown, RotateCw } from "lucide-react"
import type { CanvasComponent } from "@/app/page"
import ProjectCard from "@/components/project-card"
import TestimonialCard from "@/components/testimonial-card"
import ContactForm from "@/components/contact-form"
import HeroSection from "@/components/hero-section"

interface DraggableComponentProps {
  component: CanvasComponent
  moveComponent: (id: string, position: { x: number; y: number }) => void
  selectComponent: (id: string) => void
  removeComponent: (id: string) => void
  resizeComponent: (id: string, width: number, height: number) => void
  rotateComponent: (id: string, rotation: number) => void
  isEditing: boolean
}

export default function DraggableComponent({
  component,
  moveComponent,
  selectComponent,
  removeComponent,
  resizeComponent,
  rotateComponent,
  isEditing,
}: DraggableComponentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [initialResizeData, setInitialResizeData] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [initialRotateData, setInitialRotateData] = useState({ x: 0, y: 0, rotation: 0 })

  // Set up drag
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "COMPONENT",
    item: { id: component.id, type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Handle mouse down for resizing
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!ref.current) return

    setIsResizing(true)
    setInitialResizeData({
      x: e.clientX,
      y: e.clientY,
      width: component.width || 300,
      height: component.height || 200,
    })

    // Add event listeners for resize
    document.addEventListener("mousemove", handleResize)
    document.addEventListener("mouseup", handleResizeEnd)
  }

  // Handle mouse move for resizing
  const handleResize = (e: MouseEvent) => {
    if (!isResizing) return

    const deltaX = e.clientX - initialResizeData.x
    const deltaY = e.clientY - initialResizeData.y

    const newWidth = Math.max(200, initialResizeData.width + deltaX)
    const newHeight = Math.max(100, initialResizeData.height + deltaY)

    resizeComponent(component.id, newWidth, newHeight)
  }

  // Handle mouse up for resizing
  const handleResizeEnd = () => {
    setIsResizing(false)
    document.removeEventListener("mousemove", handleResize)
    document.removeEventListener("mouseup", handleResizeEnd)

    // Add the final state to history
    if (typeof window !== "undefined") {
      // Use setTimeout to ensure the final resize value is captured
      setTimeout(() => {
        const event = new CustomEvent("finalizeComponentChange", {
          detail: { id: component.id },
        })
        window.dispatchEvent(event)
      }, 0)
    }
  }

  // Handle mouse down for rotating
  const handleRotateStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!ref.current) return

    setIsRotating(true)
    setInitialRotateData({
      x: e.clientX,
      y: e.clientY,
      rotation: component.rotation || 0,
    })

    // Add event listeners for rotation
    document.addEventListener("mousemove", handleRotate)
    document.addEventListener("mouseup", handleRotateEnd)
  }

  // Handle mouse move for rotating
  const handleRotate = (e: MouseEvent) => {
    if (!isRotating || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate angle between center of element and mouse position
    const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    const angleDeg = angleRad * (180 / Math.PI)

    // Adjust angle to make it more intuitive
    let rotation = angleDeg + 90

    // Snap to 15 degree increments when holding shift
    if (e.shiftKey) {
      rotation = Math.round(rotation / 15) * 15
    }

    rotateComponent(component.id, rotation)
  }

  // Handle mouse up for rotating
  const handleRotateEnd = () => {
    setIsRotating(false)
    document.removeEventListener("mousemove", handleRotate)
    document.removeEventListener("mouseup", handleRotateEnd)

    // Add the final state to history
    if (typeof window !== "undefined") {
      // Use setTimeout to ensure the final rotation value is captured
      setTimeout(() => {
        const event = new CustomEvent("finalizeComponentChange", {
          detail: { id: component.id },
        })
        window.dispatchEvent(event)
      }, 0)
    }
  }

  // Render the appropriate component based on type
  const renderComponent = () => {
    switch (component.type) {
      case "project":
        return <ProjectCard project={component.data} />
      case "testimonial":
        return <TestimonialCard testimonial={component.data} />
      case "contact":
        return <ContactForm contactInfo={component.data.contactInfo} />
      case "hero":
        return <HeroSection />
      case "text":
        return <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">{component.data.text}</div>
      case "image":
        return (
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
            <img
              src={component.data.src || "/placeholder.svg"}
              alt={component.data.alt || "Image"}
              className="max-w-full h-auto"
            />
          </div>
        )
      default:
        return <div>Unknown component type</div>
    }
  }

  // Connect drag preview to component
  dragPreview(ref)

  return (
    <div
      ref={ref}
      className={`absolute ${isEditing ? "cursor-move" : ""}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.width ? `${component.width}px` : "auto",
        height: component.height ? `${component.height}px` : "auto",
        zIndex: component.zIndex,
        opacity: isDragging ? 0.5 : 1,
        border: isEditing ? "2px solid #e0e0e0" : "none",
        borderRadius: "4px",
        overflow: "hidden",
        transition: isDragging ? "none" : "box-shadow 0.2s, transform 0.1s",
        boxShadow: isEditing ? "0 0 0 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.1)" : "none",
        transform: `rotate(${component.rotation || 0}deg)`,
        transformOrigin: "center center",
        backgroundColor: "white",
      }}
      onClick={() => selectComponent(component.id)}
    >
      {isEditing && (
        <div className="absolute top-0 left-0 right-0 bg-gray-100 p-1 flex items-center justify-between z-10">
          <div ref={drag} className="cursor-move p-1">
            <Move size={14} />
          </div>
          <button
            className="h-6 w-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation()
              removeComponent(component.id)
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="h-full overflow-auto">{renderComponent()}</div>

      {isEditing && (
        <>
          <div
            className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize flex items-center justify-center bg-primary/50 hover:bg-primary/70 rounded-tl-md"
            onMouseDown={handleResizeStart}
          >
            <CornerRightDown size={14} />
          </div>

          <div
            className="absolute top-0 right-8 w-6 h-6 cursor-pointer flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            onMouseDown={handleRotateStart}
          >
            <RotateCw size={12} />
          </div>
        </>
      )}
    </div>
  )
}

