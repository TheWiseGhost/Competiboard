"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../../components/global/Sidebar";
import {
  IconBrandTabler,
  IconHammer,
  IconSettings,
  IconReportAnalytics,
  IconEye,
} from "@tabler/icons-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import EditDisplay from "@/components/display/EditDisplay";

export default function SidebarDemo({ params }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "View Board",
      href: "/board/live",
      icon: <IconEye className="text-neutral-800 size-5 flex-shrink-0" />,
    },
    {
      label: "Edit Display",
      href: "/board/display",
      icon: <IconHammer className="text-neutral-800 size-5 flex-shrink-0" />,
    },
    {
      label: "Edit Data",
      href: "/board/data",
      icon: (
        <IconReportAnalytics className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-800 size-5 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "rounded-md hidden md:flex flex-col md:flex-row bg-neutral-100 w-full flex-1 border overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 pl-3 pt-3 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-3 text-neutral-800 font-dm text-sm">
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
        <EditDisplay id={id} />
      </div>
      <div className="flex flex-col md:hidden bg-gray-100 min-h-screen items-center justify-center text-center">
        <img src="CompetiboardLogo.png" className="w-1/3" />
        <h1 className="font-dm font-semibold text-3xl pt-6 pb-2">
          Mobile not supported
        </h1>
        <p className="text-gray-700 text-base">
          Try Competiboard on a bigger device
        </p>
      </div>
    </>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal font-dm flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <img src="/CompetiboardLogo.png" className="-ml-0.5 size-7" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium font-euclid text-neutral-800 text-sm blackspace-pre mt-0.5"
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
      className="font-normal flex space-x-2 items-center text-sm text-neutral-800 py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"></div> */}
      <img src="/CompetiboardLogo.png" className="-ml-0.5 size-7" />
    </Link>
  );
};
