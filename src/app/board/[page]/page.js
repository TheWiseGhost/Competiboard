"use client";

import Dropdown from "@/components/global/Dropdown";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../../components/global/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHammer,
  IconSettings,
  IconReportAnalytics,
  IconCirclePlus,
} from "@tabler/icons-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DropdownComponent = ({ params }) => {
  const unwrappedParams = React.use(params);

  // Access the page property from the unwrapped params
  const page = unwrappedParams.page;

  // Capitalize the first letter of the page
  const capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <div className="font-dm pt-8 pb-6 rounded-tl-[40px] mt-1 mr-1 px-10 flex flex-col h-screen w-full bg-white justify-center items-center">
      <div className="flex flex-col space-y-2">
        <h1 className="text-5xl font-medium text-center">{capitalizedPage}</h1>
        <Dropdown page={page} />
      </div>
    </div>
  );
};

export default function SidebarDemo({ params }) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-coral dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Source",
      href: "/add_source",
      icon: (
        <IconCirclePlus className="text-coral dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Edit Display",
      href: "/board/display",
      icon: (
        <IconHammer className="text-coral dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Edit Data",
      href: "/board/data",
      icon: (
        <IconReportAnalytics className="text-coral dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-coral dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-light_vanilla dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 pl-3 pt-3 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className={`flex flex-row items-center pb-4 pl-3`}>
            <UserButton />
          </div>
        </SidebarBody>
      </Sidebar>
      <DropdownComponent params={params} />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal font-dm flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-light_coral dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"></div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-bark text-sm dark:text-white whitespace-pre"
      >
        Competiboard
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-light_coral dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"></div>
    </Link>
  );
};
