"use client";

import { useRef } from "react";
import {
  motion,

}
 from "framer-motion";
import { Badge } from "@/components/ui/badge";

import {
  Github,
  Linkedin,
  Dribbble,
  DribbbleIcon as Behance,
  Mail,
  Phone,
  MapPin,
  Instagram,
} from "lucide-react";
import Image from "next/image";


export default function Portfolio() {


  const containerRef = useRef(null);


  const socialIcons = {
    linkedin: <Linkedin className="h-5 w-5" />,
    dribbble: <Dribbble className="h-5 w-5" />,
    github: <Github className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    behance: <Behance className="h-5 w-5" />,
  };

  const personalInfo = {
    name: "Morteza Hassan Nezhad",
    title: "Mid-Level UI/UX Designer & Frontend Developer",
    bio: "A very creative person who is very interested in designing and playing with colors, who is always looking for progress and creating memorable works, who had a difficult past but a bright future.",
    location: "Mazandaran, Iran",
    email: "morteza.hassannezhad@gmail.com",
    phone: "+98 938 843 2463",
    availability: "Available for freelance & full-time roles",
    image: "/Mori.jpeg?height=200&width=200",
    social_links: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/moriihn",
        icon: "linkedin",
      },
      {
        platform: "Dribbble",
        url: "https://dribbble.com/Morihn",
        icon: "dribbble",
      },
      {
        platform: "GitHub",
        url: "https://github.com/morteza",
        icon: "github",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/moriihn?igsh=cmlyZ3hjYno2OTQ=",
        icon: "instagram",
      },
    ],
  };

  

  return (
    <div
      className="bg-gradient-to-br from-background to-background/95 text-foreground"
      ref={containerRef}
    >
      {/* Navigation */}

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section
          id="about"
          className="flex flex-col md:flex-row items-center gap-12 py-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 order-2 md:order-1"
          >
            <Badge
              variant="outline"
              className="mb-4 text-sm px-4 py-1.5 border-primary/30 text-primary"
            >
              {personalInfo.availability}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Hello, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {personalInfo.name}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-muted-foreground">
              {personalInfo.title}
            </h2>
            <p className="text-lg mb-8 max-w-2xl text-muted-foreground">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              {personalInfo.social_links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[link.icon.toLowerCase()]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 blur-2xl" />
              <motion.div
                className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full overflow-hidden border-4 border-background shadow-xl"
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Image
                  src={personalInfo.image || "/placeholder.svg"}
                  alt={personalInfo.name}
                  fill
                  className="object-cover size-2"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-2 bg-background rounded-lg p-3 shadow-lg border border-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="font-medium">Currently Available</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
