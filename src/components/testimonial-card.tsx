import Image from "next/image";
import { Quote } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TestimonialProps {
  testimonial: {
    name: string;
    role: string;
    quote: string;
    image: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="object-cover"
              fill
            />
          </div>
          <div>
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground opacity-20" />
          <p className="pl-4 italic">{testimonial.quote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
