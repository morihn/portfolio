"use client";

import {Separator} from "@/components/ui/separator";

import * as React from "react";
import {
  Frame,
  Contact,
  User,
  Info,
  Star,
  Briefcase,
  FolderGit2,
} from "lucide-react";

import {NavMain} from "@/components/nav-main";
import {NavProjects} from "@/components/nav-projects";
import {NavUser} from "@/components/nav-user";
import {TeamSwitcher} from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Mori HN",
    email: "morteza.hassannehzad@gmail.com",
    avatar:
      "https://digibrandco.com/_next/image?url=%2Fmoriihn_profile.jpg&w=640&q=75",
  },
  teams: [
    {
      name: "HN Core",
      logo: "https://hncore.website/logo.png",
      plan: "Enterprise",
      url: "https://www.hncore.website/",
    },
  ],
  navMain: [
    {
      title: "Biography",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Information",
          url: "/biography/information",
          icon: Info,
        },
        {
          title: "Education",
          url: "/biography/education",
          icon: Info,
        },
      ],
    },
    {
      title: "Expertise",
      url: "#",
      icon: Star,
      items: [
        {
          title: "Skills",
          url: "/expertise/skills",
          icon: Info,
        },
        {
          title: "Tools",
          url: "/expertise/tools",
          icon: FolderGit2,
        },
        {
          title: "Languages",
          url: "/expertise/language",
          icon: Info,
        },
      ],
    },
    {
      title: "Experiences",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Works",
          url: "/experiences/works",
          icon: Info,
        },
        {
          title: "Projects",
          url: "/experiences/projects",
          icon: Info,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Testimonials",
      url: "/testimonials",
      icon: Frame,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: Contact,
    },
  ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}/>
        <Separator/>
        <NavProjects projects={data.projects}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user}/>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  );
}
