"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { GoPeople } from "react-icons/go";
import { GoProject } from "react-icons/go";
import { GoTasklist } from "react-icons/go";

const Sidebar = () => {
  const [activeLink, dashboard] = useState("dashboard");

  const handleClick = () => {};

  return (
    <div className="w-80 h-screen bg-red-900 flex flex-col items-center p-3">
      <div className="logo">
        <Image
          src={`/projectSupervision.png`}
          alt="logo"
          width={350}
          height={350}
        />
        <h2 className="text-center text-white text-3xl font-semibold py-1 ">
          Project Supervision
        </h2>
      </div>

      <nav className="flex flex-col p-20">
        <a
          href="#"
          className={`flex items-center px-5 py-7 text-2xl font-medium bg-white rounded-br-3xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl shadow-md ${
            activeLink === "dashboard"
              ? "bg-white text-red-900"
              : "text-red-700 hover:text-grey-700"
          } text-2xl font-medium`}
          onClick={() => handleClick("dashboard")}
        >
          <RxDashboard className="w-6 h-6 mr-2" />
          Dashboard
        </a>
        <a
          href="#"
          className={`flex items-center px-5 py-7 ${
            activeLink === "developer"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-700"
          } text-2xl font-medium`}
          onClick={() => handleClick("developer")}
        >
          <GoPeople className="w-6 h-6 mr-2" />
          Developer
        </a>
        <a
          href="#"
          className={`flex items-center px-5 py-7 ${
            activeLink === "project"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-700"
          } text-2xl font-medium`}
          onClick={() => handleClick("project")}
        >
          <GoProject className="w-6 h-6 mr-2" />
          Project
        </a>
        <a
          href="#"
          className={`flex items-center px-5 py-7 ${
            activeLink === "tasks"
              ? "bg-white text-red-900"
              : "text-white hover:text-red-700"
          } text-2xl font-medium`}
          onClick={() => handleClick("tasks")}
        >
          <GoTasklist className="w-6 h-6 mr-2" />
          Tasks
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
