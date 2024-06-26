"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { GoPeople, GoProject, GoTasklist } from "react-icons/go";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("dashboardPage");

  const handleClick = (page: string) => {
    setActiveLink(page);
  };

  return (
    <div className="w-72 h-screen bg-red-900 flex flex-col items-center p-3">
      <div className="logo">
        <Image
          src={`/projectSupervision.png`}
          alt="logo"
          width={350}
          height={350}
        />
        <h2 className="text-center text-white text-2xl font-semibold py-1 ">
          Project Supervision
        </h2>
      </div>

      <nav className="flex flex-col p-20">
        <a
          // href="dashboardPage"
          className={`flex items-center px-5 py-7 text-xl font-medium ${
            activeLink === "dashboardPage"
              ? "bg-white text-red-900"
              : "text-white hover:text-red"
          } rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl `}
          onClick={() => handleClick("dashboardPage")}
        >
          <RxDashboard className="w-6 h-6 mr-2" />
          Dashboard
        </a>
        <a
          // href="developerPage"
          className={`flex items-center px-5 py-7 text-xl font-medium ${
            activeLink === "developerPage"
              ? "bg-white text-red-900"
              : "text-white hover:text-red"
          } rounded-br-3xl rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl`}
          onClick={() => handleClick("developerPage")}
        >
          <GoPeople className="w-6 h-6 mr-2" />
          Developer
        </a>
        <a
          // href="projectPage"
          className={`flex items-center px-5 py-7 text-xl font-medium ${
            activeLink === "projectPage"
              ? "bg-white text-red-900"
              : "text-white hover:text-red"
          } rounded-br-3xl rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl`}
          onClick={() => handleClick("projectPage")}
        >
          <GoPeople className="w-6 h-6 mr-2" />
          Project
        </a>
        <a
          // href="taskPage"
          className={`flex items-center px-5 py-7 text-xl font-medium ${
            activeLink === "taskPage"
              ? "bg-white text-red-900"
              : "text-white hover:text-red"
          } rounded-br-3xl rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl`}
          onClick={() => handleClick("taskPage")}
        >
          <GoPeople className="w-6 h-6 mr-2" />
          Task
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
