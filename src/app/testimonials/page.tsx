"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Testimonial data type
type Client = {
  name: string;
  position: string;
  company: string;
  image: string;
  linkedin?: string;
};

type Testimonial = {
  id: string;
  client: Client;
  project: string;
  quote: string;
  rating?: number;
  metrics?: string[];
  date: string;
};

// Sample data
const testimonials: Testimonial[] = [
  {
    id: "digibrand-testimonial",
    client: {
      name: "Aliezzahn",
      position: "CEO",
      company: "DigiBrand",
      image:
        "https://digibrandco.com/_next/image?url=%2Faliezzahn_profile.jpeg&w=640&q=75",
      linkedin: "https://www.linkedin.com/in/aliezzahn",
    },
    project: "DigiBrand",
    quote:"He is a dedicated, hardworking, and always cooperative colleague. His presence on the team not only enhances the quality of work but also fosters a positive and professional atmosphere. I am honored to work with such an outstanding individual.",
    rating: 5,
    date: "March 2024",
    metrics: ["Responsible", "Always up to date"],
  },
  {
    id: "toorang-testimonial",
    client: {
      name: "Mohammad Rostami",
      position: "CEO",
      company: "Kayer Agency",
      image: "/rostami.jpg",
    },
    quote: "He is not only a highly skilled and reliable colleague, but also someone who brings genuine passion to his work. His dedication to growth and his commitment to every project are truly inspiring. He cares deeply about the team's success and always goes the extra mile to deliver excellence. Working with someone so driven and compassionate is both a privilege and a pleasure.",
    date: "November 2024",
    project: ""
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };


  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white py-10 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-between">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Don&#39;t just take my word for it. Here&#39;s what clients have to say
            about working with me.
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden flex flex-col justify-between">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={testimonials[activeIndex].id}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                  }
                },
                exit: (direction: number) => ({
                  x: direction > 0 ? -1000 : 1000,
                  opacity: 0,
                  transition: {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                  }
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-[34rem]"
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-0 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-slate-700 hover:bg-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary w-8" : "bg-slate-600"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-slate-700 hover:bg-primary transition-colors "
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-slate-800/50 rounded-2xl p-6 md:p-10 backdrop-blur-sm border border-slate-700">
      <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 relative">
              <Image
                src={testimonial.client.image || "/placeholder.svg"}
                alt={testimonial.client.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left mb-6">
          <h3 className="text-2xl font-bold">{testimonial.client.name}</h3>
          <p className="text-slate-300">{testimonial.client.position}</p>
          <p className="font-medium">
            {testimonial.client.company}
          </p>

          {testimonial.client.linkedin && (
            <a
              href={testimonial.client.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-primary mt-2 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>
          )}
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 w-full">
          <h4 className="font-medium mb-2">Project Details</h4>
          <p className="text-lg font-semibold mb-2">{testimonial.project}</p>
          <p className="text-slate-300 text-sm">{testimonial.date}</p>

          {testimonial.rating && (
            <div className="flex mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < testimonial.rating!
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-600"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-3 flex flex-col justify-between">
        <div className="relative">
          <Quote className="absolute -top-6 -left-6 w-12 h-12 text-primary/20" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed text-slate-200 mb-8">
              &#34;{testimonial.quote}&#34;
            </p>
          </motion.div>
        </div>

        {testimonial.metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-auto"
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-primary" />
              Key Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonial.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="font-medium">{metric}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
