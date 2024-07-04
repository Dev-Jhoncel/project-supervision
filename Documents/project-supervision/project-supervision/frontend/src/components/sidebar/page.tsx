"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { GoPeople, GoProject, GoTasklist } from "react-icons/go";

const Sidebar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  // Function to handle navigation and setActiveLink
  const handleClick = (page: string) => {
    setActiveLink(page); // First, set the active link
    router.push(`/${page}`); // Then, navigate to the page
  };

  return (
    <div className="w-64 h-screen bg-red-900 flex flex-col items-center p-3">
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

      <nav className="flex flex-col gap-6 p-20">
        <button
          className={`flex items-center px-5 py-4 text-md font-medium hover:font-bold cursor-pointer ${
            activeLink === "dashboard"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-200"
          } rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl`}
          onClick={() => handleClick("dashboard")}
        >
          <RxDashboard className="w-6 h-6 mr-2" />
          Dashboard
        </button>
        <button
          className={`flex items-center px-5 py-4 text-md font-medium hover:font-bold cursor-pointer ${
            activeLink === "developers"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-200"
          } rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl`}
          onClick={() => handleClick("developers")}
        >
          <GoPeople className="w-6 h-6 mr-2" />
          Developers
        </button>
        <button
          className={`flex items-center px-5 py-4 text-md font-medium hover:font-bold cursor-pointer ${
            activeLink === "projects"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-200"
          } rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl`}
          onClick={() => handleClick("projects")}
        >
          <GoProject className="w-6 h-6 mr-2" />
          Projects
        </button>
        <button
          className={`flex items-center px-5 py-4 text-md font-medium hover:font-bold cursor-pointer ${
            activeLink === "tasks"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-200"
          } rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl`}
          onClick={() => handleClick("tasks")}
        >
          <GoTasklist className="w-6 h-6 mr-2" />
          Tasks
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
