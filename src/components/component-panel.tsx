"use client"

import type React from "react"

import { useState } from "react"
import { useDrag } from "react-dnd"
import type { ComponentType } from "@/app/page"
import { Button } from "@/components/ui/button"
import { LayoutGrid, MessageSquareQuote, MailPlus, Home, Type, ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ComponentPanelProps {
  projects: any[]
  testimonials: any[]
  contactInfo: any
  addComponent: (type: ComponentType, data: any) => void
}

// Draggable component item
function DraggableItem({
  type,
  label,
  icon,
  data,
  addComponent,
}: {
  type: ComponentType
  label: string
  icon: React.ReactNode
  data: any
  addComponent: (type: ComponentType, data: any) => void
}) {
  const [, drag] = useDrag({
    type: "COMPONENT",
    item: { type, isNew: true, data },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        addComponent(type, data)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} className="flex items-center gap-2 p-2 border rounded-md cursor-move hover:bg-muted/50">
      {icon}
      <span>{label}</span>
    </div>
  )
}

export default function ComponentPanel({ projects, testimonials, contactInfo, addComponent }: ComponentPanelProps) {
  const [customText, setCustomText] = useState("")
  const [customImageUrl, setCustomImageUrl] = useState("")
  const [customImageAlt, setCustomImageAlt] = useState("")

  return (
    <div className="w-64 border-r bg-background p-4 overflow-y-auto h-[calc(100vh-8rem)]">
      <h3 className="font-semibold mb-4">Components</h3>

      <div className="space-y-4">
        <Accordion type="single" collapsible defaultValue="projects">
          <AccordionItem value="projects">
            <AccordionTrigger className="text-sm">Projects</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {projects.map((project, index) => (
                  <DraggableItem
                    key={index}
                    type="project"
                    label={project.name}
                    icon={<LayoutGrid size={16} />}
                    data={project}
                    addComponent={addComponent}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="testimonials">
            <AccordionTrigger className="text-sm">Testimonials</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {testimonials.map((testimonial, index) => (
                  <DraggableItem
                    key={index}
                    type="testimonial"
                    label={testimonial.name}
                    icon={<MessageSquareQuote size={16} />}
                    data={testimonial}
                    addComponent={addComponent}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sections">
            <AccordionTrigger className="text-sm">Sections</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                <DraggableItem
                  type="hero"
                  label="Hero Section"
                  icon={<Home size={16} />}
                  data={{}}
                  addComponent={addComponent}
                />
                <DraggableItem
                  type="contact"
                  label="Contact Form"
                  icon={<MailPlus size={16} />}
                  data={{ contactInfo }}
                  addComponent={addComponent}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="custom">
            <AccordionTrigger className="text-sm">Custom Elements</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="customText">Text</Label>
                  <Textarea
                    id="customText"
                    placeholder="Enter custom text..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="h-20"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (customText.trim()) {
                        addComponent("text", { text: customText })
                      }
                    }}
                  >
                    <Type size={14} className="mr-2" />
                    Add Text
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customImageUrl">Image URL</Label>
                  <Input
                    id="customImageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                  />
                  <Label htmlFor="customImageAlt">Alt Text</Label>
                  <Input
                    id="customImageAlt"
                    placeholder="Image description"
                    value={customImageAlt}
                    onChange={(e) => setCustomImageAlt(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (customImageUrl.trim()) {
                        addComponent("image", {
                          src: customImageUrl,
                          alt: customImageAlt || "Image",
                        })
                      }
                    }}
                  >
                    <ImageIcon size={14} className="mr-2" />
                    Add Image
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

