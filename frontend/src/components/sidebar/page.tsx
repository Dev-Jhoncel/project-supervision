"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { GoPeople, GoProject, GoTasklist } from "react-icons/go";

const Sidebar = () => {
  const router = useRouter();
  const activePath = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const isActive = (path) => {
    return activePath.startsWith(path)
      ? "bg-blue-950 border-b-2 md:border-none text-white p-1 md:bg-white md:text-red-900 md:rounded-full md:py-2"
      : "text-white font-regular";
  };

  return (
    <div className="sticky top-0 w-64 h-screen bg-red-900 flex flex-col items-center p-3">
      <div className="logo">
        <Image
          src="/projectSupervision.png"
          alt="logo"
          width={350}
          height={350}
        />
        <h2 className="text-center text-white text-xl font-semibold py-1">
          Project Supervision
        </h2>
      </div>

      <div className="mt-4 p-2 flex flex-col gap-10 w-full">
        <div
          className={`cursor-pointer flex items-center gap-4 py-2 px-4 hover:bg-white hover:text-red-900 hover:rounded-full ${isActive(
            "/dashboard"
          )}`}
          onClick={() => handleNavigation("/dashboard")}
        >
          <RxDashboard /> Dashboard
        </div>
        <div
          className={`cursor-pointer flex items-center gap-4 py-2 px-4 hover:bg-white hover:text-red-900 hover:rounded-full ${isActive(
            "/developers"
          )}`}
          onClick={() => handleNavigation("/developers")}
        >
          <GoPeople /> Developer
        </div>
        <div
          className={`cursor-pointer flex items-center gap-4 py-2 px-4 hover:bg-white hover:text-red-900 hover:rounded-full ${isActive(
            "/projects"
          )}`}
          onClick={() => handleNavigation("/projects")}
        >
          <GoProject /> Project
        </div>
        <div
          className={`cursor-pointer flex items-center gap-4 py-2 px-4 hover:bg-white hover:text-red-900 hover:rounded-full ${isActive(
            "/tasks"
          )}`}
          onClick={() => handleNavigation("/tasks")}
        >
          <GoTasklist /> Task
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
