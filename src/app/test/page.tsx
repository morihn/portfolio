"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Save,
  Undo,
  Redo,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DesignCanvas from "@/components/design-canvas";
import ToolbarComponent from "@/components/toolbar";
import ComponentPanel from "@/components/component-panel";

// Define the component types
export type ComponentType =
  | "project"
  | "testimonial"
  | "contact"
  | "hero"
  | "text"
  | "image";

// Define the component data structure
export interface CanvasComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  data: any;
  zIndex: number;
  width?: number;
  height?: number;
  rotation?: number;
}

// Sample data from the user's information
const projects = [
  {
    name: "Ghatijo",
    description:
      "A service directory website highlighting the best carpet cleaning companies by province.",
    type: "Website",
    designFile: "Naghdone",
    liveUrl: "https://ghatijo.com",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "Figma"],
    features: [
      "Location-based search",
      "Company ratings and reviews",
      "Service booking system",
    ],
  },
  {
    name: "BookLand",
    description:
      "A concept for an online reading platform to enjoy books digitally.",
    type: "Concept Project",
    designFile: "BookLand",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Figma", "Spline"],
    features: [
      "Digital bookshelf",
      "Reading progress tracker",
      "Social sharing",
    ],
  },
  {
    name: "Online Movie Show",
    description:
      "A concept for a movie streaming application with a sleek interface.",
    type: "Concept Project",
    designFile: "MovieShow",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Figma", "React"],
    features: [
      "Movie recommendations",
      "Watchlist management",
      "Streaming quality selector",
    ],
  },
  {
    name: "Game Land",
    description:
      "A concept for a gaming platform to explore and download favorite games.",
    type: "Concept Project",
    designFile: "Gametand",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Figma", "3D Design"],
    features: ["Game previews", "Download manager", "Community forums"],
  },
  {
    name: "Cibo",
    description:
      "A concept for an online food ordering application with a focus on user experience.",
    type: "Concept Project",
    designFile: "Cibo",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Figma", "Tailwind CSS"],
    features: ["Restaurant menus", "Order tracking", "Payment integration"],
  },
];

