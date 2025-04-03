"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
export default function Header() {
  const pathname = usePathname();

  const getPath = () => {
    const mainItem = capitalizeFirstLetter(
      pathname.slice(1).replace("/", " > ")
    );
    const firstItem = capitalizeFirstLetter(mainItem.split(" > ")[0]);
    const secondItem = capitalizeFirstLetter(mainItem.split(" > ")[1]);
    return secondItem === "Undefined"
      ? firstItem
      : `${firstItem} > ${secondItem}`;
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <span>
          Morteza Hassannejad&nbsp;
          {pathname !== "/" && `> ${getPath()}`}
        </span>
      </div>
    </header>
  );
}
