export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface SkillsData {
  categories: SkillCategory[]
}

export const skillsData: SkillsData = {
  categories: [
    {
      name: "User Experience",
      skills: [
        { name: "User Research", level: 80 },
        { name: "Information Architecture", level: 60 },
        { name: "Wireframing", level: 80 },
        { name: "Usability Testing", level: 60 },
      ],
    },
    {
      name: "User Interface",
      skills: [
        { name: "Visual Design", level: 80 },
        { name: "Design Systems", level: 70 },
        { name: "Micro-interactions", level: 50 },
        { name: "Responsive Design", level: 90 },
      ],
    },
    {
      name: "Frontend Development",
      skills: [
        { name: "HTML/CSS", level: 20 },
        { name: "JavaScript", level: 10 },
        { name: "React", level: 30 },
        { name: "Tailwind CSS", level: 30 },
      ],
    },
    {
      name: "Soft Skills",
      skills: [
        { name: "Client Communication", level: 90 },
        { name: "Problem Solving", level: 80 },
        { name: "Team Leadership", level: 85 },
      ],
    },
  ],
}

