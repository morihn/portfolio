"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Tool {
  name: string;
  icon: ReactNode;
  color: string;
  extensions?: string[];
}

interface ToolGridProps {
  tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {tools.map((tool) => (
        <motion.div
          key={tool.name}
          variants={item}
          whileHover={{ y: -5 }}
          className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-all"
        >
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${tool.color}20` }}
          >
            {tool.icon}
          </div>
          <h3 className="mb-2 font-medium">{tool.name}</h3>
          {tool.extensions && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {tool.extensions.map((ext) => (
                <span
                  key={ext}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {ext}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
