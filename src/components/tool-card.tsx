"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  name: string;
  icon: ReactNode;
  color: string;
  years?: number;
  usage?: string;
  children?: ReactNode;
}

export function ToolCard({
  name,
  icon,
  color,
  years,
  usage,
  children,
}: ToolCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <div className="text-foreground">{icon}</div>
        </motion.div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          {years && (
            <p className="text-sm text-muted-foreground">
              {years} years experience
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
        {usage && <p className="mt-2 text-sm text-muted-foreground">{usage}</p>}
      </CardContent>
      {(years || usage) && (
        <CardFooter className="pt-0">
          {years && years >= 3 && <Badge variant="secondary">Proficient</Badge>}
        </CardFooter>
      )}
    </Card>
  );
}