const testimonials = [
  {
    name: "Sara Ahmadi",
    role: "Project Manager at DigiBrand",
    quote:
      "Morteza's creativity and technical skills transformed our digital presence.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Ali Rezaei",
    role: "Client at ToorangCo",
    quote:
      "The user-friendly design Morteza created boosted our online sales significantly.",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const contactInfo = {
  form_endpoint: "/api/contact",
  available_for: [
    "Freelance Projects",
    "Full-time Opportunities",
    "Collaboration",
  ],
};

export default function Home() {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [history, setHistory] = useState<CanvasComponent[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  // Create default layout with all components
  const createDefaultLayout = () => {
    const defaultComponents: CanvasComponent[] = [
      // Hero section at the top
      {
        id: `hero-default`,
        type: "hero",
        position: { x: 50, y: 50 },
        data: {},
        zIndex: 0,
        width: 800,
        height: 400,
        rotation: 0,
      },
      // Projects in a grid
      ...projects.map((project, index) => ({
        id: `project-default-${index}`,
        type: "project" as ComponentType,
        position: {
          x: 50 + (index % 2) * 420,
          y: 500 + Math.floor(index / 2) * 450,
        },
        data: project,
        zIndex: index + 1,
        width: 380,
        height: 420,
        rotation: 0,
      })),
      // Testimonials side by side
      ...testimonials.map((testimonial, index) => ({
        id: `testimonial-default-${index}`,
        type: "testimonial" as ComponentType,
        position: { x: 50 + index * 420, y: 1850 },
        data: testimonial,
        zIndex: projects.length + index + 1,
        width: 380,
        height: 200,
        rotation: 0,
      })),
      // Contact form at the bottom
      {
        id: `contact-default`,
        type: "contact",
        position: { x: 50, y: 2100 },
        data: { contactInfo },
        zIndex: projects.length + testimonials.length + 1,
        width: 500,
        height: 600,
        rotation: 0,
      },
    ];

    return defaultComponents;
  };

  // Initialize with default layout
  useEffect(() => {
    const savedLayout = localStorage.getItem("portfolioLayout");

    if (savedLayout) {
      const parsedLayout = JSON.parse(savedLayout);
      setComponents(parsedLayout);
      setHistory([parsedLayout]);
      setHistoryIndex(0);
    } else {
      // If no saved layout, use default
      const defaultLayout = createDefaultLayout();
      setComponents(defaultLayout);
      setHistory([defaultLayout]);
      setHistoryIndex(0);
    }
  }, []);

  // Add event listener for finalizeComponentChange
  useEffect(() => {
    const handleFinalizeChange = () => {
      addToHistory([...components]);
    };

    window.addEventListener("finalizeComponentChange", handleFinalizeChange);

    return () => {
      window.removeEventListener(
        "finalizeComponentChange",
        handleFinalizeChange
      );
    };
  }, [components]);

  // Add a component to the canvas
  const addComponent = (type: ComponentType, data: any) => {
    const newComponent: CanvasComponent = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      data,
      zIndex: components.length,
      width: type === "project" ? 380 : type === "testimonial" ? 380 : 500,
      height: type === "project" ? 420 : type === "testimonial" ? 200 : 400,
      rotation: 0,
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    addToHistory(newComponents);
  };

  // Move a component on the canvas
  const moveComponent = (id: string, position: { x: number; y: number }) => {
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, position };
      }
      return component;
    });
    setComponents(newComponents);
  };

  // Update component z-index when selected
  const selectComponent = (id: string) => {
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return {
          ...component,
          zIndex: Math.max(...components.map((c) => c.zIndex)) + 1,
        };
      }
      return component;
    });
    setComponents(newComponents);
  };

  // Remove a component from the canvas
  const removeComponent = (id: string) => {
    const newComponents = components.filter((component) => component.id !== id);
    setComponents(newComponents);
    addToHistory(newComponents);
  };

  // Resize a component
  const resizeComponent = (id: string, width: number, height: number) => {
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, width, height };
      }
      return component;
    });
    setComponents(newComponents);
  };

  // Rotate a component
  const rotateComponent = (id: string, rotation: number) => {
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, rotation };
      }
      return component;
    });
    setComponents(newComponents);

    // Only add to history when rotation is complete, not during the drag
    // This will be handled by the mouseup event in the component
  };

  // Add a function to finalize component changes (for both resize and rotate)
  const finalizeComponentChange = () => {
    addToHistory([...components]);
  };

  // Add current state to history
  const addToHistory = (newComponents: CanvasComponent[]) => {
    // If we're not at the end of the history, remove everything after current index
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newComponents]);
    setHistoryIndex(newHistory.length);
  };

  // Undo last action
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents(history[historyIndex - 1]);
    }
  };

  // Redo last undone action
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents(history[historyIndex + 1]);
    }
  };

  // Save the current layout
  const saveLayout = () => {
    localStorage.setItem("portfolioLayout", JSON.stringify(components));
  };

  // Restore default layout
  const restoreDefaultLayout = () => {
    const defaultLayout = createDefaultLayout();
    setComponents(defaultLayout);
    addToHistory(defaultLayout);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <span>Morteza</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={toggleEditMode}
              >
                {isEditing ? "Exit Edit Mode" : "Edit Canvas"}
              </Button>
              {isEditing && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={undo}
                    disabled={historyIndex <= 0}
                  >
                    <Undo className="h-4 w-4" />
                    <span className="sr-only">Undo</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                  >
                    <Redo className="h-4 w-4" />
                    <span className="sr-only">Redo</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={saveLayout}>
                    <Save className="h-4 w-4" />
                    <span className="sr-only">Save Layout</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={restoreDefaultLayout}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Restore Default</span>
                  </Button>
                </>
              )}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {isEditing && <ToolbarComponent />}

        <main className="flex-1 flex">
          {isEditing && (
            <ComponentPanel
              projects={projects}
              testimonials={testimonials}
              contactInfo={contactInfo}
              addComponent={addComponent}
            />
          )}

          <DesignCanvas
            components={components}
            moveComponent={moveComponent}
            selectComponent={selectComponent}
            removeComponent={removeComponent}
            resizeComponent={resizeComponent}
            rotateComponent={rotateComponent}
            isEditing={isEditing}
          />
        </main>

        <footer className="w-full border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Morteza. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </DndProvider>
  );
}
